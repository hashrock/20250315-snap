<script setup lang="ts">
import type { Circle } from "../types";

defineProps<{
  shape: Circle;
}>();
</script>

<template>
  <circle
    cx="0"
    cy="0"
    :r="shape.r"
    fill="#42b883"
    stroke="#333"
    stroke-width="2"
  />
</template>
