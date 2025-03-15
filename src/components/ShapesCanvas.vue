<script setup lang="ts">
import { ref, computed } from "vue";
import { Shape, Point2d } from "../types";
import ShapeEl from "./ShapeEl.vue";
import { exampleShapes } from "./shapes";
import { calculateSnapPointX, calculateSnapPointY } from "./utils";

const shapes = ref<Shape[]>(exampleShapes);
const offset = ref<Point2d | null>(null);
const editingPoint = ref<Point2d | null>(null);
const selectedShape = ref<Shape | null>(null);

const snapPointsX = computed(() => {
  return shapes.value
    .filter((shape) => selectedShape.value !== shape)
    .map((shape) => calculateSnapPointX(shape))
    .reduce((acc, curr) => [...acc, ...curr], []);
});

const snapPointsY = computed(() => {
  return shapes.value
    .filter((shape) => selectedShape.value !== shape)
    .map((shape) => calculateSnapPointY(shape))
    .reduce((acc, curr) => [...acc, ...curr], []);
});

const handlePointerMove = (shape: Shape, event: PointerEvent) => {
  if (selectedShape.value !== shape) return;

  editingPoint.value = {
    x: event.offsetX - offset.value.x,
    y: event.offsetY - offset.value.y,
  };
};

const handlePointerDown = (shape: Shape, event: PointerEvent) => {
  selectedShape.value = shape;
  offset.value = {
    x: event.offsetX - shape.x,
    y: event.offsetY - shape.y,
  };
  event.target.setPointerCapture(event.pointerId);
};

const handlePointerUp = (
  shape: Shape,
  event: PointerEvent,
  newPoint: Point2d
) => {
  if (editingPoint.value) {
    shape.x = newPoint.x;
    shape.y = newPoint.y;
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
      <g v-for="snapPoint in snapPointsY">
        <line
          :x1="0"
          :y1="snapPoint"
          :x2="1200"
          :y2="snapPoint"
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
        :snapPointsX="snapPointsX"
        :snapPointsY="snapPointsY"
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
