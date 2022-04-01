<template>
  <div class="thumb" :class="{ video: isVideo(post.file_url) }">
    <img
      src="/src/assets/image/loading.gif"
      :data-src="post.preview_url"
      :alt="`post. ${post.id}`"
      v-lazy
    />
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
    },
  },
  methods: {
    isVideo(url) {
      return url !== "" && (url.endsWith("webm") || url.endsWith("mp4"));
    },
  },
};
</script>

<style scoped>
.thumb {
  height: 200px;
  width: 200px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease;
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); */
}

.thumb:hover {
  transform: translateY(-5px);
}

.thumb.video {
  outline: 2px solid blue;
}

.thumb > img {
  object-fit: contain;
  width: 100%;
  display: block;
  height: 100%;
}
</style>
