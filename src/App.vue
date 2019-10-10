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

.bg-purple-gradient {
  background-image: linear-gradient(#4D2545, #782541);
}

.bg-purple-gradient:hover {
  background-image: linear-gradient(#331d2f, #5e1d33);
}

body, html {
  height: 100%;
}
</style>
