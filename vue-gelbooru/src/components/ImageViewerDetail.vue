<template>
  <div
    class="open-detail"
    @click.stop="closeDetail = false"
    v-show="closeDetail"
    title="open detail"
  >
    <i class="iconfont icon-toggle-right"></i>
  </div>
  <div class="detail" :class="{ close: closeDetail }">
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
        >Source: <a :href="image.source"> {{ image.source }}</a></span
      >
      <span>Score: {{ image.score }}</span>
      <span>Rating: {{ image.rating }}</span>
    </div>
    <div class="options">
      <h2 class="title">Options</h2>
      <span><a target="_blank" :href="image.file_url">Original Image</a></span>
      <span @click="addPostToFavorite">
        <a href="javascript:(0);">{{
          favorited ? "Unfavorite" : "Add to favorite"
        }}</a>
      </span>
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
    <!-- <div class="toggle"></div> -->
  </div>
</template>

<script>
import { favorite, unfavorite } from "../api";

export default {
  emits: ["close", "toggle"],
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
    gelbooruPostURL() {
      return `https://gelbooru.com/index.php?page=post&s=view&id=${this.image.id}`;
    },
    gelbooruUserURL() {
      return `https://gelbooru.com/index.php?page=account&s=profile&id=${this.image.creator_id}`;
    },
    tags() {
      return this.image.tags;
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
  methods: {
    jumpToTag(search) {
      search = decodeURIComponent(search);
      this.$router.push({ path: "/", query: { search, pid: 0 } });
      this.$store.commit("search", search);
      this.$store.commit("imageViewer/closeImageViewer");
    },
    async addPostToFavorite() {
      const func_map = {
        true: unfavorite,
        false: favorite,
      };

      const { message, code } = await func_map[this.favorited](this.image.id);

      if (code === 200) {
        this.favorited = !this.favorited;
      }
    },
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  display: flex;
  flex: 2 0 0;
  flex-flow: column;
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

.open-detail {
  position: absolute;
  left: 0;
  top: 0;
  padding: 0.5rem 0.3rem;
  border-radius: 0 5px 5px 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-flow: column wrap;
  color: #ccc;
  cursor: pointer;
  z-index: 1010;
}
.open-detail .iconfont {
  cursor: pointer;
  font-size: 1.2rem;
}
.open-detail:hover {
  background-color: rgba(0, 0, 0, 0.8);
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

.detail .statistics,
.detail .options {
  display: flex;
  width: 100%;
  flex-flow: column wrap;
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
  flex-flow: column wrap;
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
    display: none;
    flex: 0;
  }

  .open-detail {
    display: none;
  }
}
</style>
