<script setup>
import { ref } from "vue";

import NavHeader from "./components/NavHeader.vue";

import ImageList from "./components/ImageList.vue";
import ImageListItem from "./components/ImageListItem.vue";

import ImageViewer from "./components/ImageViewer.vue";

import { get_posts } from "./api";

const pid = ref(0);
const search = ref("");

const posts = ref({});
const currentPost = ref({});

const showImageViewer = ref(false);

get_posts(pid.value, search.value).then((data) => {
  posts.value = data;
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

  <nav-header v-model:search="search"></nav-header>
  <image-list>
    <image-list-item
      v-for="post in posts.post"
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
