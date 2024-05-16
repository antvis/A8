import { SineEffect } from '../../src/effects/sine';
import { A8 } from '../../src/index';

const $file = document.getElementById('file')!;
const $block = document.getElementById('audio-block');
const $url = document.getElementById('url')!;

const a8 = new A8();
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
  a8.data($audio).effect(SineEffect).play();
};

let delay;
document.querySelector('#submit')!.addEventListener('click', (e) => {
  const value = (document.querySelector('#url') as HTMLInputElement).value;

  if (!value) return;
  if (delay) clearTimeout(delay);
  delay = setTimeout(() => {
    a8.data(value).effect(SineEffect).play();
  }, 500);
});

console.log('可用的远程url地址 https://api.injahow.cn/meting/');
