<script setup lang="ts">
import { Shape } from "../types";

defineProps<{
  shape: Circle;
}>();
</script>

<template>
  <circle
    :cx="shape.x"
    :cy="shape.y"
    :r="shape.r"
    fill="#42b883"
    stroke="#333"
    stroke-width="2"
  />
</template>
