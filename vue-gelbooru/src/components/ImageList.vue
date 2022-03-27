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
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
}
</style>
