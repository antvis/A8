import { Effect } from './effects';

export interface Options {
  canvas: HTMLCanvasElement;
  data?: HTMLMediaElement;
  effect?: Effect;
}

export class Audio {
  private analyser: AnalyserNode;
  private dataArray: Uint8Array;
  private timer: number;
  private ready: Promise<void>;

  onframe: () => void = () => {};

  constructor(private options: Options) {
    if (options.data) {
      this.initAnalyser();
    }
    if (options.effect) {
      this.initEffect();
    }
  }

  private initAnalyser() {
    const { data } = this.options;
    const context = new AudioContext();
    const src = context.createMediaElementSource(data);
    const analyser = context.createAnalyser();
    this.analyser = analyser;
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.dataArray = dataArray;
  }

  private initEffect() {
    const { canvas, effect } = this.options;
    this.ready = effect.init(canvas);
  }

  data($audio: HTMLMediaElement) {
    this.options.data = $audio;
    this.initAnalyser();
    return this;
  }

  effect(effect: Effect) {
    this.options.effect = effect;
    this.initEffect();
    return this;
  }

  style(options: any) {
    this.options.effect?.update(options);
    return this;
  }

  async play() {
    await this.ready;

    let frame = 0;
    const tick = (elapsed: number) => {
      this.analyser.getByteFrequencyData(this.dataArray);
      this.options.effect.frame(frame, elapsed / 1000, this.dataArray);

      this.onframe();
      frame++;
      this.timer = requestAnimationFrame(tick);
    };

    this.timer = requestAnimationFrame(tick);
  }

  resize(width: number, height: number) {
    const { canvas } = this.options;
    const $canvas = canvas;
    $canvas.width = width * window.devicePixelRatio;
    $canvas.height = height * window.devicePixelRatio;
    $canvas.style.width = `${$canvas.width / window.devicePixelRatio}px`;
    $canvas.style.height = `${$canvas.height / window.devicePixelRatio}px`;

    this.options.effect.resize($canvas.width, $canvas.height);
  }

  destroy() {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
    }
    this.options.effect.destroy();
    if (this.analyser) {
      this.analyser.disconnect();
    }
  }
}
