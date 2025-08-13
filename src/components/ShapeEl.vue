<script setup lang="ts">
import { computed } from "vue";
import CircleEl from "./CircleEl.vue";
import RectEl from "./RectEl.vue";
import { calculateSnapPointX, calculateSnapPointY } from "./utils";
import type { Shape, Point2d } from "../types";

const props = defineProps<{
  shape: Shape;
  editingPoint: Point2d | null;
  selectedShape: Shape | null;
  snapPointsX: number[];
  snapPointsY: number[];
}>();

const emit = defineEmits<{
  (e: "handlePointerMove", shape: Shape, event: PointerEvent): void;
  (e: "handlePointerDown", shape: Shape, event: PointerEvent): void;
  (e: "handlePointerUp", shape: Shape, event: PointerEvent, newPoint: Point2d): void;
}>();

const handlePointerMove = (shape: Shape, event: PointerEvent) => {
  emit("handlePointerMove", shape, event);
};

const handlePointerDown = (shape: Shape, event: PointerEvent) => {
  emit("handlePointerDown", shape, event);
};

const handlePointerUp = (
  shape: Shape,
  event: PointerEvent,
  newPoint: Point2d
) => {
  emit("handlePointerUp", shape, event, newPoint);
};

const x = computed(() => {
  return props.editingPoint && props.selectedShape === props.shape
    ? props.editingPoint.x
    : props.shape.x;
});

const y = computed(() => {
  return props.editingPoint && props.selectedShape === props.shape
    ? props.editingPoint.y
    : props.shape.y;
});

const mySnapPointsX = computed(() => {
  return calculateSnapPointX({
    ...props.shape,
    x: props.editingPoint?.x || props.shape.x,
    y: props.editingPoint?.y || props.shape.y,
  });
});

// Y座標のスナップポイントも同様に計算
const mySnapPointsY = computed(() => {
  // X座標と同じ関数を使用していますが、必要に応じてcalculateSnapPointYを使用してください
  return calculateSnapPointY({
    ...props.shape,
    x: props.editingPoint?.x || props.shape.x,
    y: props.editingPoint?.y || props.shape.y,
  });
});

const offsetListX = computed(() => {
  const all = props.snapPointsX.map((snapPoint) => {
    return mySnapPointsX.value.map((mySnapPoint) => {
      return mySnapPoint - snapPoint;
    });
  });

  return all.flat().map((i) => i.toFixed(2));
});

// Y座標のオフセットリストを計算
const offsetListY = computed(() => {
  // snapPointsYが空配列の場合も安全に処理
  if (!props.snapPointsY.length) return [];

  const all = props.snapPointsY.map((snapPoint) => {
    return mySnapPointsY.value.map((mySnapPoint) => {
      return mySnapPoint - snapPoint;
    });
  });

  return all.flat().map((i) => i.toFixed(2));
});

// X座標の最小オフセットを計算する関数
const calculateSmallestOffset = (offsetList: string[]) => {
  if (offsetList.length === 0) return 0;

  // 絶対値が最小の値を探し、元の符号を保持する
  let minAbs = Infinity;
  let minOffset = 0;

  offsetList.forEach((offsetStr) => {
    const offset = parseFloat(offsetStr);
    const absOffset = Math.abs(offset);

    if (absOffset < minAbs) {
      minAbs = absOffset;
      minOffset = offset;
    }
  });

  return minOffset;
};

const smallestOffsetX = computed(() => {
  return calculateSmallestOffset(offsetListX.value);
});

const smallestOffsetY = computed(() => {
  return calculateSmallestOffset(offsetListY.value);
});

const SNAP_THRESHOLD = 10;

const isSnappedX = computed(() => {
  if (props.selectedShape !== props.shape) {
    return false;
  }
  return Math.abs(smallestOffsetX.value) < SNAP_THRESHOLD;
});

const isSnappedY = computed(() => {
  if (props.selectedShape !== props.shape) {
    return false;
  }
  return Math.abs(smallestOffsetY.value) < SNAP_THRESHOLD;
});

const snappedX = computed(() => {
  return isSnappedX.value ? x.value - smallestOffsetX.value : x.value;
});

const snappedY = computed(() => {
  return isSnappedY.value ? y.value - smallestOffsetY.value : y.value;
});
</script>

<template>
  <g
    :transform="`translate(${snappedX}, ${snappedY})`"
    @pointermove="handlePointerMove(shape, $event)"
    @pointerdown="handlePointerDown(shape, $event)"
    @pointerup="handlePointerUp(shape, $event, { x: snappedX, y: snappedY })"
  >
    <CircleEl v-if="shape.type === 'CircleEl'" :shape="shape as any" />
    <RectEl v-else-if="shape.type === 'RectEl'" :shape="shape as any" />

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
