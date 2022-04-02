<template>
  <div class="side-option" v-if="closeDetail || minWidthLess768">
    <div
      class="open-detail"
      @click.stop="closeDetail = false"
      v-show="closeDetail || minWidthLess768"
      title="open detail"
    >
      <i class="iconfont icon-toggle-right"></i>
    </div>
    <div
      @click="addPostToFavorite(favorited, image.id)"
      :class="['favorite-post', { favorited }]"
      title="favorite current post"
    >
      <i
        :class="['iconfont', favorited ? 'icon-heart-fill' : 'icon-heart']"
      ></i>
    </div>
    <div @click="closeViewer" class="close-viewer">
      <i class="iconfont icon-close"></i>
    </div>
    <div class="download-image">
      <i class="iconfont icon-down"></i>
    </div>
  </div>
  <div class="detail" :class="{ close: closeDetail, open: !closeDetail }">
    <div class="statistics">
      <h2 class="title">
        Statistics
        <span class="folder" title="close detail" @click="closeDetail = true">
          <i class="iconfont icon-toggle-left"></i>
        </span>
      </h2>
      <span>
        Id: <a target="_blank" :href="gelbooruPostURL">{{ image.id }}</a>
      </span>
      <span>Posted: {{ image.created_at }}</span>
      <span>
        Uploader:
        <a target="_blank" :href="gelbooruUserURL">{{ image.owner }}</a>
      </span>
      <span>Size: {{ image.width }} x {{ image.height }}</span>
      <span
        >Source: <a :href="source"> {{ source }}</a></span
      >
      <span>Score: {{ score }}</span>
      <span>Rating: {{ image.rating }}</span>
    </div>
    <div class="options">
      <h2 class="title">Options</h2>
      <span><a target="_blank" :href="image.file_url">Original Image</a></span>
      <span @click="addPostToFavorite(favorited, image.id)">
        <a href="javascript:(0);">{{
          favorited ? "Unfavorite" : "Add to favorite"
        }}</a>
      </span>
      <span @click="closeViewer">
        <a href="javascript:(0);">Close Viewer</a>
      </span>
    </div>
    <div class="keymap">
      <h2 class="title">Key map</h2>
      <span>A: Prev Image</span>
      <span>S: (Un)Favorite Image</span>
      <span>D: Next Image</span>
      <span>W: Close Image</span>
    </div>
    <div class="tags">
      <h2 class="title">Tags</h2>
      <template v-for="(tag_names, tag_type) in tags">
        <template v-if="tag_names.length > 0">
          <h4 class="title">{{ tag_type }}</h4>
          <router-link
            class="tag"
            @click="jumpToTag(tag)"
            :to="{ path: '/', query: { search: tag } }"
            v-for="tag in tag_names"
            :key="tag"
          >
            {{ decodeURIComponent(tag) }}
          </router-link>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  emits: ["close", "toggle", "closeViewer"],
  props: {
    image: {
      type: Object,
      default: () => {},
    },
    closeDetail: false,
  },
  watch: {
    closeDetail() {
      this.$emit("toggle", this.closeDetail);
    },
  },
  computed: {
    source() {
      return decodeURIComponent(this.image.source);
    },
    gelbooruPostURL() {
      return `https://gelbooru.com/index.php?page=post&s=view&id=${this.image.id}`;
    },
    gelbooruUserURL() {
      return `https://gelbooru.com/index.php?page=account&s=profile&id=${this.image.creator_id}`;
    },
    tags() {
      return this.image.tags;
    },
    score() {
      return this.image.score;
    },
    favorited: {
      get() {
        return this.image.favorited;
      },
      set(value) {
        return (this.image.favorited = value);
      },
    },
  },
  data() {
    return {
      minWidthLess768: false,
    };
  },
  methods: {
    closeViewer() {
      this.$emit("closeViewer");
    },
    jumpToTag(search) {
      search = decodeURIComponent(search);
      this.$router.push({ path: "/", query: { search, pid: 0 } });
      this.$store.commit("search", search);
      this.$store.commit("imageViewer/closeImageViewer");
    },
    ...mapActions("imageViewer", {
      addPostToFavoriteMutation: "addPostToFavorite",
    }),
    async addPostToFavorite(favorited, image_id) {
      if (await this.addPostToFavoriteMutation({ favorited, image_id })) {
        this.favorited = !this.favorited;
        if (this.favorited) {
          this.image.score++;
        } else {
          this.image.score--;
        }
      }
    },
  },
  mounted() {
    this.minWidthLess768 = window.innerWidth <= 768;
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  display: flex;
  flex: 2 0 0;
  flex-direction: column;
  background-color: rgba(34, 34, 34, 0.95);
  padding: 0.5rem 0.8rem;
  overflow-y: auto;
  transition: flex 0.2s ease;
  z-index: 1015;
}
.detail .title {
  font-size: 1.35rem;
  margin: 0;
  margin-top: 1rem;
}

h4.title {
  font-size: 1.15rem !important;
  margin: 0.5rem 0 0.2rem 0 !important;
}

.detail.close {
  flex: 0;
  padding: 0;
}

.side-option {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: #ccc;
  z-index: 1010;
  row-gap: 5px;
  cursor: pointer;
}

.side-option > div {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 0.3rem;
  border-radius: 0 5px 5px 0;
  text-align: center;
}

.side-option > div:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.side-option .iconfont {
  cursor: pointer;
  font-size: 1.2rem;
}

.side-option .favorite-post {
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  transition: color 0.2s ease;
}

.favorite-post.favorited {
  color: rgb(189, 15, 15);
}

.statistics .title {
  display: flex;
  width: 100%;
}

.title .folder {
  margin-left: auto;
  cursor: pointer;
}

.title .folder:hover {
  color: #337ab7;
}

.detail .keymap,
.detail .statistics,
.detail .options {
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  word-break: break-all;
  row-gap: 5px;
}

a {
  color: #337ab7;
}

.detail .title,
.detail span {
  color: #ccc;
}

.tags {
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  word-break: break-all;
}

.tag {
  cursor: pointer;
  color: #337ab7 !important;
  line-height: 1.5;
}

a:hover,
.tag:hover {
  color: #78befc !important;
}

@media screen and (max-width: 768px) {
  .detail {
    width: 0;
    flex: 0;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    transition: width 0.2s ease;
  }

  .side-option {
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 5px;
  }

  .side-option > div:not(:first-child) {
    border-radius: 5px !important;
  }

  .side-option .favorite-post {
    padding: 0.5rem 0.3rem !important;
  }

  .detail.open {
    width: 60%;
  }
}
</style>
