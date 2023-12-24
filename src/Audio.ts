import { Effect } from './effects';

export interface Options {
  canvas: HTMLCanvasElement;
  data: HTMLMediaElement;
  effect: Effect;
}

export class Audio {
  private analyser: AnalyserNode;
  private dataArray: Uint8Array;
  private timer: number;
  private ready: Promise<void>;

  constructor(private options: Options) {
    this.initAnalyser();
    this.initEffect();
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

  data($audio: HTMLMediaElement) {}

  async play() {
    await this.ready;

    let frame = 0;
    const tick = (elapsed: number) => {
      this.analyser.getByteFrequencyData(this.dataArray);
      this.options.effect.frame(frame, elapsed / 1000, this.dataArray);

      frame++;
      this.timer = requestAnimationFrame(tick);
    };

    this.timer = requestAnimationFrame(tick);
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
