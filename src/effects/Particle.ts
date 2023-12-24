import {
  Bindings,
  Buffer,
  BufferUsage,
  ComputePipeline,
  Device,
  Format,
  RenderPipeline,
  RenderTarget,
  SwapChain,
  TextureDimension,
  TextureUsage,
  TransparentWhite,
  WebGPUDeviceContribution,
} from '@antv/g-device-api';
import {
  createBlitPipelineAndBindings,
  createProgram,
  prelude,
  registerShaderModule,
} from './utils';
import { Effect } from './Effect';
import { avg, max, modulate } from '../utils';

export class Particle implements Effect {
  private $canvas: HTMLCanvasElement;
  private device: Device;
  private swapChain: SwapChain;
  private renderTarget: RenderTarget;
  private uniformBuffer: Buffer;
  private customUniformBuffer: Buffer;
  private clearPipeline: ComputePipeline;
  private clearBindings: Bindings;
  private rasterizePipeline: ComputePipeline;
  private rasterizeBindings: Bindings;
  private mainImagePipeline: ComputePipeline;
  private mainImageBindings: Bindings;
  private blitPipeline: RenderPipeline;
  private blitBindings: Bindings;

  constructor(private shaderCompilerPath: string) {}

  async init($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;
    const deviceContribution = new WebGPUDeviceContribution({
      shaderCompilerPath: this.shaderCompilerPath,
    });

    // create swap chain and get device
    const swapChain = await deviceContribution.createSwapChain($canvas);
    swapChain.configureSwapChain($canvas.width, $canvas.height);
    const device = swapChain.getDevice();
    this.device = device;
    this.swapChain = swapChain;

    const screen = device.createTexture({
      // Use F32_RGBA
      // @see https://www.w3.org/TR/webgpu/#float32-filterable
      // @see https://github.com/compute-toys/wgpu-compute-toy/blob/master/src/bind.rs#L433
      format: Format.F16_RGBA,
      width: $canvas.width,
      height: $canvas.height,
      dimension: TextureDimension.TEXTURE_2D,
      usage: TextureUsage.STORAGE,
    });

    const { pipeline: blitPipeline, bindings: blitBindings } =
      createBlitPipelineAndBindings(device, screen);

    const custom = /* wgsl */ `
#define_import_path custom

struct Custom {
  Radius: f32,
  Sinea: f32,
  Sineb: f32,
  Speed: f32,
  Blur: f32,
  Samples: f32,
  Mode: f32
}
@group(0) @binding(1) var<uniform> custom: Custom;

  `;

    registerShaderModule(device, prelude);
    registerShaderModule(device, custom);

    const computeWgsl = /* wgsl */ `
  #import prelude::{screen, time};
  #import custom::{custom};

  @group(2) @binding(0) var<storage, read_write> atomic_storage : array<atomic<i32>>;

  //Check Uniforms
  //Mode 0 - additive blending (atomicAdd)
  //Mode 1 - closest sample (atomicMax)

  const MaxSamples = 64.0;
  const FOV = 0.8;
  const PI = 3.14159265;
  const TWO_PI = 6.28318530718;

  const DEPTH_MIN = 0.2;
  const DEPTH_MAX = 5.0;
  const DEPTH_BITS = 16u;

  struct Camera
  {
    pos: float3,
    cam: float3x3,
    fov: float,
    size: float2
  }

  var<private> camera : Camera;
  var<private> state : uint4;

  fn pcg4d(a: uint4) -> uint4
  {
  	var v = a * 1664525u + 1013904223u;
      v.x += v.y*v.w; v.y += v.z*v.x; v.z += v.x*v.y; v.w += v.y*v.z;
      v = v ^  ( v >> uint4(16u) );
      v.x += v.y*v.w; v.y += v.z*v.x; v.z += v.x*v.y; v.w += v.y*v.z;
      return v;
  }

  fn rand4() -> float4
  {
      state = pcg4d(state);
      return float4(state)/float(0xffffffffu);
  }

  fn nrand4(sigma: float, mean: float4) -> float4
  {
      let Z = rand4();
      return mean + sigma * sqrt(-2.0 * log(Z.xxyy)) *
             float4(cos(TWO_PI * Z.z),sin(TWO_PI * Z.z),cos(TWO_PI * Z.w),sin(TWO_PI * Z.w));
  }

  fn GetCameraMatrix(ang: float2) -> float3x3
  {
      let x_dir = float3(cos(ang.x)*sin(ang.y), cos(ang.y), sin(ang.x)*sin(ang.y));
      let y_dir = normalize(cross(x_dir, float3(0.0,1.0,0.0)));
      let z_dir = normalize(cross(y_dir, x_dir));
      return float3x3(-x_dir, y_dir, z_dir);
  }

  fn SetCamera(ang: float2, fov: float)
  {
      camera.fov = fov;
      camera.cam = GetCameraMatrix(ang);
      camera.pos = - (camera.cam*float3(3.0*custom.Radius+0.5,0.0,0.0));
      camera.size = float2(textureDimensions(screen));
  }

  //project to clip space
  fn Project(cam: Camera, p: float3) -> float3
  {
      let td = distance(cam.pos, p);
      let dir = (p - cam.pos)/td;
      let screen = dir*cam.cam;
      return float3(screen.yz*cam.size.y/(cam.fov*screen.x) + 0.5*cam.size,screen.x*td);
  }

  @compute @workgroup_size(16, 16)
  fn Clear(@builtin(global_invocation_id) id: uint3) {
      let screen_size = int2(textureDimensions(screen));
      let idx0 = int(id.x) + int(screen_size.x * int(id.y));

      atomicStore(&atomic_storage[idx0*4+0], 0);
      atomicStore(&atomic_storage[idx0*4+1], 0);
      atomicStore(&atomic_storage[idx0*4+2], 0);
      atomicStore(&atomic_storage[idx0*4+3], 0);
  }

  fn Pack(a: uint, b: uint) -> int
  {
      return int(a + (b << (31u - DEPTH_BITS)));
  }

  fn Unpack(a: int) -> float
  {
      let mask = (1 << (DEPTH_BITS - 1u)) - 1;
      return float(a & mask)/256.0;
  }

  fn ClosestPoint(color: float3, depth: float, index: int)
  {
      let inverseDepth = 1.0/depth;
      let scaledDepth = (inverseDepth - 1.0/DEPTH_MAX)/(1.0/DEPTH_MIN - 1.0/DEPTH_MAX);

      if(scaledDepth > 1.0 || scaledDepth < 0.0)
      {
          return;
      }

      let uintDepth = uint(scaledDepth*float((1u << DEPTH_BITS) - 1u));
      let uintColor = uint3(color * 256.0);

      atomicMax(&atomic_storage[index*4+0], Pack(uintColor.x, uintDepth));
      atomicMax(&atomic_storage[index*4+1], Pack(uintColor.y, uintDepth));
      atomicMax(&atomic_storage[index*4+2], Pack(uintColor.z, uintDepth));
  }

  fn AdditiveBlend(color: float3, depth: float, index: int)
  {
      let scaledColor = 256.0 * color/depth;

      atomicAdd(&atomic_storage[index*4+0], int(scaledColor.x));
      atomicAdd(&atomic_storage[index*4+1], int(scaledColor.y));
      atomicAdd(&atomic_storage[index*4+2], int(scaledColor.z));
  }

  fn RasterizePoint(pos: float3, color: float3)
  {
      let screen_size = int2(camera.size);
      let projectedPos = Project(camera, pos);
      let screenCoord = int2(projectedPos.xy);

      //outside of our view
      if(screenCoord.x < 0 || screenCoord.x >= screen_size.x ||
          screenCoord.y < 0 || screenCoord.y >= screen_size.y || projectedPos.z < 0.0)
      {
          return;
      }

      let idx = screenCoord.x + screen_size.x * screenCoord.y;

      if(custom.Mode < 0.5)
      {
          AdditiveBlend(color, projectedPos.z, idx);
      }
      else
      {
          ClosestPoint(color, projectedPos.z, idx);
      }
  }

  @compute @workgroup_size(16, 16)
  fn Rasterize(@builtin(global_invocation_id) id: uint3) {
      // Viewport resolution (in pixels)
      let screen_size = int2(textureDimensions(screen));
      let screen_size_f = float2(screen_size);

      // let ang = float2(mouse.pos.xy)*float2(-TWO_PI, PI)/screen_size_f + float2(0.4, 0.4);
      let ang = float2(0.0, 0.0)*float2(-TWO_PI, PI)/screen_size_f + float2(0.4, 0.4);

      SetCamera(ang, FOV);

      //RNG state
      state = uint4(id.x, id.y, id.z, 0u*time.frame);

      for(var i: i32 = 0; i < int(custom.Samples*MaxSamples + 1.0); i++)
      {
          let rand = nrand4(1.0, float4(0.0));
          var pos = 0.2*rand.xyz;
          let col = float3(0.5 + 0.5*sin(10.0*pos));

          let sec = 5.0+custom.Speed*time.elapsed;
          //move points along sines
          pos += sin(float3(2.0,1.0,1.5)*sec)*0.1*sin(30.0*custom.Sinea*pos);
          pos += sin(float3(2.0,1.0,1.5)*sec)*0.02*sin(30.0*custom.Sineb*pos.zxy);

          RasterizePoint(pos, col);
      }
  }

  fn Sample(pos: int2) -> float3
  {
      let screen_size = int2(textureDimensions(screen));
      let idx = pos.x + screen_size.x * pos.y;

      var color: float3;
      if(custom.Mode < 0.5)
      {
          let x = float(atomicLoad(&atomic_storage[idx*4+0]))/(256.0);
          let y = float(atomicLoad(&atomic_storage[idx*4+1]))/(256.0);
          let z = float(atomicLoad(&atomic_storage[idx*4+2]))/(256.0);

          color = tanh(0.1*float3(x,y,z)/(custom.Samples*MaxSamples + 1.0));
      }
      else
      {
          let x = Unpack(atomicLoad(&atomic_storage[idx*4+0]));
          let y = Unpack(atomicLoad(&atomic_storage[idx*4+1]));
          let z = Unpack(atomicLoad(&atomic_storage[idx*4+2]));

          color = float3(x,y,z);
      }

      return abs(color);
  }

  //to remove canvas aliasing
  fn SampleBlur(pos: int2) -> float3
  {
      let avg = Sample(pos+int2(1,0))+Sample(pos+int2(-1,0))+
                Sample(pos+int2(0,1))+Sample(pos+int2(0,-1));
      return mix(Sample(pos), 0.25*avg, custom.Blur);
  }

  @compute @workgroup_size(16, 16)
  fn main_image(@builtin(global_invocation_id) id: uint3)
  {
      let screen_size = uint2(textureDimensions(screen));

      // Prevent overdraw for workgroups on the edge of the viewport
      if (id.x >= screen_size.x || id.y >= screen_size.y) { return; }

      // Pixel coordinates (centre of pixel, origin at bottom left)
      let fragCoord = float2(float(id.x) + .5, float(id.y) + .5);

      let color = SampleBlur(int2(id.xy));

      // Output to screen (linear colour space)
      textureStore(screen, int2(id.xy), float4(color, 1.));
  }
          `;

    const clearProgram = createProgram(device, {
      compute: {
        entryPoint: 'Clear',
        wgsl: computeWgsl,
      },
    });
    const rasterizeProgram = createProgram(device, {
      compute: {
        entryPoint: 'Rasterize',
        wgsl: computeWgsl,
      },
    });
    const mainImageProgram = createProgram(device, {
      compute: {
        entryPoint: 'main_image',
        wgsl: computeWgsl,
      },
    });

    const uniformBuffer = device.createBuffer({
      viewOrSize: 2 * Float32Array.BYTES_PER_ELEMENT,
      usage: BufferUsage.UNIFORM,
    });
    uniformBuffer.setSubData(
      0,
      new Uint8Array(new Float32Array([0, 0]).buffer),
    );
    const customUniformBuffer = device.createBuffer({
      viewOrSize: 7 * Float32Array.BYTES_PER_ELEMENT,
      usage: BufferUsage.UNIFORM,
    });

    const storageBuffer = device.createBuffer({
      viewOrSize:
        $canvas.width * $canvas.height * 4 * Float32Array.BYTES_PER_ELEMENT,
      usage: BufferUsage.STORAGE,
    });

    const clearPipeline = device.createComputePipeline({
      inputLayout: null,
      program: clearProgram,
    });
    const rasterizePipeline = device.createComputePipeline({
      inputLayout: null,
      program: rasterizeProgram,
    });
    const mainImagePipeline = device.createComputePipeline({
      inputLayout: null,
      program: mainImageProgram,
    });

    const clearBindings = device.createBindings({
      pipeline: clearPipeline,
      storageBufferBindings: [
        {
          binding: 0,
          buffer: storageBuffer,
        },
      ],
      storageTextureBindings: [
        {
          binding: 0,
          texture: screen,
        },
      ],
    });
    const rasterizeBindings = device.createBindings({
      pipeline: rasterizePipeline,
      uniformBufferBindings: [
        {
          binding: 0,
          buffer: uniformBuffer,
        },
        {
          binding: 1,
          buffer: customUniformBuffer,
        },
      ],
      storageBufferBindings: [
        {
          binding: 0,
          buffer: storageBuffer,
        },
      ],
      storageTextureBindings: [
        {
          binding: 0,
          texture: screen,
        },
      ],
    });
    const mainImageBindings = device.createBindings({
      pipeline: mainImagePipeline,
      uniformBufferBindings: [
        {
          binding: 1,
          buffer: customUniformBuffer,
        },
      ],
      storageBufferBindings: [
        {
          binding: 0,
          buffer: storageBuffer,
        },
      ],
      storageTextureBindings: [
        {
          binding: 0,
          texture: screen,
        },
      ],
    });

    const renderTarget = device.createRenderTarget({
      format: Format.U8_RGBA_RT,
      width: $canvas.width,
      height: $canvas.height,
    });

    this.uniformBuffer = uniformBuffer;
    this.customUniformBuffer = customUniformBuffer;
    this.clearPipeline = clearPipeline;
    this.clearBindings = clearBindings;
    this.rasterizePipeline = rasterizePipeline;
    this.rasterizeBindings = rasterizeBindings;
    this.mainImagePipeline = mainImagePipeline;
    this.mainImageBindings = mainImageBindings;
    this.blitPipeline = blitPipeline;
    this.blitBindings = blitBindings;
    this.renderTarget = renderTarget;
  }

