<template>
  <div class="flex flex-col min-h-full cover">    
    <auth-nav-bar v-if="showNavBar" />    
    <transition
      name="page"
      mode="out-in"
      @after-leave="$root.$emit('triggerScroll')"
    >
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
      signupStep : 0
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
  created() {
    this.getSubscriptionDetails()
  },
  methods: {
    getSubscriptionDetails(){

    }
  }
};
</script>

<style scoped>
.cover {
  background-image: url('/images/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.back-div {
  margin-top: -26px !important;
}
</style>
