<template>
  <dialog-box :show="show" @close="closeDialog">
    <form class="login-form">
      <h3>Login</h3>
      <span class="register">
        Don't have an account?<a href="#"> Register!</a>
      </span>
      <input autocomplete id="username" type="text" placeholder="username" />
      <input autocomplete id="password" type="password" placeholder="password" />
      <button>Login</button>
    </form>
  </dialog-box>
</template>

<script>
import DialogBox from "./DialogBox.vue";

export default {
  props: {
    show: false,
  },
  emits: ["update:show"],
  methods: {
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
}

.register a {
  color: #333;
}

.register a:hover {
  color: #000;
}
</style>
