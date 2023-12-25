import {
  Bindings,
  Buffer,
  BufferUsage,
  Device,
  Format,
  RenderPipeline,
  RenderTarget,
  SwapChain,
  Texture,
  TextureDimension,
  TextureUsage,
  TransparentWhite,
  WebGPUDeviceContribution,
} from '@antv/g-device-api';
import {
  camera,
  createBlitPipelineAndBindings,
  math,
  prelude,
  registerShaderModule,
} from '../utils';
import { Effect } from '../Effect';
import { avg, max } from '../../utils';

/**
 * WebGPU compute shader.
 */
export class GPUParticleEffect implements Effect {
  protected $canvas: HTMLCanvasElement;
  protected device: Device;
  protected swapChain: SwapChain;
  protected renderTarget: RenderTarget;
  protected uniformBuffer: Buffer;
  protected screen: Texture;
  private blitPipeline: RenderPipeline;
  private blitBindings: Bindings;
  private resized = false;

  constructor(private shaderCompilerPath: string) {}

  /**
   * Register custom shader module.
   */
  protected registerShaderModule() {}

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
    this.screen = screen;

    const { pipeline: blitPipeline, bindings: blitBindings } =
      createBlitPipelineAndBindings(device, screen);

    registerShaderModule(device, prelude);
    registerShaderModule(device, math);
    registerShaderModule(device, camera);

    const renderTarget = device.createRenderTarget({
      format: Format.U8_RGBA_RT,
      width: $canvas.width,
      height: $canvas.height,
    });

    const uniformBuffer = device.createBuffer({
      viewOrSize: 2 * Float32Array.BYTES_PER_ELEMENT,
      usage: BufferUsage.UNIFORM,
    });
    uniformBuffer.setSubData(
      0,
      new Uint8Array(new Float32Array([0, 0]).buffer),
    );

    this.uniformBuffer = uniformBuffer;
    this.blitPipeline = blitPipeline;
    this.blitBindings = blitBindings;
    this.renderTarget = renderTarget;

    this.registerShaderModule();
  }

  resize(width: number, height: number) {
    this.resized = true;
  }

  /**
   * Parameter changes
   */
  update(options: any) {}

  protected compute(buffer: {}) {}

  frame(frame: number, elapsed: number, buffer: Uint8Array) {
    const {
      device,
      swapChain,
      uniformBuffer,
      $canvas,
      blitPipeline,
      blitBindings,
    } = this;
    if (this.resized) {
      swapChain.configureSwapChain($canvas.width, $canvas.height);
      if (this.renderTarget) {
        this.renderTarget.destroy();
        this.renderTarget = device.createRenderTarget({
          format: Format.U8_RGBA_RT,
          width: $canvas.width,
          height: $canvas.height,
        });
        this.resized = false;
      }
    }

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

    uniformBuffer.setSubData(
      0,
      new Uint8Array(new Float32Array([frame, elapsed]).buffer),
    );

    this.compute({
      lowerMaxFr,
      lowerAvgFr,
      upperMaxFr,
      upperAvgFr,
      overallAvg,
    });

    /**
     * An application should call getCurrentTexture() in the same task that renders to the canvas texture.
     * Otherwise, the texture could get destroyed by these steps before the application is finished rendering to it.
     */
    const onscreenTexture = swapChain.getOnscreenTexture();
    const renderPass = device.createRenderPass({
      colorAttachment: [this.renderTarget],
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
    this.uniformBuffer.destroy();
    this.blitPipeline.destroy();
    this.device.destroy();
  }
}
