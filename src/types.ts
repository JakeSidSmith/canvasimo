import Canvasimo from './';

export interface Point {
  x: number;
  y: number;
}

export type TuplePoint = number[];

export type PointArray = Point[];
export type TuplePointArray = TuplePoint[];
export type NumberArray = number[];

export type AnyPoint = Point | TuplePoint | number;
export type Points = PointArray | TuplePointArray | NumberArray;

export type CanvasContext = CanvasRenderingContext2D | WebGLRenderingContext | null;
export type CanvasContextAttributes = Canvas2DContextAttributes | WebGLContextAttributes;

export interface Size {
  width: number;
  height: number;
}

export type GlobalCompositeOperation = 'source-over' |
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

export type FillOrStrokeStyle = Color | CanvasGradient | CanvasPattern;

export type LineCap = 'butt' | 'round' | 'square';

export type LineJoin = 'bevel' | 'round' | 'miter';

export type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end';

export type FillRule = 'nonzero' | 'evenodd';

export type TextBaseline = 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';

export type Segments = number[];

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
  (color?: string | FillRule): Canvasimo;
  (color: string, fillRule: FillRule): Canvasimo;
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
  (str: string, callback: (value: string, index: number) => any): Canvasimo;
  (obj: any[], callback: (value: any, index: number) => any): Canvasimo;
  (obj: {[i: string]: any}, callback: (value: any, key: string) => any): Canvasimo;
}
