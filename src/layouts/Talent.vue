<template>
  <div class="flex w-full h-screen">
    <sidebar-base />
    <div class="flex flex-col w-4/5">
      <talent-nav-bar @onSearch="sendDataToChild"/>
      <div class="flex-1 overflow-y-auto">
        <router-view :search.sync="search"/>
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
    };
  },
  computed:{},
  mounted(){},
  methods: {
    sendDataToChild(data){
      this.search = data;
      console.log(this.search);
    },
  },
};
</script>

