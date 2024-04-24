import { SineEffect } from '../../src/effects/sine';
import { A8 } from '../../src/index';

const $file = document.getElementById('file')!;
const $block = document.getElementById('audio-block');

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
