import * as lil from 'lil-gui';
import { Audio, Sine } from '../../src';

export function render(audio: Audio, gui: lil.GUI) {
  const shaderCompilerPath = new URL(
    '/public/glsl_wgsl_compiler_bg.wasm',
    import.meta.url,
  ).href;
  const effect = new Sine(shaderCompilerPath);

  const folder = gui.addFolder('effect');
  const config = {
    radius: 1,
    sinea: 1,
    sineb: 1,
    speed: 0.885,
    blur: 0,
    samples: 0.001,
    mode: 0,
  };

  folder.add(config, 'radius', 0, 10).onChange((radius: number) => {
    audio.style({ radius });
  });
  folder.add(config, 'sinea', 0, 1).onChange((sinea: number) => {
    audio.style({ sinea });
  });
  folder.add(config, 'sineb', 0, 1).onChange((sineb: number) => {
    audio.style({ sineb });
  });
  folder.add(config, 'speed', 0, 1).onChange((speed: number) => {
    audio.style({ speed });
  });
  folder.add(config, 'blur', 0, 1).onChange((blur: number) => {
    audio.style({ blur });
  });

  return [effect, folder];
}
