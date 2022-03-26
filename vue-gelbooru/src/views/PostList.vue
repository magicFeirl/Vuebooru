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
import useRouteQueryAutoUpdateWatcher from "../hooks/useRouteQueryAutoUpdateWatcher";
import { useRoute } from "vue-router";

const { query } = useRoute();

console.log(query);

const _pid = parseInt(query.pid);
const pid = _pid ? ref(_pid) : ref(0);
const search = ref(query.search ? query.search : "");
const posts = ref([]);

const emitShowImageViewerMessage = (post) => {
  emitter.emit(SHOW_IMAGE_VIEWER, post);
};

const loading = useLoadNewPageWatcher(pid, search, posts);
useRouteQueryAutoUpdateWatcher(pid, search);

useInfiniteScroll(
  () => {
    if (!loading.value) {
      pid.value++;
    }
  },
  300,
  25
);
</script>

<style scoped></style>
