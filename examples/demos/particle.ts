import { Audio, Particle } from '../../src';

export async function render(
  $canvas: HTMLCanvasElement,
  data: HTMLAudioElement,
) {
  const shaderCompilerPath = new URL(
    '/public/glsl_wgsl_compiler_bg.wasm',
    import.meta.url,
  ).href;
  const effect = new Particle(shaderCompilerPath);

  const audio = new Audio({
    canvas: $canvas,
    data,
    effect,
  });
  audio.play();

  return () => {
    audio.destroy();
  };
}
