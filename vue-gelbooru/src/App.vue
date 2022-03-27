<script setup>
import ImageViewer from "./components/ImageViewer.vue";
</script>

<template>
  <teleport to="#image-viewer-container">
    <transition name="fade">
      <image-viewer></image-viewer>
    </transition>
  </teleport>

  <router-view></router-view>
</template>

<style>
#app {
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
