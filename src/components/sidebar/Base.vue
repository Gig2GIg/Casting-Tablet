<template>
  <section class="flex flex-col items-center h-full w-1/5 text-purple">
  <!-- <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading> -->
    <img
      src="/images/logo-color.png"
      class="h-12"
      alt="Logo"
    >

    <div class="flex-1 w-full mt-6">
      <sidebar-item
        :to="{ name: 'auditions' }"
        text="Auditions"
        icon="auditions"
        :counter="10"
      />
      <sidebar-item
        :to="{ name: 'auditions.create' }"
        text="Create New"
        icon="new"
      />
      <sidebar-item
        :to="{ name: 'talents' }"
        text="Talent Database"
        icon="person"
      />
      <sidebar-item
        :to="{ name: 'news-and-updates' }"
        text="News & Updates"
        icon="news"
      />
      <sidebar-item
        :to="{ name: 'notifications' }"
        text="Notifications"
        icon="notifications"
      />
      <sidebar-item
        :to="{ name: 'my.settings' }"
        text="Settings"
        icon="settings"
      />
    </div>

    <sidebar-item
      text="Sign Out"
      icon="sign_out"
      @click.native="handleSignOut"
    />
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import axios from "axios";

export default {
  data() {
    return {
      isLoading: false,
      fullPage: true,
    };
  },
  methods: {
    ...mapActions('auth', ['logout']),

    async handleSignOut() {
      this.isLoading = true;
      await this.updateDeviceToken("");
      this.logout();
      this.isLoading = false;
      this.$router.replace('/');
    },
    async updateDeviceToken(device_token) {
      let userAgentId = window.navigator.userAgent.replace(/\D+/g, '');      
      await axios.put(`/t/notification-send-pushkey?pushkey=${device_token}&device_id=${userAgentId}`);
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },

  },
};
</script>
<style scoped>
::-webkit-scrollbar {
    width: 0.5em;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}

::-webkit-scrollbar-thumb {
  background-image: linear-gradient(#4D2545, #782541);
  outline: 1px solid slategrey;
  border-radius: 12px;
}
</style>
