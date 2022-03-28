<template>
  <teleport to="#dialog-container">
    <transition name="fade">
      <div class="dialog" @click="closeDialog" v-if="show">
        <div @click.stop class="dialog-content-box">
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    modal: false,
    show: false,
  },
  emits: ["close"],
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  cursor: pointer;
}

.dialog-content-box {
  margin-top: -3rem;
  background-color: rgba(232, 232, 232, 0.7);
  padding: 1rem;
  border-radius: 5px;
  cursor: unset;
}
</style>
