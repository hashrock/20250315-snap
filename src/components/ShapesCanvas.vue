<script setup lang="ts">
import { ref } from "vue";
import { Shape, Circle, Rect } from "../types";

const shapes = ref<Shape[]>([
  {
    x: 300,
    y: 200,
    type: "circle",
    r: 100,
  },
  {
    x: 700,
    y: 500,
    type: "rect",
    width: 200,
    height: 150,
  },
]);
</script>

<template>
  <div class="canvas-container">
    <svg width="1200" height="1000" class="shapes-canvas">
      <template
        v-for="shape in shapes"
        :key="`${shape.type}-${shape.x}-${shape.y}`"
      >
        <circle
          v-if="shape.type === 'circle'"
          :cx="shape.x"
          :cy="shape.y"
          :r="shape.r"
          fill="#42b883"
          stroke="#333"
          stroke-width="2"
        />
        <rect
          v-else-if="shape.type === 'rect'"
          :x="shape.x"
          :y="shape.y"
          :width="shape.width"
          :height="shape.height"
          fill="#646cff"
          stroke="#333"
          stroke-width="2"
        />
      </template>
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
</style>
