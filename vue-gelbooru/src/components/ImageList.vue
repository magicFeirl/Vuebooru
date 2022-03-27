<template>
  <div class="image-list">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.image-list {
  width: 100%;
  display: grid;
  gap: 20px;
  padding: 20px;
  /* flex-wrap: wrap; */
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: center;
}
</style>
