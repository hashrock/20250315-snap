<script setup lang="ts">
import { Shape } from "../types";

defineProps<{
  shape: Rect;
}>();
</script>
<template>
  <rect
    :x="shape.x"
    :y="shape.y"
    :width="shape.width"
    :height="shape.height"
    fill="#646cff"
    stroke="#333"
    stroke-width="2"
  />
</template>
