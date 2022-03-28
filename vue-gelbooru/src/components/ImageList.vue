<template>
  <div class="image-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  inheritAttributes: false,
};
</script>

<style scoped>
.image-list {
  width: 100%;
  display: grid;
  gap: 20px;
  padding: 20px;
  /* flex-wrap: wrap; */
  height: calc(100vh - 56px);
  overflow: auto;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: center;
}
</style>
