<template>
  <router-link
    tag="nav"
    :to="isRouteNavigate ? '/' : ''"
    :class="[{ 'cursor-pointer': isRouteNavigate }]"
    class="flex justify-center items-center h-12"
  >
    <img src="/images/logo.png" class="h-full" alt="Logo" />
  </router-link>
</template>
<script>
export default {
  props: {
    isRouteNavigate: Boolean,
    default: false
  }
};
</script>
<style scoped>
nav {
  background-image: linear-gradient(#4d2545, #782541);
}
</style>
