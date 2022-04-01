<template>
  <nav-header v-model:search="search"></nav-header>
  <image-viewer
    @showPrevImage="handleShowPrevImage"
    @showNextImage="handleShowNextImage"
  ></image-viewer>
  <image-list ref="imageListRef" v-if="newPostLoaded">
    <image-list-item
      v-for="(post, idx) in posts"
      :key="post.id"
      :post="post"
      @click="showImageViewer(idx)"
    ></image-list-item>
  </image-list>
  <div class="loading" v-else>
    <h3 v-if="!loading">
      Nobody here but us chickens!
      <br />
      <i
        >Check your blacklist. We now automatically omit terms from your search
        when you have any tag there.</i
      >
    </h3>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

import ImageList from "../components/ImageList.vue";
import ImageListItem from "../components/ImageListItem.vue";
import ImageViewer from "../components/ImageViewer.vue";
import NavHeader from "../components/NavHeader.vue";

import useLoadNewPageWatcher from "../hooks/useLoadNewPageWatcher";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import useRouteQueryAutoUpdateWatcher from "../hooks/useRouteQueryAutoUpdateWatcher";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { message } from "../hooks/useMessageTip";

const route = useRoute();
const { query } = route;
const store = useStore();

const _pid = parseInt(query.pid);
const pid = _pid ? ref(_pid) : ref(0);
const search = ref(query.search || store.state.search);
const posts = ref([]);

const showImageViewer = (index) => {
  store.dispatch("imageViewer/setImage", { index, image: posts.value[index] });
};

const newPostLoaded = computed(() => posts.value?.length > 0);

// 加载新页面 watcher
const [loading, has_more] = useLoadNewPageWatcher(pid, search, posts);

// 路由参数自动更新 watcher
useRouteQueryAutoUpdateWatcher(pid, search);

watch(
  () => route.query.search,
  (newValue) => {
    store.commit("search", newValue);
    search.value = newValue;
  }
);

watch(pid, () => {
  message("Loading Page " + (parseInt(pid.value) + 1), "", 1000);
});

// 监听路由变化，发送请求
watch(
  () => store.state.search,
  () => {
    // 需要同时初始化这两个值，否则会重复请求
    search.value = store.state.search;
    pid.value = 0;
  }
);

// 注册无限滚动
const imageListRef = ref(null);
watch(imageListRef, () => {
  if (!imageListRef.value) {
    return;
  }
  useInfiniteScroll(
    imageListRef.value.$el,
    () => {
      if (!loading.value && has_more.value) {
        pid.value++;
      } else if (!has_more.value) {
        message("No more data", "", 3000);
      }
    },
    400,
    25
  );
});

const handleShowImage = (step) => {
  const index = store.state.imageViewer.index + step;
  store.dispatch("imageViewer/setImage", {
    index,
    image: posts.value[index],
  });
};

const handleShowPrevImage = () => {
  handleShowImage(-1);
};

const handleShowNextImage = () => {
  handleShowImage(1);
};
</script>

<style scoped>
.loading {
  text-align: center;
  margin-top: 18%;
  color: #999;
  width: 100%;
}

.loading h3 {
  text-align: center;
}

.next-page-loading {
  margin-top: 1.5rem;
  font-size: 0.85rem;
}
</style>
