import * as lil from 'lil-gui';

export async function initExample(
  $container: HTMLElement,
  $audio: HTMLAudioElement,
  render: (
    $canvas: HTMLCanvasElement,
    data: HTMLAudioElement,
  ) => Promise<() => void>,
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
  $canvas.width = 1000;
  $canvas.height = 1000;
  $canvas.style.width = `${$canvas.width / window.devicePixelRatio}px`;
  $canvas.style.height = `${$canvas.height / window.devicePixelRatio}px`;
  $canvas.style.outline = 'none';
  $canvas.style.padding = '0px';
  $canvas.style.margin = '0px';
  $canvasContainer.appendChild($canvas);

  let disposeCallback = await render($canvas, $audio);

  // GUI
  const gui = new lil.GUI({ autoPlace: false });
  $container.appendChild(gui.domElement);

  return disposeCallback;
}
