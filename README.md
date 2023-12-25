# @antv/a8

A library for audio visualization using the following rendering techniques:

- Canvas2D with [@antv/g-canvas](https://g.antv.antgroup.com/api/renderer/canvas).
- WebGPU WGSL compute shader with [@antv/g-device-api](https://github.com/antvis/g-device-api). https://observablehq.com/@antv/compute-toys

We provide the following effects now:

<img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/
A*ZSEdS7qJSagAAAAAAAAAAAAADvR5AQ/original" alt="gpu sine" height="200" /><img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/A*PcO9Qq58pQYAAAAAAAAAAAAADvR5AQ/original" alt="gpu stardust" height="200" />

## Getting Started

Install from NPM:

```bash
npm install @antv/a8
```

Create

```ts
import { Audio, Sine } from '@antv/a8';

const audio = new Audio({
  canvas: $canvas,
});
audio.data($audio).effect(new Sine()).play();
```

## API

### Constructor

```ts
new Audio({
  canvas: $canvas,
});
```

- canvas `HTMLCanvasElement`

### data()

Create a [AudioContext]() and [Analyser]().

```ts
audio.data($audio);
```

### effect()

Create an effect.

```ts
import { Sine } from '@antv/a8';

audio.effect(new Sine());
```

### style()

Update style options of effect.

```ts
audio.style({ blur: 1 });
```

### play()

```ts
audio.play();
```

### destroy()

Destroy rAF and GPU resources(if any).

```ts
audio.destroy();
```

## Effects

We provide the following effect now.

### GPU Sine

<img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/
A*ZSEdS7qJSagAAAAAAAAAAAAADvR5AQ/original" alt="gpu sine" height="200" />

- radius `number`
- sinea `number`
- sineb `number`
- speed `number`
- blur `number`
- samples `number`
- mode `number`

### GPU Stardust

<img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/A*PcO9Qq58pQYAAAAAAAAAAAAADvR5AQ/original" alt="gpu stardust" height="200" />

- radius `number`
- timeStep `number`
- samples `number`
- blurRadius `number`
- velocityDecay `number`
- speed `number`
- blurExponentA `number`
- blurExponentB `number`
- animatedNoise `number`
- accumulation `number`
- exposure `number`
