import * as lil from 'lil-gui';
import Stats from 'stats.js';
import { Audio, Effect } from '../src';
import * as demos from './demos';
import { initFullscreen } from './utils';

let audio: Audio;
let effect: Effect;
let folder: lil.GUI;
const $container = document.getElementById('container')!;
const initialEffect =
  (new URL(location as any).searchParams.get('name') as string) || 'GPUSine';
const changeEffect = (value: string) => {
  history.pushState({ value }, '', `?name=${value}`);
  if (folder) {
    folder.destroy();
  }

  // Switch effect
  [effect, folder] = demos[value](audio, gui);
  audio.effect(effect);
};

// GUI
let gui = new lil.GUI({ autoPlace: false });
const effectFolder = gui.addFolder('effect');
const effectConfig = {
  name: initialEffect,
};
effectFolder
  .add(effectConfig, 'name', Object.keys(demos))
  .onChange(changeEffect);
$container.appendChild(gui.domElement);

const $spinner = document.getElementById('spinner')!;
const $file = document.getElementById('file')!;
const $canvasContainer = document.createElement('div');
$canvasContainer.id = 'canvas';
$container.appendChild($canvasContainer);
const $canvas = document.createElement('canvas');
$canvas.width = window.innerWidth * window.devicePixelRatio;
$canvas.height = window.innerHeight * window.devicePixelRatio;
$canvas.style.width = `${$canvas.width / window.devicePixelRatio}px`;
$canvas.style.height = `${$canvas.height / window.devicePixelRatio}px`;
$canvas.style.outline = 'none';
$canvas.style.padding = '0px';
$canvas.style.margin = '0px';
$canvasContainer.appendChild($canvas);

// stats.js
const stats = new Stats();
stats.showPanel(0);
const $stats = stats.dom;
$stats.style.position = 'absolute';
$stats.style.left = '0px';
$stats.style.bottom = '0px';
document.body.appendChild($stats);
const $block = document.getElementById('audio-block');

(async () => {
  $spinner.style.display = 'block';
  $file.setAttribute('disabled', '');

  // Create Audio
  audio = new Audio({
    canvas: $canvas,
  });
  audio.oninit = () => {
    $spinner.style.display = 'none';
    $file.removeAttribute('disabled');
  };
  audio.onframe = () => {
    stats.update();
  };

  changeEffect(initialEffect);
  audio.play();

  initFullscreen(audio);

  let $audio: HTMLAudioElement;
  $file.onchange = (e) => {
    if ($audio) {
      $audio?.remove();
    }

    $audio = document.createElement('audio');
    $block?.appendChild($audio);
    $audio.id = 'audio';
    $audio.controls = true;
    // @ts-ignore
    const files = e.target.files;
    $audio.src = URL.createObjectURL(files[0]);
    $audio.load();
    $audio.play();

    // Switch audio.
    audio.data($audio);
  };
})();
