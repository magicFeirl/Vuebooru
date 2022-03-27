<template>
  <div id="img-viewer" v-if="showImageViewer">
    <div class="detail">
      <div class="score">
        <h2 class="title">
          Score: <span>{{ image.score }}</span>
        </h2>
      </div>
      <div class="tags">
        <h2 class="title">Tags</h2>
        <span
          class="tag"
          @click="jumpToTag(tag)"
          v-for="tag in tags"
          :key="tag"
        >
          {{ tag }}
        </span>
      </div>
      <div class="owner">
        <h2 class="title">
          Owner: <span>{{ image.owner }}</span>
        </h2>
      </div>
      <div class="created_at">
        <h2 class="title">Created At</h2>
        <span>{{ image.created_at }}</span>
      </div>
    </div>
    <div @click="closeViewer" class="image-container" ref="imgViewer">
      <video
        v-if="isAnimated(src)"
        @click.stop
        class="fit-video"
        :src="src"
        controls
        loop
        muted
        autoplay
        ref="viewerImage"
      ></video>
      <img
        v-else
        ref="viewerImage"
        @click.stop="zoomImage($event)"
        :src="src"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    src() {
      if (
        this.isAnimated(this.image.file_url) ||
        this.image.file_url.endsWith("gif")
      ) {
        return this.image.file_url;
      } else {
        return this.image.sample_url || this.image.file_url;
      }
    },
    tags() {
      return this.image.tags.split(" ");
    },
    ...mapState("imageViewer", ["showImageViewer", "image"]),
  },
  methods: {
    jumpToTag(search) {
      this.closeViewer();
      this.$router.push({ path: "/", query: { search, pid: 0 } });
      this.$store.commit("search", search);
    },
    zoomImage(event) {
      document.body.style.overflowY = "hidden";
      this.$refs.imgViewer.style.overflow = "auto";
      this.$refs.viewerImage.classList.toggle("original-size");
      setTimeout(() => {
        this.$refs.imgViewer.scrollTo(0, event.clientY);
      }, 0);
    },
    closeViewer() {
      this.$store.commit("imageViewer/closeImageViewer");
      document.body.style.overflowY = "auto";
      this.$refs.viewerImage.classList.remove("original-size");
    },
    isAnimated(url) {
      return url !== "" && (url.endsWith("webm") || url.endsWith("mp4"));
    },
  },
};
</script>

<style scoped>
#img-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 1010;
  display: flex;
  /* scroll-behavior: smooth; */
}

#img-viewer .image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex: 8 0 0;
}

#img-viewer .detail {
  display: flex;
  flex: 2 0 0;
  flex-flow: column;
  background-color: rgba(34, 34, 34, 0.95);
  padding: 0.5rem 0.8rem;
  overflow-y: auto;
}

.detail .title {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

.detail .title,
.detail span {
  color: #ccc;
}

.tags {
  display: flex;
  width: 100%;
  flex-flow: column wrap;
  align-items: stretch;
}

.tag {
  cursor: pointer;
}

.tag:hover {
  color: #888;
}

#img-viewer img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: zoom-in;
}
.fit-video {
  max-width: 100%;
  max-height: 90%;
}
img.original-size {
  /* max-width: unset !important; */
  max-height: unset !important;
  object-fit: unset !important;
  cursor: zoom-out !important;
}
</style>
