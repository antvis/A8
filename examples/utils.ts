import { throttle } from '@antv/util';
import * as lil from 'lil-gui';
import Stats from 'stats.js';
import { Audio } from '../src';

export async function initExample(
  $container: HTMLElement,
  audio: Audio,
  render: (audio: Audio, gui: lil.GUI) => Promise<void>,
) {
  let $canvasContainer = document.getElementById('canvas')!;
  if ($canvasContainer) {
    $canvasContainer.remove();
  }
  $canvasContainer = document.createElement('div');
  $canvasContainer.id = 'canvas';
  $container.appendChild($canvasContainer);

  $canvasContainer.innerHTML = '';
  const $canvas = document.createElement('canvas');
  $canvas.width = window.innerWidth * window.devicePixelRatio;
  $canvas.height = window.innerHeight * window.devicePixelRatio;
  $canvas.style.width = `${$canvas.width / window.devicePixelRatio}px`;
  $canvas.style.height = `${$canvas.height / window.devicePixelRatio}px`;
  $canvas.style.outline = 'none';
  $canvas.style.padding = '0px';
  $canvas.style.margin = '0px';
  $canvasContainer.appendChild($canvas);

  // GUI
  const gui = new lil.GUI({ autoPlace: false });
  $container.appendChild(gui.domElement);

  await render(audio, gui);

  // stats.js
  const stats = new Stats();
  stats.showPanel(0);
  const $stats = stats.dom;
  $stats.style.position = 'absolute';
  $stats.style.left = '0px';
  $stats.style.bottom = '0px';
  document.body.appendChild($stats);
  audio.onframe = () => {
    stats.update();
  };
}

export function initFullscreen(audio: Audio) {
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Enter') {
        toggleFullScreen();
      }
    },
    false,
  );
  window.addEventListener('resize', () => {
    throttle(
      () => audio.resize(window.innerWidth, window.innerHeight),
      300,
      {},
    );
  });
}
