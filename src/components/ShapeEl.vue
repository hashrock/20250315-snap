<script setup lang="ts">
import { ref } from "vue";
import CircleEl from "./CircleEl.vue";
import RectEl from "./RectEl.vue";

const props = defineProps<{
  shape: Shape;
  editingPoint: Point2d | null;
  selectedShape: Shape | null;
}>();
const components = {
  CircleEl,
  RectEl,
};

const emit = defineEmits<{
  (e: "handlePointerMove", shape: Shape, event: PointerEvent): void;
  (e: "handlePointerDown", shape: Shape, event: PointerEvent): void;
  (e: "handlePointerUp", shape: Shape, event: PointerEvent): void;
}>();

const handlePointerMove = (shape: Shape, event: PointerEvent) => {
  emit("handlePointerMove", shape, event);
};

const handlePointerDown = (shape: Shape, event: PointerEvent) => {
  emit("handlePointerDown", shape, event);
};

const handlePointerUp = (shape: Shape, event: PointerEvent) => {
  emit("handlePointerUp", shape, event);
};
</script>

<template>
  <g
    :transform="`translate(${
      editingPoint && selectedShape === shape ? editingPoint.x : shape.x
    }, ${editingPoint && selectedShape === shape ? editingPoint.y : shape.y})`"
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
</template>