  /**
   * Parameter changes
   */
  update() {}

  frame(frame: number, elapsed: number, buffer: Uint8Array) {
    const lowerHalfArray = buffer.slice(0, buffer.length / 2 - 1);
    const upperHalfArray = buffer.slice(
      buffer.length / 2 - 1,
      buffer.length - 1,
    );

    const overallAvg = avg(buffer);
    const lowerMax = max(lowerHalfArray);
    const lowerAvg = avg(lowerHalfArray);
    const upperMax = max(upperHalfArray);
    const upperAvg = avg(upperHalfArray);

    const lowerMaxFr = lowerMax / lowerHalfArray.length;
    const lowerAvgFr = lowerAvg / lowerHalfArray.length;
    const upperMaxFr = upperMax / upperHalfArray.length;
    const upperAvgFr = upperAvg / upperHalfArray.length;

    const {
      device,
      swapChain,
      uniformBuffer,
      customUniformBuffer,
      $canvas,
      clearPipeline,
      clearBindings,
      rasterizePipeline,
      rasterizeBindings,
      mainImagePipeline,
      mainImageBindings,
      blitPipeline,
      blitBindings,
      renderTarget,
    } = this;

    uniformBuffer.setSubData(
      0,
      new Uint8Array(new Float32Array([frame, elapsed]).buffer),
    );
    customUniformBuffer.setSubData(
      0,
      new Uint8Array(
        // Radius: f32,
        // Sinea: f32,
        // Sineb: f32,
        // Speed: f32,
        // Blur: f32,
        // Samples: f32,
        // Mode: f32
        new Float32Array([
          modulate(overallAvg, 0, 1, 0.5, 4) / 2000,
          modulate(upperAvgFr, 0, 1, 0.5, 4) / 3,
          modulate(lowerAvgFr, 0, 1, 0.5, 4) / 3,
          0.485,
          0,
          0.25,
          0,
        ]).buffer,
      ),
    );

    const computePass = device.createComputePass();
    computePass.setPipeline(clearPipeline);
    computePass.setBindings(clearBindings);
    computePass.dispatchWorkgroups(
      Math.ceil($canvas.width / 16),
      Math.ceil($canvas.height / 16),
    );

    computePass.setPipeline(rasterizePipeline);
    computePass.setBindings(rasterizeBindings);
    computePass.dispatchWorkgroups(
      Math.ceil($canvas.width / 16),
      Math.ceil($canvas.height / 16),
    );

    computePass.setPipeline(mainImagePipeline);
    computePass.setBindings(mainImageBindings);
    computePass.dispatchWorkgroups(
      Math.ceil($canvas.width / 16),
      Math.ceil($canvas.height / 16),
    );
    device.submitPass(computePass);

    /**
     * An application should call getCurrentTexture() in the same task that renders to the canvas texture.
     * Otherwise, the texture could get destroyed by these steps before the application is finished rendering to it.
     */
    const onscreenTexture = swapChain.getOnscreenTexture();
    const renderPass = device.createRenderPass({
      colorAttachment: [renderTarget],
      colorResolveTo: [onscreenTexture],
      colorClearColor: [TransparentWhite],
    });
    renderPass.setPipeline(blitPipeline);
    renderPass.setBindings(blitBindings);
    renderPass.setViewport(0, 0, $canvas.width, $canvas.height);
    renderPass.draw(3);

    device.submitPass(renderPass);
  }

  destroy() {
    this.device.destroy();
  }
}
