<template>
  <div class="detail">
    <div class="statistics">
      <h2 class="title">Statistics</h2>
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
    </div>
    <div class="tags">
      <h2 class="title">Tags</h2>
      <span class="tag" @click="jumpToTag(tag)" v-for="tag in tags" :key="tag">
        {{ tag }}
      </span>
    </div>
    <!-- <div class="toggle"></div> -->
  </div>
</template>

<script>
export default {
  emits: ["close"],
  props: {
    image: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    tags() {
      return this.image.tags.split(" ");
    },
    gelbooruPostURL() {
      return `https://gelbooru.com/index.php?page=post&s=view&id=${this.image.id}`;
    },
    gelbooruUserURL() {
      return `https://gelbooru.com/index.php?page=account&s=profile&id=${this.image.creator_id}`;
    },
  },
  methods: {
    jumpToTag(search) {
      this.$emit("close");
      this.$router.push({ path: "/", query: { search, pid: 0 } });
      this.$store.commit("search", search);
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
}
.detail .title {
  font-size: 1.35rem;
  margin: 0;
  margin-top: 1rem;
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
  align-items: stretch;
}

.tag {
  cursor: pointer;
  color: #337ab7 !important;
}

a:hover,
.tag:hover {
  color: #78befc !important;
}

.toggle {
  position: absolute;
  top: 50%;
  transform: translateY(-100%);
  right: 0;
  width: 25px;
  height: 25px;
  background-color: white;
}
</style>
