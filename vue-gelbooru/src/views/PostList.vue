<template>
  <nav-header v-model:search="search"></nav-header>
  <image-list>
    <image-list-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @click="emitShowImageViewerMessage(post)"
    ></image-list-item>
  </image-list>
</template>

<script setup>
import { ref } from "vue";
import { SHOW_IMAGE_VIEWER } from "../constants";

import ImageList from "../components/ImageList.vue";
import ImageListItem from "../components/ImageListItem.vue";
import NavHeader from "../components/NavHeader.vue";

import useLoadNewPageWatcher from "../hooks/useLoadNewPageWatcher";
import emitter from "../hooks/useMitt";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const pid = ref(0);
const search = ref("");
const posts = ref([]);

const emitShowImageViewerMessage = (post) => {
  emitter.emit(SHOW_IMAGE_VIEWER, post);
};

useLoadNewPageWatcher(pid, search, posts);

useInfiniteScroll(
  () => {
    pid.value++;
  },
  300,
  25
);
</script>

<style scoped></style>
