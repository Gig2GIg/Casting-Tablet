<template>
  <nav class="flex justify-center items-center h-12 text-white">
    <div
      v-if="hideMenuInfo"
      class="cursor-pointer flex content-around w-1/2 items-center relative cmb-10"
      @click="backToSetting"
    >
      <img src="/images/icons/left_arrow_white.png" class="absolute left-0 pl-1" />
      <h1 class="absolute left-0 text-white text-lg back-mrg-l">Settings</h1>
    </div>
    <div v-else class="cursor-pointer flex content-around w-1/2 items-center relative cmb-10"></div>

    <div class="text-center">{{hideMenuInfo ? 'Subsciptions' : 'Settings'}}</div>

    <div class="flex items-center border-l border-white text-white ml-auto cursor-pointer">
      <span
        class="mx-4"
      >{{ user.details?user.details.first_name + ' ' + user.details.last_name:"" }}</span>
      <img
        :src="user.image ? (user.image.thumbnail ? user.image.thumbnail : user.image.url) : ''"
        class="w-12 img-h48 object-cover"
        alt="Avatar"
      />
    </div>
  </nav>
</template>
<script>
import { mapActions, mapState } from "vuex";
import TokenService from "../services/core/TokenService";
import store from "@/store";
import { eventBus } from "../main";
export default {
  data() {
    return {
      isLoading: true,
      userId: "",
      hideMenuInfo: false
    };
  },
  computed: {
    ...mapState("profile", ["user"])
  },
  async created() {
    eventBus.$on("settingNavViewChange", value => {
      console.log("created -> value", value);
      this.hideMenuInfo = value;
    });
    let isLogin = store.getters["auth/isAuthenticated"];
    if (isLogin) {
      this.fetch();
    }
  },
  async mounted() {
    this.userId = TokenService.getUserId();
  },
  methods: {
    ...mapActions("profile", ["fetch"]),
    backToSetting() {
      this.hideMenuInfo = false;
      eventBus.$emit("settingNavViewChange", this.hideMenuInfo);
    }
  }
};
</script>
<style scoped>
nav {
  background-image: linear-gradient(#4d2545, #782541);
}
.img-h48 {
  height: 48px;
}
.back-mrg-l {
  padding-left: 30px !important;
}
</style>
