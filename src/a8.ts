import { Effect } from './effects/sine';
import { Effect } from './effects';
import EventEmitter from './event-emitter';

type A8Evens = {};
type A8Options = {
  mediaElement?: HTMLMediaElement;
  container: HTMLElement;
};

const DEFAULT_OPTIONS = {};
class A8 extends EventEmitter<A8Evens> {
  private options: A8Options & typeof DEFAULT_OPTIONS;
  private audioContext: AudioContext;
  private analyser: AnalyserNode | null;
  public visualize: () => void;
  private mediaElement: HTMLMediaElement;

  constructor(options?: A8Options) {
    super();
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
  }

  data(mediaElement: HTMLMediaElement) {
    this.mediaElement = mediaElement;
    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(mediaElement);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    this.analyser = analyser;
    return this;
  }

  // 时域图 ->(频谱分析)快速傅立叶变换 -> 频域图
  effect(effect: Effect) {
    const { visualize } = effect(this.analyser, {
      container: this.options.container,
    });
    this.visualize = visualize;
    return this;
  }

  play() {
    this.mediaElement.play();
    const draw = () => {
      requestAnimationFrame(draw);
      // 1. 清空画布 ctx.clearRect(0,0,width,height)
      // 2. 取chunk
      if (!this.analyser) {
        return;
      }
      this.visualize();
    };
    draw();
    this.mediaElement.play();
  }
}

export { A8 };
