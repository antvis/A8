export interface Effect {
  init($canvas: HTMLCanvasElement): Promise<void>;
  resize(width: number, height: number): void;
  frame(frame: number, elapsed: number, mouse: any, buffer: Uint8Array): void;
  update(options: any): void;
  destroy(): void;
}
