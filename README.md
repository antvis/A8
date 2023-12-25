# @antv/a8

A library for audio visualization using the following rendering techniques:

- Canvas2D with [@antv/g-canvas](https://g.antv.antgroup.com/api/renderer/canvas).
- WebGPU WGSL compute shader with [@antv/g-device-api](https://github.com/antvis/g-device-api). For more information: https://observablehq.com/@antv/compute-toys

We provide the following effects now:

<img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/A*ZSEdS7qJSagAAAAAAAAAAAAADvR5AQ/original" alt="gpu sine" height="200" /><img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/A*PcO9Qq58pQYAAAAAAAAAAAAADvR5AQ/original" alt="gpu stardust" height="200" />
<img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/A*HIFQTan8bFsAAAAAAAAAAAAADvR5AQ/original" alt="gpu blackhole" height="200" />

## Getting Started

Install from NPM.

```bash
npm install @antv/a8
```

Create a audio, set effect and start playing.

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

- $audio `HTMLAudioElement`

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

Start visualizing the audio.

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

- GPU Particles

### GPU Particles

- Sine
- Stardust
- Black Hole

For more informations, see https://observablehq.com/@antv/compute-toys#cell-712

```ts
const shaderCompilerPath = new URL(
  '/public/glsl_wgsl_compiler_bg.wasm',
  import.meta.url,
).href;
const effect = new Stardust(shaderCompilerPath, {});
```

#### GPU Sine

<img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/A*ZSEdS7qJSagAAAAAAAAAAAAADvR5AQ/original" alt="gpu sine" height="200" />

- radius `number`
- sinea `number`
- sineb `number`
- speed `number`
- blur `number`
- samples `number`
- mode `number`

#### GPU Stardust

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

#### GPU BlackHole

https://en.wikipedia.org/wiki/Kerr%E2%80%93Newman_metric

<img src="https://mdn.alipayobjects.com/huamei_vbm5bl/afts/img/A*HIFQTan8bFsAAAAAAAAAAAAADvR5AQ/original" alt="gpu blackhole" height="200" />

- radius `number`
- timeStep `number`
- samples `number`
- animatedNoise `number`
- accumulation `number`
- exposure `number`
- blurExponentA `number`
- blurExponentB `number`
- blurRadius `number`
- kerrA `number`
- kerrQ `number`
- initSpeed `number`
- initThick `number`
- steps `number`
- focalPlane `number`
- motionBlur `number`
- gamma `number`
