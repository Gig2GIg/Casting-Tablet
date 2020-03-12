<template>
  <div class="flex w-full h-screen">
    <sidebar-base />
    <div class="flex flex-col w-4/5">
      <audition-slots-nav-bar />
      <div class="flex-1 overflow-y-auto">
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
      search: "",
      reload: 0,
      isNewGroup: false,
      isCreateGroup: false
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

