import type { Shape } from "../types";
export function calculateSnapPointX(shape: Shape) {
  const result = [];

  result.push(shape.x + shape.boundingBox.x1);
  result.push(shape.x + shape.boundingBox.x2);
  result.push(shape.x + (shape.boundingBox.x1 + shape.boundingBox.x2) / 2);

  return result;
}
