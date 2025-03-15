<script setup lang="ts">
import { ref, computed } from "vue";
import { Shape, Circle, Rect } from "../types";
import CircleEl from "./CircleEl.vue";
import RectEl from "./RectEl.vue";

const components = {
  CircleEl,
  RectEl,
};

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

const handlePointerMove = (shape: Shape, event: PointerEvent) => {
  if (selectedShape.value !== shape) return;
  shape.x += event.movementX;
  shape.y += event.movementY;
};

const selectedShape = ref<Shape | null>(null);

const handlePointerDown = (shape: Shape, event: PointerEvent) => {
  selectedShape.value = shape;
  event.target.setPointerCapture(event.pointerId);
};

const handlePointerUp = (shape: Shape, event: PointerEvent) => {
  selectedShape.value = null;
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

      <g
        v-for="shape in shapes"
        :transform="`translate(${shape.x}, ${shape.y})`"
        @pointermove="handlePointerMove(shape, $event)"
        @pointerdown="handlePointerDown(shape, $event)"
        @pointerup="handlePointerUp(shape, $event)"
      >
        <component
          :is="components[shape.type]"
          :shape="shape"
          :key="`${shape.type}-${shape.x}-${shape.y}`"
        />

        <!-- バウンディングボックス -->
        <rect
          :x="shape.boundingBox.x1"
          :y="shape.boundingBox.y1"
          :width="shape.boundingBox.x2 - shape.boundingBox.x1"
          :height="shape.boundingBox.y2 - shape.boundingBox.y1"
          fill="none"
          stroke="#4287f5"
          stroke-width="2"
          :stroke-dasharray="selectedShape === shape ? 'none' : '5,5'"
          class="bounding-box"
        />
      </g>
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
