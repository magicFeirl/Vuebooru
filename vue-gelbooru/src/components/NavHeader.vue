<template>
  <div class="search-container">
    <input
      v-model.lazy.trim="_search"
      type="text"
      placeholder="Ex: blue_sky 1girl"
      class="search"
    />
    <button>Search</button>
  </div>
</template>

<script>
export default {
  emits: ["update:search"],
  props: {
    search: {
      type: String,
      default: "",
    },
  },
  computed: {
    _search: {
      get() {
        return this.search;
      },
      set(newValue) {
        this.$emit("update:search", newValue);
      },
    },
  },
};
</script>

<style scoped>
.search-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  padding: 10px;
  background-color: white;
  top: 0;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

input.search {
  max-width: 70vw;
  flex: 1;
  border: 1px solid #ccc;
}

.search-container button,
input.search {
  padding: 8px;
  font-size: 16px;
}

.search-container button {
  margin-left: 0.5rem;
  background-color: #0773fb;
  color: white;
  cursor: pointer;
  border: none;
  width: 7rem;
  outline: none;
  border-radius: 5px;
}

.search-container button:hover {
  background: rgb(251, 179, 7);
}
</style>
