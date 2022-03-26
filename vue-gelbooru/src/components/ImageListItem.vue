<template>
  <div class="thumb">
    <img
      :class="{ video: isVideo(post.file_url) }"
      :src="post.preview_url"
      :alt="post.tags"
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
}

img.video {
  outline: 2px solid blue;
}

.thumb > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
</style>
