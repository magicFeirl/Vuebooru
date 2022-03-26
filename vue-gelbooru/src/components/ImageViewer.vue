<template>
  <div @click="closeViewer" id="img-viewer" ref="imgViewer">
    <video
      v-if="isVideo(src)"
      @click.stop
      class="fit-video"
      :src="src"
      controls
      loop
      muted
      autoplay
    ></video>
    <img
      v-else
      ref="viewerImage"
      @click.stop="zoomImage($event)"
      :src="src"
      alt=""
    />
  </div>
</template>

<script>
export default {
  emits: ["close"],
  props: {
    img: {
      type: Object,
    },
  },
  computed: {
    src() {
      return this.img.file_url || this.img.sample_url;
    },
  },
  methods: {
    zoomImage(event) {
      document.body.style.overflow = "hidden";
      this.$refs.imgViewer.style.overflow = "auto";
      this.$refs.viewerImage.classList.toggle("original-size");
      setTimeout(() => {
        this.$refs.imgViewer.scrollTo(0, event.clientY);
      }, 0);
    },
    closeViewer() {
      this.$emit("close");
      document.body.style.overflow = "auto";
      this.$refs.viewerImage.classList.remove("original-size");
    },
    isVideo(url) {
      console.log(url);
      return url !== "" && (url.endsWith("webm") || url.endsWith("mp4"));
    },
  },
};
</script>

<style scoped>
.fit-video {
  max-width: 100%;
  max-height: 90%;
}

#img-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 1010;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* scroll-behavior: smooth; */
}

#img-viewer img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: zoom-in;
}

img.original-size {
  /* max-width: unset !important; */
  max-height: unset !important;
  object-fit: unset !important;
  cursor: zoom-out !important;
}
</style>
