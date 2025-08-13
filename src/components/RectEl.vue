<script setup lang="ts">
import type { Rect } from "../types";

defineProps<{
  shape: Rect;
}>();
</script>
<template>
  <rect
    x="0"
    y="0"
    :width="shape.width"
    :height="shape.height"
    fill="#646cff"
    stroke="#333"
    stroke-width="2"
  />
</template>
