<script setup lang="ts">
import { ref, computed } from "vue";
import { Shape, Circle, Rect } from "../types";
import ShapeEl from "./ShapeEl.vue";

function calculateSnapPointX(shape: Shape) {
  const result = [];

  result.push(shape.x + shape.boundingBox.x1);
  result.push(shape.x + shape.boundingBox.x2);
  result.push(shape.x + (shape.boundingBox.x1 + shape.boundingBox.x2) / 2);

  return result;
}

const snapPointsX = computed(() => {
  return shapes.value
    .filter((shape) => selectedShape.value !== shape)
    .map((shape) => calculateSnapPointX(shape))
    .reduce((acc, curr) => [...acc, ...curr], []);
});

const shapes = ref<Shape[]>([
  {
    x: 300,
    y: 200,
    type: "CircleEl",
    r: 100,
    boundingBox: {
      x1: -100,
      y1: -100,
      x2: 100,
      y2: 100,
    },
  },
  {
    x: 700,
    y: 500,
    type: "RectEl",
    width: 200,
    height: 150,
    boundingBox: {
      x1: 0,
      y1: 0,
      x2: 200,
      y2: 150,
    },
  },
]);

interface Point2d {
  x: number;
  y: number;
}

const offset = ref<Point2d | null>(null);
const editingPoint = ref<Point2d | null>(null);

const handlePointerMove = (shape: Shape, event: PointerEvent) => {
  if (selectedShape.value !== shape) return;

  editingPoint.value = {
    x: event.offsetX - offset.value.x,
    y: event.offsetY - offset.value.y,
  };
};

const selectedShape = ref<Shape | null>(null);

const handlePointerDown = (shape: Shape, event: PointerEvent) => {
  selectedShape.value = shape;
  offset.value = {
    x: event.offsetX - shape.x,
    y: event.offsetY - shape.y,
  };
  event.target.setPointerCapture(event.pointerId);
};

const handlePointerUp = (shape: Shape, event: PointerEvent) => {
  if (editingPoint.value) {
    shape.x = editingPoint.value.x;
    shape.y = editingPoint.value.y;
  }

  selectedShape.value = null;
  editingPoint.value = null;

  event.target.releasePointerCapture(event.pointerId);
};
</script>

<template>
  <div class="canvas-container">
    <svg width="1200" height="1000" class="shapes-canvas">
      <g v-for="snapPoint in snapPointsX">
        <line
          :x1="snapPoint"
          y1="0"
          :x2="snapPoint"
          y2="1000"
          stroke="black"
          opacity="0.1"
        />
      </g>
      <ShapeEl
        v-for="shape in shapes"
        :shape="shape"
        :key="`${shape.type}-${shape.x}-${shape.y}`"
        :editingPoint="editingPoint"
        :selectedShape="selectedShape"
        @handlePointerMove="handlePointerMove"
        @handlePointerDown="handlePointerDown"
        @handlePointerUp="handlePointerUp"
      />
    </svg>
  </div>
</template>

<style scoped>
.canvas-container {
  margin: 20px auto;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.shapes-canvas {
  background-color: #f9f9f9;
}

.bounding-box {
  pointer-events: none;
}
</style>
