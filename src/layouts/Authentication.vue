<template>
  <div class="flex flex-col min-h-full cover">
    <auth-nav-bar v-if="showNavBar" :isRouteNavigate="false" />
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
import { eventBus } from "../main";
export default {
  data() {
    return {
      showNavBar: true,
      signupStep: 0
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.showNavBar = to.name !== "login";
      }
    }
  },
  created() {
    eventBus.$on("signupNext", value => {
      this.signupStep = value;
      // console.log("created -> signupNext this.signupStep ", this.signupStep);
    });
  },
  methods: {
    back() {
      this.signupStep -= 1;
      // console.log("back -> this.signupStep", this.signupStep);
      if (this.signupStep < 0) {
        this.$router.push({ name: "login" });
      } else {
        eventBus.$emit("signupBack", this.signupStep);
      }
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
