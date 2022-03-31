<template>
  <div class="message-box">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.message-box {
  position: fixed;
  background: #fffbbf;
  z-index: 10000;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 30vw;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
</style>
