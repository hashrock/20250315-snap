<script setup lang="ts">
import { ref, computed } from "vue";
import CircleEl from "./CircleEl.vue";
import RectEl from "./RectEl.vue";
import { calculateSnapPointX } from "./utils";
const props = defineProps<{
  shape: Shape;
  editingPoint: Point2d | null;
  selectedShape: Shape | null;
  snapPointsX: number[];
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

const x = computed(() => {
  return props.editingPoint && props.selectedShape === props.shape
    ? props.editingPoint.x
    : props.shape.x;
});

const mySnapPointsX = computed(() => {
  return calculateSnapPointX({
    ...props.shape,
    x: props.editingPoint?.x || props.shape.x,
    y: props.editingPoint?.y || props.shape.y,
  });
});

const distanceList = computed(() => {
  const all = props.snapPointsX.map((snapPoint) => {
    return mySnapPointsX.value.map((mySnapPoint) => {
      return mySnapPoint - snapPoint;
    });
  });

  return all.flat().map((i) => i.toFixed(2));
});

const smallestDistance = computed(() => {
  return distanceList.value.reduce((acc, curr) => {
    return Math.min(acc, Math.abs(curr));
  }, Infinity);
});

const SNAP_THRESHOLD = 10;

const snappedX = computed(() => {
  return x.value - smallestDistance.value < SNAP_THRESHOLD
    ? x.value - smallestDistance.value
    : x.value;
});

const y = computed(() => {
  return props.editingPoint && props.selectedShape === props.shape
    ? props.editingPoint.y
    : props.shape.y;
});
</script>

<template>
  <g
    :transform="`translate(${snappedX}, ${y})`"
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
    <text
      :x="shape.boundingBox.x1"
      :y="shape.boundingBox.y1"
      font-size="12"
      fill="black"
    >
      {{ distanceList }}
    </text>
  </g>
</template>
