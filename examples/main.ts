import { Audio } from '../src';
import * as demos from './demos';
import { initExample } from './utils';

const select = document.createElement('select');
select.id = 'example-select';
select.style.margin = '1em';
select.onchange = onChange;
select.style.display = 'block';
document.body.append(select);

const options = Object.keys(demos).map((d) => {
  const option = document.createElement('option');
  option.textContent = d;
  option.value = d;
  return option;
});
options.forEach((d) => select.append(d));

const initialValue = new URL(location as any).searchParams.get(
  'name',
) as string;
if (demos[initialValue]) select.value = initialValue;

const $container = document.getElementById('container')!;
const $audio = document.getElementById('audio')! as HTMLAudioElement;
const $file = document.getElementById('file')!;

const handleFileChanged = (e) => {
  const files = e.target.files;
  $audio.src = URL.createObjectURL(files[0]);
  $audio.load();
  $audio.play();

  render();
};
$file.onchange = handleFileChanged;

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

let audio: Audio;
const throttle = (func, delay) => {
  // Previously called time of the function
  let prev = 0;
  return (...args) => {
    // Current called time of the function
    let now = new Date().getTime();

    // Logging the difference
    // between previously
    // called and current called timings
    console.log(now - prev, delay);

    // If difference is greater
    // than delay call
    // the function again.
    if (now - prev > delay) {
      prev = now;

      // "..." is the spread
      // operator here
      // returning the function with the
      // array of arguments
      return func(...args);
    }
  };
};
window.addEventListener('resize', () => {
  if (audio) {
    throttle(audio.resize(window.innerWidth, window.innerHeight), 300);
  }
});

async function render() {
  if (audio) {
    audio.destroy();
  }
  $container.innerHTML = '';

  const demo = demos[select.value];
  audio = await initExample($container, $audio, demo);

  // @ts-ignore
  if (window.screenshot) {
    // @ts-ignore
    await window.screenshot();
  }
}

function onChange() {
  const { value } = select;
  history.pushState({ value }, '', `?name=${value}`);
  render();
}
