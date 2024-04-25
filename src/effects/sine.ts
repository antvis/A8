export type Effect = (
  analyser: AnalyserNode,
  options?: {
    container: HTMLElement;
  },
) => {
  visualize: () => void;
  resize: () => void;
};
import { Canvas, Rect } from '@antv/g-lite';
import { Renderer } from '@antv/g-canvas';

const WIDTH = document.body.clientWidth;
const HEIGHT = 2 * 150;

const SineEffect: Effect = (analyser) => {
  analyser.fftSize = 512; //  默认值2018 必须是2的n次冥, 值越大越细腻
  const dataArray = new Uint8Array(analyser.frequencyBinCount); // 512 /2
  const canvas = new Canvas({
    container: 'container',
    width: WIDTH,
    height: HEIGHT,
    renderer: new Renderer(),
  });

  const resize = () => {};
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry !== canvas) {
        continue;
      }
      const { width, height } = entry.contentRect;
      // resize canvas
      canvas.resize(width, height);
    }
  });

  resizeObserver.observe(document.querySelector('#container'));

  const visualize = () => {
    canvas.removeChildren();
    analyser.getByteFrequencyData(dataArray);
    const len = dataArray.length / 2.5;
    const barWidth = WIDTH / len;

    for (let i = 0; i < len; i++) {
      const data = dataArray[i]; // < 256
      const barHeight = (data / 255) * HEIGHT;
      // 可优化, 保存引用, 然后通过attr('height', n) 来设置
      const rect = new Rect({
        style: {
          width: barWidth - 2,
          height: barHeight,
          x: i * barWidth,
          y: HEIGHT - barHeight,
          fill: '#e9dcf7',
        },
      });
      canvas.appendChild(rect);
    }
  };

  return {
    visualize,
    resize,
  };
};

export { SineEffect };
