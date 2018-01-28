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
