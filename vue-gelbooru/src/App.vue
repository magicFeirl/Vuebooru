<script setup>
import ImageViewer from "./components/ImageViewer.vue";
import DialogBox from "./components/DialogBox.vue";
</script>

<template>
  <image-viewer></image-viewer>
  <router-view></router-view>
</template>

<style>
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
