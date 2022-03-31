<template>
  <login-dialog v-model:show="showLoginDialog"></login-dialog>
  <div class="search-container">
    <div class="space"></div>
    <div>
      <input
        v-model.lazy.trim="_search"
        type="text"
        placeholder="Ex: blue_sky 1girl"
        class="search"
      />
      <button>Search</button>
    </div>
    <div class="space"></div>
    <div class="account">
      <span v-if="!login" class="login" @click="showLoginDialog = true"
        >Login</span
      >
      <div v-else>
        <span @click="showMyFavorites">My Favorites</span>
        <span @click="logout" style="margin-left: 1rem">Logout</span>
      </div>
    </div>
  </div>
</template>

<script>
import LoginDialog from "./LoginDialog.vue";
import { mapMutations, mapState } from "vuex";

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
  methods: {
    ...mapMutations({
      logout: "logout",
      searchFav: "search",
    }),
    showMyFavorites() {
      this.searchFav("fav:" + this.user_id);
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
    ...mapState(["login", "user_id"]),
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
  width: 50vw;
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

.account span:hover {
  color: rgb(251, 179, 7);
}
</style>
