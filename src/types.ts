export interface Circle {
  x: number;
  y: number;
  type: "circle";
  r: number;
}

export interface Rect {
  x: number;
  y: number;
  type: "rect";
  width: number;
  height: number;
}

export type Shape = Circle | Rect;
