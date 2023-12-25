import {
  AddressMode,
  Bindings,
  Buffer,
  BufferUsage,
  ComputePipeline,
  FilterMode,
  Format,
  MipmapFilterMode,
  Texture,
  TextureDimension,
  TextureUsage,
} from '@antv/g-device-api';
import { createProgram, particle, registerShaderModule } from '../utils';
import { GPUParticleEffect } from './GPUParticleEffect';
import { modulate } from '../../utils';

export interface StardustOptions {
  radius: number;
  timeStep: number;
  samples: number;
  blurRadius: number;
  velocityDecay: number;
  speed: number;
  blurExponentA: number;
  blurExponentB: number;
  animatedNoise: number;
  accumulation: number;
  exposure: number;
}

/**
 * @see https://compute.toys/view/29
 */
export class Stardust extends GPUParticleEffect {
  private options: StardustOptions;
  private customUniformBuffer: Buffer;
  private simulateParticlesPipeline: ComputePipeline;
  private simulateParticlesBindings: Bindings;
  private clearPipeline: ComputePipeline;
  private clearBindings: Bindings;
  private rasterizePipeline: ComputePipeline;
  private rasterizeBindings: Bindings;
  private mainImagePipeline: ComputePipeline;
  private mainImageBindings: Bindings;
  private pass_in: Texture;
  private pass_out: Texture;

  constructor(
    shaderCompilerPath: string,
    options: Partial<StardustOptions> = {},
  ) {
    super(shaderCompilerPath);

    this.options = {
      radius: 1,
      blurRadius: 0.489,
      samples: 0.632,
      speed: 0.885,
      animatedNoise: 1,
      accumulation: 0.962,
      exposure: 0.224,
      blurExponentA: 1,
      blurExponentB: 1,
      velocityDecay: 0.018,
      timeStep: 0.313,
      ...options,
    };
  }

