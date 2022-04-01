<template>
  <transition name="fade">
    <div v-if="show" class="message-box">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.show = true;

    setTimeout(() => {
      this.show = false;
    }, this.duration);
  },
};
</script>

<style scoped>
.message-box {
  position: fixed;
  background: rgb(255, 251, 191, 0.8);
  z-index: 10000;
  top: 5vh;
  left: 50%;
  transform: translateX(-50%);
  min-width: 350px;
  width: 40vw;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-weight: 600;
}
</style>
