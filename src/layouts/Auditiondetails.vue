<template>
  <div class="flex w-full h-screen">
    <sidebar-base />
    <div class="flex flex-col w-4/5">
      <audition-details-nav-bar @onSearch="sendDataToChild" @onAdd="reloadData" />
      <div class="flex-1 overflow-y-auto">
        <router-view :search.sync="search" :reload.sync="reload" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      reload: 0,
      isNewGroup: false,
      isCreateGroup: false
    };
  },
  computed: {},
  mounted() {},
  methods: {
    sendDataToChild(data) {
      this.search = data;
    },
    reloadData(data) {
      this.reload = data;
    }
  }
};
</script>

