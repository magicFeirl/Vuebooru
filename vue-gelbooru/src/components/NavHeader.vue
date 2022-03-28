<template>
  <login-dialog v-model:show="showLoginDialog"></login-dialog>
  <div class="search-container">
    <div class="space"></div>
    <input
      v-model.lazy.trim="_search"
      type="text"
      placeholder="Ex: blue_sky 1girl"
      class="search"
    />
    <button>Search</button>
    <div class="space"></div>
    <div class="account">
      <span class="login" @click="showLoginDialog = true">Login</span>
    </div>
  </div>
</template>

<script>
import LoginDialog from "./LoginDialog.vue";

export default {
  emits: ["update:search"],
  components: {
    LoginDialog,
  },
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
  data() {
    return {
      showLoginDialog: false,
    };
  },
};
</script>

<style scoped>
.space {
  flex: 1;
}

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
  width: 70vw;
  flex: 2;
  border: 1px solid #ccc;
}

.search-container button,
input.search {
  padding: 8px;
  font-size: 16px;
}

.search-container button {
  margin: 0 0.5rem;
  background-color: #0773fb;
  color: white;
  cursor: pointer;
  border: none;
  width: 6rem;
  outline: none;
  border-radius: 5px;
}

.search-container button:hover {
  background: rgb(251, 179, 7);
}

.account {
  margin-right: 2rem;
  color: #0773fb;
  font-weight: 600;
  cursor: pointer;
}

.account:hover {
  color: rgb(251, 179, 7);
}
</style>
