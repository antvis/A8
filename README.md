# @antv/a8

We try to use GPGPU in audio visualization.

- https://observablehq.com/@antv/compute-toys

## Installing

```bash
npm install @antv/a8
```

```ts
import { Audio } from '@antv/a8';

const audio = new Audio({
  canvas: $canvas,
  data: $audio,
});
audio.play();
```
