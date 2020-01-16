<template>
  <div class="flex flex-col min-h-full h-full">
    <!-- <div class="flex justify-between pr-4 items-center h-12 text-gray-200 font-light tracking-wider h-10 bg-purple">
      <span></span>
      <h3>Check In</h3>
      <a class="flex items-center cursor-pointer bg-purple mr-0 ml-5" @click="toggleCheckinExit()">
          <figure class="flex justify-center"><img src="/images/icons/settings_white.png" alt="Icon" class="h-4">
          </figure>
      </a>
    </div>    -->
    
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

import DEFINE from '../utils/const.js';

export default {

  data() {
    return {      
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
  methods:{
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
nav {
  background-image: linear-gradient(#4D2545, #782541);
}
/* .exit-checkin{
  width: 155px;
  height : 150px;
  right: 0;
} */
.exit-checkin {
    width: 155px;
    position: absolute;
    right: 10px;
    top: 49px;
}
.br-12{
  border-radius: 12px;
}
.bg-white-hover:hover {
    background-color: #ececec !important;
}
</style>
