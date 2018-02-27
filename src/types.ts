import Canvasimo from './';

export type Segments = number[];

export type Points = Array<{x: number, y: number}> | Array<[number, number]> | number[];

// tslint:disable-next-line:max-line-length
export type GlobalCompositeOperation = 'source-over' | 'source-in' | 'source-out' | 'source-atop' | 'destination-over' | 'destination-in' | 'destination-out' | 'destination-atop' | 'lighter' | 'copy' | 'xor' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
export type TextBaseline = 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
export type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end';
export type LineJoin = 'bevel' | 'round' | 'miter';
export type LineCap = 'butt' | 'round' | 'square';
export type FillRule = 'nonzero' | 'evenodd';
export type WordBreak = 'normal' | 'break-word' | 'break-all';
export type BooleanFalsy = boolean | undefined | null;
export type MaxWidth = number | undefined | null;

export type ImageLike = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap;
export type CanvasContextAttributes = Canvas2DContextAttributes | WebGLContextAttributes;
export type CanvasContext = CanvasRenderingContext2D | WebGLRenderingContext | null;
export type FillOrStrokeStyle = string | CanvasGradient | CanvasPattern;

// tslint:disable-next-line:interface-over-type-literal
export type Size = {
  width: number;
  height: number;
};

export interface SetSize {
  (size: Size): Canvasimo;
  (width: number, height: number): Canvasimo;
}

export interface DrawImage {
  (
    image: ImageLike,
    dstX: number,
    dstY: number
  ): Canvasimo;
  (
    image: ImageLike,
    dstX: number,
    dstY: number,
    dstW: number,
    dstH: number
  ): Canvasimo;
  (
    image: ImageLike,
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
  (color?: string): Canvasimo;
  (fillRule?: FillRule): Canvasimo; // tslint:disable-line:unified-signatures
  (color: string, fillRule: FillRule): Canvasimo; // tslint:disable-line:unified-signatures
}

export interface Stroke {
  (color?: string): Canvasimo;
  (path?: Path2D): Canvasimo; // tslint:disable-line:unified-signatures
  (color: string, path: Path2D): Canvasimo; // tslint:disable-line:unified-signatures
}

export interface GetAngle {
  (x1: number, y1: number, x2: number, y2: number): number;
  (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number;
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
