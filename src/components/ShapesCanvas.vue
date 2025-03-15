<script setup lang="ts">
import { ref } from "vue";
import { Shape, Circle, Rect } from "../types";
import CircleEl from "./CircleEl.vue";
import RectEl from "./RectEl.vue";

const components = {
  CircleEl,
  RectEl,
};

const shapes = ref<Shape[]>([
  {
    x: 300,
    y: 200,
    type: "CircleEl",
    r: 100,
    boundingBox: {
      x: -100,
      y: -100,
      width: 200,
      height: 200,
    },
  },
  {
    x: 700,
    y: 500,
    type: "RectEl",
    width: 200,
    height: 150,
    boundingBox: {
      x: 0,
      y: 0,
      width: 200,
      height: 150,
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
          :x="shape.boundingBox.x"
          :y="shape.boundingBox.y"
          :width="shape.boundingBox.width"
          :height="shape.boundingBox.height"
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
