<template>
  <div class="flex flex-col min-h-full cover">
    <subscribe-nav-bar />
    <div
      class="cursor-pointer flex content-around w-100 items-center relative cmb-10 back-div ml-5"
      @click="back"
    >
      <img src="/images/icons/left_arrow_white.png" class="absolute left-0 pl-5" />
      <h1 class="absolute text-white text-md back-mrg-l ml-5 left-0 pl-5">Back</h1>
    </div>
    <transition name="page" mode="out-in" @after-leave="$root.$emit('triggerScroll')">
      <router-view class="flex flex-col flex-1 justify-center items-center text-white py-16" />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.push({ name: "my.settings" });
    }
  }
};
</script>

<style scoped>
.cover {
  background-image: url("/images/background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.back-div {
  margin-top: -26px !important;
}
</style>
