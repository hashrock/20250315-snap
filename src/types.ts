type ShapeType = "CircleEl" | "RectEl";

export interface Circle {
  x: number;
  y: number;
  type: ShapeType;
  r: number;
}

export interface Rect {
  x: number;
  y: number;
  type: ShapeType;
  width: number;
  height: number;
}

export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
export type Shape = Circle | Rect;
