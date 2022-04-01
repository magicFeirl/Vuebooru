<template>
  <teleport to="#image-viewer-container">
    <transition name="fade">
      <div id="img-viewer" v-if="showImageViewer">
        <image-viewer-detail
          @close="closeViewer"
          @toggle="toggleDetail"
          :image="image"
          :closeDetail="closeDetail"
        ></image-viewer-detail>
        <div
          @click="closeViewer"
          class="image-container"
          :class="{ 'original-size': showOriginalSize }"
          ref="imgViewer"
        >
          <div v-if="!showOriginalSize" class="arrow-wrapper" @click.stop>
            <div class="arrow left" @click="showPrevImage">
              <i class="iconfont icon-leftarrow"></i>
            </div>
            <div class="arrow right" @click="showNextImage">
              <i class="iconfont icon-Rightarrow"></i>
            </div>
          </div>
          <video
            v-if="isAnimated(src)"
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
            :class="{ 'original-size': showOriginalSize }"
            @click.stop="zoomImage($event)"
            :src="src"
            alt=""
          />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { mapActions, mapState } from "vuex";

import tinykeys from "tinykeys";

import ImageViewerDetail from "./ImageViewerDetail.vue";

export default {
  emits: ["showPrevImage", "showNextImage"],
  components: {
    ImageViewerDetail,
  },
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
    minWidthLess768() {
      return window.innerWidth <= 768;
    },
    ...mapState("imageViewer", ["showImageViewer", "image"]),
  },
  data() {
    return {
      closeDetail: false,
      showOriginalSize: false,
    };
  },
  mounted() {
    this.closeDetail = this.minWidthLess768;

    tinykeys(window, {
      s: async () => {
        if (this.showImageViewer) {
          if (this.image.favorited === true || this.image.favorited === false) {
            if (
              await this.addPostToFavorite({
                favorited: this.image.favorited,
                image_id: this.image.id,
              })
            ) {
              this.image.favorited = !this.image.favorited;
            }
          }
        }
      },
      a: () => {
        if (this.showImageViewer) {
          this.showPrevImage();
        }
      },
      d: () => {
        if (this.showImageViewer) {
          this.showNextImage();
        }
      },
      w: () => {
        if (this.showImageViewer) {
          this.closeViewer();
        }
      },
    });
  },
  methods: {
    ...mapActions("imageViewer", ["addPostToFavorite"]),
    showPrevImage() {
      this.$emit("showPrevImage");
    },
    showNextImage() {
      this.$emit("showNextImage");
    },
    zoomImage(event) {
      this.showOriginalSize = !this.showOriginalSize;
      setTimeout(() => {
        this.$refs.imgViewer.scrollTo(0, event.clientY);
      }, 0);
      // 放大图片时关闭 detail 栏
      this.closeDetail = this.showOriginalSize;
    },
    toggleDetail(detailState) {
      // 最大宽度 <= 768 时始终不显示详情栏（除非用户点击）
      if (this.minWidthLess768) {
        this.closeDetail = true;
      } else {
        this.closeDetail = detailState;
      }
    },
    closeViewer() {
      this.$store.commit("imageViewer/closeImageViewer");
      // document.body.style.overflowY = "auto";
      this.showOriginalSize = false;
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
  position: relative;
}

.image-container.original-size {
  overflow: auto;
}

.arrow-wrapper {
  z-index: 1001;
}

.arrow {
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #ccc;
  top: 50%;
  position: absolute;
  transform: translateY(-100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.arrow:hover {
  transform: translateY(-100%) scale(1.15);
}
.arrow i.iconfont {
  font-size: 20px;
  margin-top: 1px;
  color: white;
}

.arrow.left {
  left: 50px;
}

.arrow.right {
  right: 50px;
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

@media screen and (max-width: 768px) {
  .arrow-wrapper {
    display: none;
  }
}
</style>
