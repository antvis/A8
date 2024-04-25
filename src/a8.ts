import { Effect } from './effects/sine';

import player from './player';
import Fetcher from './fetcher';

type A8Evens = {
  fetching: [number];
};
type A8Options = {
  mediaElement?: HTMLMediaElement;
  container: HTMLElement;
  fetchParams?: RequestInit;
  mediaControls?: boolean;
};

const DEFAULT_OPTIONS = {};
class A8 extends player<A8Evens> {
  private options: A8Options & typeof DEFAULT_OPTIONS;
  private audioContext: AudioContext;
  private analyser: AnalyserNode | null;
  public visualize: () => void;
  private abortController: AbortController | null = null;

  constructor(options?: A8Options) {
    super({
      media: options?.mediaElement,
      mediaControls: options?.mediaControls,
    });
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
  }

  data(input: HTMLMediaElement | string) {
    if (typeof input === 'string') {
      // 如果是url地址
      const fetchParams = this.options.fetchParams || {};
      if (window.AbortController && !fetchParams.signal) {
        this.abortController = new AbortController();
        fetchParams.signal = this.abortController?.signal;
      }
      (async () => {
        const onProgress = (percentage: number) =>
          this.emit('fetching', percentage);
        const blob = await Fetcher.fetchBlob(input, onProgress, fetchParams);
        this.setSrc(input, blob);
      })();
    }

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(this.media);
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
    this.media.play();
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
  }
}

export { A8 };
