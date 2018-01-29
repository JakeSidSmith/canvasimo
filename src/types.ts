import Canvasimo from './';

export interface Point {
  x: number;
  y: number;
}

export type TuplePoint = [number, number];

export type PointArray = Point[];
export type TuplePointArray = TuplePoint[];
export type NumberArray = [number, number];

export type AnyPoint = Point | TuplePoint | number;
export type Points = PointArray | TuplePointArray | NumberArray;

export type AnyCanvasContext = CanvasRenderingContext2D | WebGLRenderingContext | null;
export type AnyCanvasContextAttributes = Canvas2DContextAttributes | WebGLContextAttributes;

export interface Size {
  width: number;
  height: number;
}

export type GlobalCompositeOperations = 'source-over' |
  'source-in' |
  'source-out' |
  'source-atop' |
  'destination-over' |
  'destination-in' |
  'destination-out' |
  'destination-atop' |
  'lighter' |
  'copy' |
  'xor' |
  'multiply' |
  'screen' |
  'overlay' |
  'darken' |
  'lighten' |
  'color-dodge' |
  'color-burn' |
  'hard-light' |
  'soft-light' |
  'difference' |
  'exclusion' |
  'hue' |
  'saturation' |
  'color' |
  'luminosity';

export type Color = string;

export type FillAndStrokeStyles = Color | CanvasGradient | CanvasPattern;

export type LineCaps = 'butt' | 'round' | 'square';

export type LineJoins = 'bevel' | 'round' | 'miter';

export type TextAligns = 'left' | 'right' | 'center' | 'start' | 'end';

export type TextBaselines = 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';

export type Segments = number[];

export type FillRules = 'nonzero' | 'evenodd';

export interface SetSize {
  (size: Size): Canvasimo;
  (width: number, height: number): Canvasimo;
}

export interface DrawImage {
  (
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
    dstX: number,
    dstY: number
  ): Canvasimo;
  (
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
    dstX: number,
    dstY: number,
    dstW: number,
    dstH: number
  ): Canvasimo;
  (
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
    srcX: number,
    srcY: number,
    srcW: number,
    srcH: number,
    dstX: number,
    dstY: number,
    dstW: number,
    dstH: number
  ): Canvasimo;
}

export interface CreateImageData {
  (width: number, height: number): ImageData;
  (ImageData: ImageData): ImageData;
}

export interface Fill {
  (color?: string | FillRules): Canvasimo;
  (color: string, fillRule: FillRules): Canvasimo;
}

export interface Stroke {
  (color?: string | Path2D): Canvasimo;
  (color: string, path: Path2D): Canvasimo;
}

export interface Repeat {
  (end: number, callback: (i: number) => any): Canvasimo;
  (start: number, end: number, callback: (i: number) => any): Canvasimo;
  (start: number, end: number, step: number, callback: (i: number) => any): Canvasimo;
}

export interface ForEach {
  (obj: any[], callback: (value: any, index: number) => any): Canvasimo;
  (obj: {[i: string]: any}, callback: (value: any, key: string) => any): Canvasimo;
}
