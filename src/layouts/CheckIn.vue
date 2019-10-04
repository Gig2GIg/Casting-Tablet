<template>
  <div class="flex flex-col min-h-full cover h-full">
    <div
    class="flex justify-center items-center h-12 cursor-pointer text-gray-200 font-light tracking-wider h-10 bg-purple">
    Check In
  </div>

    <transition
      name="page"
      mode="out-in"
      @after-leave="$root.$emit('triggerScroll')"
    >
      <router-view class="flex flex-row flex-1 h-full" />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNavBar: true,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.showNavBar = to.name !== 'login';
      },
    },
  },
};
</script>

<style scoped>
.cover {
  background-image: url('/images/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
nav {
  background-image: linear-gradient(#4D2545, #782541);
}
</style>
