<template>
  <div class="flex w-full h-screen">    
    <sidebar-base v-if="isLogin" />
    <div class="flex flex-col"  v-bind:class="!isLogin ? 'w-full' : 'w-4/5'" >
      <div class="flex-1 ">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  data() {
    return {
      isLogin : false
    }
  },
  created(){
    this.isLogin = store.getters['auth/isAuthenticated'];
  }

  
}
</script>