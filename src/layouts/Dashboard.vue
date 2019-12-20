<template>
  <div class="flex w-full h-screen">
    <sidebar-base />
    <div class="flex flex-col w-4/5">
      <nav-bar />
      <div class="flex-1 ">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  export default {
    data() {
      return {
        search: '',
        reload: 0,
      };
    },
    computed:{},
    mounted(){},
    methods: {
      sendDataToChild(data){
        this.search = data;
      },
      reloadData(data){
        this.reload = data;
      },
    },
  };
</script>
