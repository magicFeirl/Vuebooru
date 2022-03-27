<template>
  <nav-header v-model:search="search"></nav-header>
  <image-list v-if="newPostLoaded">
    <image-list-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @click="showImageViewer(post)"
    ></image-list-item>
    <div class="loading next-page-loading" v-if="loading">
      <h3>Loading page {{ pid + 1 }}</h3>
    </div>
  </image-list>
  <div class="loading" v-else>
    <h3>Now loading page {{ pid + 1 }}...</h3>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

import ImageList from "../components/ImageList.vue";
import ImageListItem from "../components/ImageListItem.vue";
import NavHeader from "../components/NavHeader.vue";

import useLoadNewPageWatcher from "../hooks/useLoadNewPageWatcher";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useRouteQueryAutoUpdateWatcher from "../hooks/useRouteQueryAutoUpdateWatcher";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const { query } = useRoute();
const store = useStore();

const _pid = parseInt(query.pid);
const pid = _pid ? ref(_pid) : ref(0);
const search = ref(query.search || store.state.search);
const posts = ref([]);

const showImageViewer = (image) => {
  store.commit("imageViewer/showImageViewer", image);
};

const newPostLoaded = computed(() => posts.value.length > 0);

const loading = useLoadNewPageWatcher(pid, search, posts);
useRouteQueryAutoUpdateWatcher(pid, search);

watch(
  () => store.state.search,
  () => {
    // 需要同时初始化这两个值，否则会重复请求
    search.value = store.state.search;
    pid.value = 0;
  }
);

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

<style scoped>
.loading {
  text-align: center;
  margin-top: 18%;
  color: #999;
  width: 100%;
}

.next-page-loading {
  margin-top: 1.5rem;
  font-size: 0.85rem;
}
</style>
