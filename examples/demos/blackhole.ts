import * as lil from 'lil-gui';
import { Audio, BlackHole } from '../../src';

export async function render(
  $canvas: HTMLCanvasElement,
  $audio: HTMLAudioElement,
  gui: lil.GUI,
) {
  const shaderCompilerPath = new URL(
    '/public/glsl_wgsl_compiler_bg.wasm',
    import.meta.url,
  ).href;
  const effect = new BlackHole(shaderCompilerPath);

  const audio = new Audio({
    canvas: $canvas,
  });
  audio.data($audio).effect(effect).play();

  const folder = gui.addFolder('effect');
  const config = {
    radius: 1,
    timeStep: 0.039,
    samples: 0.03,
    animatedNoise: 0,
    accumulation: 1,
    exposure: 0.369,
    blurExponentA: 0.393,
    blurExponentB: 0.81,
    blurRadius: 0.743, // BlurRadius
    kerrA: 0.876, // KerrA
    kerrQ: 0, // KerrQ
    initSpeed: 0.719, // InitSpeed
    initThick: 0.22, // InitThick
    steps: 0.387, // Steps
    focalPlane: 0.53, // FocalPlane
    motionBlur: 0.829, // MotionBlur
    gamma: 0.827, // Gamma
  };

  folder.add(config, 'radius', 0, 10).onChange((radius: number) => {
    audio.style({ radius });
  });
  folder.add(config, 'timeStep', 0, 1).onChange((timeStep: number) => {
    audio.style({ timeStep });
  });
  folder.add(config, 'samples', 0, 1).onChange((samples: number) => {
    audio.style({ samples });
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
  folder.add(config, 'blurRadius', 0, 1).onChange((blurRadius: number) => {
    audio.style({ blurRadius });
  });

  folder.add(config, 'kerrA', 0, 1).onChange((kerrA: number) => {
    audio.style({ kerrA });
  });
  folder.add(config, 'kerrQ', 0, 1).onChange((kerrQ: number) => {
    audio.style({ kerrQ });
  });
  folder.add(config, 'initSpeed', 0, 1).onChange((initSpeed: number) => {
    audio.style({ initSpeed });
  });
  folder.add(config, 'initThick', 0, 1).onChange((initThick: number) => {
    audio.style({ initThick });
  });
  folder.add(config, 'steps', 0, 1).onChange((steps: number) => {
    audio.style({ steps });
  });

  return audio;
}
