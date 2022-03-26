<script setup>
import { ref, watch } from "vue";

import NavHeader from "./components/NavHeader.vue";
import ImageList from "./components/ImageList.vue";
import ImageListItem from "./components/ImageListItem.vue";
import ImageViewer from "./components/ImageViewer.vue";

import useLoadNewPageWatcher from "./hooks/useLoadNewPageWatcher";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

const pid = ref(0);
const search = ref("");
const posts = ref([]);

useLoadNewPageWatcher(pid, search, posts);

useInfiniteScroll(
  () => {
    pid.value++;
  },
  300,
  25
);

const currentPost = ref({});
const showImageViewer = ref(false);
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

  <nav-header v-model:search="search"></nav-header>
  <image-list>
    <image-list-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @click="
        showImageViewer = true;
        currentPost = post;
      "
    ></image-list-item>
  </image-list>
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
