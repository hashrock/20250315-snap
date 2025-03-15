<script setup lang="ts">
import ShapesCanvas from "./components/ShapesCanvas.vue";
</script>

<template>
  <div class="app-container">
    <ShapesCanvas />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
}
</style>
