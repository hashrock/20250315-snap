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
  },
  {
    x: 700,
    y: 500,
    type: "RectEl",
    width: 200,
    height: 150,
  },
]);
</script>

<template>
  <div class="canvas-container">
    <svg width="1200" height="1000" class="shapes-canvas">
      <component
        v-for="shape in shapes"
        :is="components[shape.type]"
        :shape="shape"
        :key="`${shape.type}-${shape.x}-${shape.y}`"
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
</style>
