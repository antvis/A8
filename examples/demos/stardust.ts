import * as lil from 'lil-gui';
import { Audio, Stardust } from '../../src';

export function render(audio: Audio, gui: lil.GUI) {
  const shaderCompilerPath = new URL(
    '/public/glsl_wgsl_compiler_bg.wasm',
    import.meta.url,
  ).href;
  const effect = new Stardust(shaderCompilerPath);

  const folder = gui.addFolder('effect');
  const config = {
    radius: 2.27,
    blurRadius: 0.053,
    samples: 0.115,
    speed: 0.885,
    animatedNoise: 1,
    accumulation: 0.962,
    exposure: 0.779,
    blurExponentA: 1,
    blurExponentB: 1,
    velocityDecay: 0.017,
    timeStep: 0.373,
  };

  folder.add(config, 'radius', 0, 10).onChange((radius: number) => {
    audio.style({ radius });
  });
  folder.add(config, 'blurRadius', 0, 1).onChange((blurRadius: number) => {
    audio.style({ blurRadius });
  });
  folder.add(config, 'samples', 0, 1).onChange((samples: number) => {
    audio.style({ samples });
  });
  folder.add(config, 'speed', 0, 1).onChange((speed: number) => {
    audio.style({ speed });
  });
  folder
    .add(config, 'animatedNoise', 0, 1)
    .onChange((animatedNoise: number) => {
      audio.style({ animatedNoise });
    });
  folder.add(config, 'accumulation', 0, 1).onChange((accumulation: number) => {
    audio.style({ accumulation });
  });
  folder.add(config, 'exposure', 0, 1).onChange((exposure: number) => {
    audio.style({ exposure });
  });
  folder
    .add(config, 'blurExponentA', 0, 1)
    .onChange((blurExponentA: number) => {
      audio.style({ blurExponentA });
    });
  folder
    .add(config, 'blurExponentB', 0, 1)
    .onChange((blurExponentB: number) => {
      audio.style({ blurExponentB });
    });
  folder
    .add(config, 'velocityDecay', 0, 1)
    .onChange((velocityDecay: number) => {
      audio.style({ velocityDecay });
    });
  folder.add(config, 'timeStep', 0, 1).onChange((timeStep: number) => {
    audio.style({ timeStep });
  });

  return [effect, folder];
}
