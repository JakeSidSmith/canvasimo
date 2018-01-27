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
