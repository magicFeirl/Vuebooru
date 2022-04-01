<template>
  <dialog-box :show="show" @close="closeDialog">
    <div class="login-form">
      <h3>Login</h3>
      <span class="register">
        Don't have an account?
        <a href="https://gelbooru.com/index.php?page=account&s=reg">
          Register!
        </a>
      </span>
      <input
        v-model.trim.lazy="username"
        autocomplete
        id="username"
        type="text"
        placeholder="username"
      />
      <input
        autocomplete
        v-model.trim.lazy="password"
        id="password"
        type="password"
        placeholder="password"
      />
      <button @click="login">Login</button>
    </div>
  </dialog-box>
</template>

<script>
import DialogBox from "./DialogBox.vue";
import { login } from "../api";
import { mapMutations } from "vuex";

export default {
  props: {
    show: false,
  },
  emits: ["update:show"],
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations({
      user_login: "login",
    }),
    async login() {
      if (!this.username.length || !this.password.length) {
        this.$message("Invalid username or password", "", 1500);
        return;
      }

      const data = await login(this.username, this.password);

      if (data.code === 200) {
        this.user_login(data.user_id);
      }

      this.$message(data.message, "", 3000);

      this.closeDialog();
    },
    closeDialog() {
      this.$emit("update:show");
    },
  },
  components: {
    DialogBox,
  },
};
</script>

<style scoped>
.login-form {
  min-height: 200px;
  min-width: 350px;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.login-form h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #0773fb;
}

.login-form input {
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  width: 85%;
  font-size: 1.25rem;
}

.login-form button {
  margin: 0 1rem;
  background-color: #0773fb;
  color: white;
  cursor: pointer;
  border: none;
  width: 6rem;
  outline: none;
  border-radius: 5px;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.login-form button:hover {
  background: rgb(251, 179, 7);
}

.login-form .register {
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  color: #006ffa;
}

.register a {
  color: #006ffa;
}

.register a:hover {
  color: rgb(251, 179, 7);
}
</style>
