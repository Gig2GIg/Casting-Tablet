<template>
  <component
    :is="layout"
    class="layout"
    :class="layout"
  />
</template>

<script>
export default {
  computed: {
    defaultLayout() {
      return 'dashboard';
    },
    layout() {
      return `${this.$route.meta.layout || this.defaultLayout}-layout`;
    },
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

body, html {
  height: 100%;
}
</style>
