export interface Effect {
  init($canvas: HTMLCanvasElement): Promise<void>;
  frame(frame: number, elapsed: number, buffer: Uint8Array): void;
  update(): void;
  destroy(): void;
}