  registerShaderModule() {
    const { device, screen, $canvas } = this;

    const custom = /* wgsl */ `
#define_import_path custom

struct Custom {
  Radius: f32,
  TimeStep: f32,
  Samples: f32,
  BlurRadius: f32,
  VelocityDecay: f32,
  Speed: f32,
  BlurExponentA: f32,
  BlurExponentB: f32,
  AnimatedNoise: f32,
  Accumulation: f32,
  Exposure: f32,
}

@group(0) @binding(2) var<uniform> custom: Custom;
  `;
    registerShaderModule(device, custom);
    registerShaderModule(device, particle);

    const computeWgsl = /* wgsl */ `
#import prelude::{screen, time, mouse, pass_in, pass_out};
#import math::{PI, TWO_PI, state, rand4, nrand4, disk};
#import camera::{Camera, GetCameraMatrix, Project, camera};
#import particle::{Particle, LoadParticle, SaveParticle, RasterizePoint, atomic_storage};
#import custom::{Custom, custom};

const MaxSamples = 256.0;
const FOV = 0.8;

//sqrt of particle count
const PARTICLE_COUNT = 160;

const DEPTH_MIN = 0.2;
const DEPTH_MAX = 5.0;
const DEPTH_BITS = 16u;

var<private> bokehRad : float;

fn SetCamera(ang: float2, fov: float)
{
    camera.fov = fov;
    camera.cam = GetCameraMatrix(ang); 
    camera.pos = - (camera.cam*float3(15.0*custom.Radius+0.5,0.0,0.0));
    camera.size = float2(textureDimensions(screen));
}

fn ForceField(pos: float3, t: float) -> float4
{
    let a0 = float3(sin(t),cos(0.4*t),cos(t));
    let d = distance(pos, a0);
    let F = (a0 - pos)*(1.0/(d*d*d + 1e-3) - 0.4/(d*d*d*d + 1e-3)) + 1e-3;
    return 0.2*float4(F, 0.0);
}

@compute @workgroup_size(16, 16)
fn SimulateParticles(@builtin(global_invocation_id) id: uint3) 
{
    var pix = int2(id.xy);
    var p = LoadParticle(pix);

    if(pix.x > PARTICLE_COUNT || pix.y > PARTICLE_COUNT) 
    {   
        return;
    }
    
    state = uint4(id.x, id.y, id.z, time.frame);
    
    if(time.frame == 0u)
    {
        let rng = rand4();
        p.position = float4(2.0*rng.xyz - 1.0, 0.0);
        p.velocity = float4(0.0,0.0,0.0,0.0);
    }
    let t = fract(custom.Speed*float(time.frame)/800.0)*30.0;

    if(mouse.click == 1) 
    {
        return;
    }

    if(t < 0.05)
    {
        p.velocity -= 0.5 * p.velocity * length(p.velocity);
    }
    
    let dt = custom.Speed * custom.TimeStep;
    p.velocity += (ForceField(p.position.xyz, t) - custom.VelocityDecay*p.velocity) * dt;
    p.position += p.velocity * dt;

    SaveParticle(pix, p);
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

@compute @workgroup_size(16, 16)
fn Rasterize(@builtin(global_invocation_id) id: uint3) {
    // Viewport resolution (in pixels)
    let screen_size = int2(textureDimensions(screen));
    let screen_size_f = float2(screen_size);
    
    let ang = float2(mouse.pos.xy)*float2(-TWO_PI, PI)/screen_size_f + 1e-4;
    
    SetCamera(ang, FOV);

    //RNG state
    state = uint4(id.x, id.y, id.z, 0u);
    
    let rng = rand4();
    bokehRad = pow(rng.x, custom.BlurExponentA);

    if(mouse.click == 1 && custom.AnimatedNoise > 0.5)
    {
        state.w = time.frame;
    }

    var pix = int2(id.xy);

    if(pix.x > PARTICLE_COUNT || pix.y > PARTICLE_COUNT) 
    {   
        return;
    }

    var p = LoadParticle(pix);

    var pos = p.position.xyz;
    var col = 5.5*abs(p.velocity.xyz)*dot(p.velocity,p.velocity)+0.1;
    col /= (0.1+bokehRad);
    let impSample = (col.x + col.y + col.z)*bokehRad;
    let sampleCount = clamp(int(impSample*custom.Samples*MaxSamples + 1.0), 1, 1024);
    let normalCount = int(custom.Samples*MaxSamples + 1.0);

    col *= float(normalCount)/float(sampleCount);

    for(var i = 0; i < sampleCount; i++)
    {
        let R = 2.0*custom.BlurRadius*bokehRad;
        let rng = rand4();
        let dpos = R*normalize(nrand4(1.0, float4(0.0)).xyz)*pow(rng.x, custom.BlurExponentB);
        RasterizePoint(pos + dpos, col);
    }
}

fn Sample(pos: int2) -> float3
{
    let screen_size = int2(textureDimensions(screen));
    let idx = pos.x + screen_size.x * pos.y;

    var color: float3;
        let x = float(atomicLoad(&atomic_storage[idx*4+0]))/(256.0);
        let y = float(atomicLoad(&atomic_storage[idx*4+1]))/(256.0);
        let z = float(atomicLoad(&atomic_storage[idx*4+2]))/(256.0);
        
        color = tanh(custom.Exposure*0.03*float(screen_size.x)*float3(x,y,z)/(custom.Samples*MaxSamples + 1.0));

    return abs(color);
}

@compute @workgroup_size(16, 16)
fn main_image(@builtin(global_invocation_id) id: uint3) 
{
    let screen_size = uint2(textureDimensions(screen));

    // Prevent overdraw for workgroups on the edge of the viewport
    if (id.x >= screen_size.x || id.y >= screen_size.y) { return; }

    // Pixel coordinates (centre of pixel, origin at bottom left)
    let fragCoord = float2(float(id.x) + .5, float(id.y) + .5);

  
    var color = float4(Sample(int2(id.xy)),1.0);

    let oldColor = textureLoad(pass_in, int2(id.xy), 2, 0);

    if(mouse.click == 1 && custom.AnimatedNoise > 0.5)
    {
        color += oldColor * custom.Accumulation;
    }
    
    // Output to buffer
    textureStore(pass_out, int2(id.xy), 2, color);

    textureStore(screen, int2(id.xy), float4(color.xyz/color.w, 1.));
}
          `;

    const pass_in = device.createTexture({
      format: Format.F16_RGBA,
      width: $canvas.width,
      height: $canvas.height,
      dimension: TextureDimension.TEXTURE_2D_ARRAY,
      depthOrArrayLayers: 4,
      usage: TextureUsage.SAMPLED,
    });
    const pass_out = device.createTexture({
      format: Format.F16_RGBA,
      width: $canvas.width,
      height: $canvas.height,
      dimension: TextureDimension.TEXTURE_2D_ARRAY,
      depthOrArrayLayers: 4,
      usage: TextureUsage.STORAGE,
    });
    const bilinear = device.createSampler({
      addressModeU: AddressMode.CLAMP_TO_EDGE,
      addressModeV: AddressMode.CLAMP_TO_EDGE,
      minFilter: FilterMode.BILINEAR,
      magFilter: FilterMode.BILINEAR,
      mipmapFilter: MipmapFilterMode.NO_MIP,
    });

    const simulateParticlesProgram = createProgram(device, {
      compute: {
        entryPoint: 'SimulateParticles',
        wgsl: computeWgsl,
      },
    });
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

    const customUniformBuffer = device.createBuffer({
      viewOrSize: 11 * Float32Array.BYTES_PER_ELEMENT,
      usage: BufferUsage.UNIFORM,
    });

    const storageBuffer = device.createBuffer({
      viewOrSize:
        $canvas.width * $canvas.height * 4 * Float32Array.BYTES_PER_ELEMENT,
      usage: BufferUsage.STORAGE,
    });

    const simulateParticlesPipeline = device.createComputePipeline({
      inputLayout: null,
      program: simulateParticlesProgram,
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

    const simulateParticlesBindings = device.createBindings({
      pipeline: simulateParticlesPipeline,
      uniformBufferBindings: [
        {
          buffer: this.timeBuffer,
        },
        {
          buffer: this.mouseBuffer,
        },
        {
          buffer: customUniformBuffer,
        },
      ],
      samplerBindings: [
        {
          texture: pass_in,
          sampler: bilinear,
          samplerBinding: -1,
        },
      ],
      storageTextureBindings: [
        {
          binding: 1,
          texture: pass_out,
        },
      ],
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
          buffer: this.timeBuffer,
        },
        {
          buffer: this.mouseBuffer,
        },
        {
          buffer: customUniformBuffer,
        },
      ],
      samplerBindings: [
        {
          texture: pass_in,
          sampler: bilinear,
          samplerBinding: -1,
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
          buffer: this.mouseBuffer,
        },
        {
          binding: 2,
          buffer: customUniformBuffer,
        },
      ],
      samplerBindings: [
        {
          texture: pass_in,
          sampler: bilinear,
          samplerBinding: -1,
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
        {
          binding: 1,
          texture: pass_out,
        },
      ],
    });

    this.customUniformBuffer = customUniformBuffer;
    this.simulateParticlesPipeline = simulateParticlesPipeline;
    this.simulateParticlesBindings = simulateParticlesBindings;
    this.clearPipeline = clearPipeline;
    this.clearBindings = clearBindings;
    this.rasterizePipeline = rasterizePipeline;
    this.rasterizeBindings = rasterizeBindings;
    this.mainImagePipeline = mainImagePipeline;
    this.mainImageBindings = mainImageBindings;
    this.pass_in = pass_in;
    this.pass_out = pass_out;
  }

  compute({ overallAvg, upperAvgFr, lowerAvgFr }) {
    const {
      options,
      customUniformBuffer,
      device,
      $canvas,
      simulateParticlesPipeline,
      simulateParticlesBindings,
      clearPipeline,
      clearBindings,
      rasterizePipeline,
      rasterizeBindings,
      mainImagePipeline,
      mainImageBindings,
    } = this;
    customUniformBuffer.setSubData(
      0,
      new Uint8Array(
        new Float32Array([
          (modulate(overallAvg, 0, 1, 0.5, 4) / 400) * options.radius,
          options.timeStep,
          options.samples,
          options.blurRadius,
          options.velocityDecay,
          options.speed,
          modulate(upperAvgFr, 0, 1, 0.5, 4) / 3,
          modulate(lowerAvgFr, 0, 1, 0.5, 4) / 3,
          options.animatedNoise,
          options.accumulation,
          options.exposure,
        ]).buffer,
      ),
    );

    const x = Math.ceil($canvas.width / 16);
    const y = Math.ceil($canvas.height / 16);

    const computePass = device.createComputePass();

    computePass.setPipeline(simulateParticlesPipeline);
    computePass.setBindings(simulateParticlesBindings);
    computePass.dispatchWorkgroups(x, y);

    computePass.setPipeline(clearPipeline);
    computePass.setBindings(clearBindings);
    computePass.dispatchWorkgroups(x, y);

    computePass.setPipeline(rasterizePipeline);
    computePass.setBindings(rasterizeBindings);
    computePass.dispatchWorkgroups(x, y);

    computePass.setPipeline(mainImagePipeline);
    computePass.setBindings(mainImageBindings);
    computePass.dispatchWorkgroups(x, y);
    device.submitPass(computePass);
    device.copySubTexture2D(this.pass_in, 0, 0, this.pass_out, 0, 0, 4);
  }

  update(options: Partial<StardustOptions>) {
    this.options = {
      ...this.options,
      ...options,
    };
  }

  destroy() {
    this.customUniformBuffer.destroy();
    this.pass_in.destroy();
    this.pass_out.destroy();
    this.simulateParticlesPipeline.destroy();
    this.clearPipeline.destroy();
    this.rasterizePipeline.destroy();
    this.mainImagePipeline.destroy();

    super.destroy();
  }
}
