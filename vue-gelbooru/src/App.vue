<script setup>
import { ref } from "vue";
import emitter from "./hooks/useMitt";
import { SHOW_IMAGE_VIEWER } from "./constants";

import ImageViewer from "./components/ImageViewer.vue";

const currentPost = ref({});
const showImageViewer = ref(false);

emitter.on(SHOW_IMAGE_VIEWER, (post) => {
  currentPost.value = post;
  showImageViewer.value = true;
});
</script>

<template>
  <teleport to="#image-viewer-container">
    <transition name="fade">
      <image-viewer
        v-if="showImageViewer"
        @close="showImageViewer = false"
        :img="currentPost"
      ></image-viewer>
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
