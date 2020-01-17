<template>
  <div class="flex flex-col min-h-full h-full">  
    
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

<style >
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
