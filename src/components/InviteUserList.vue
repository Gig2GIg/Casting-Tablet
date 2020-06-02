<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <div class="tags w-full mx-auto invite-block-hieght text-purple">
      <div class="py-4 px-4 mr-2 flex flex-wrap justify-center">
        <div class="w-full mr-2">
          <div class="flex justify-center mb-4 items-center px-3 w-full">
            <div class="w-1/2 text-purple px-2 text-lg">Subscription</div>
            <div class="w-1/2 text-purple px-2 text-md"></div>
          </div>
          <div class="flex justify-right mb-4 items-right px-3 w-full" v-if="subscriptionDetails">
            <div class="w-2/3 text-purple px-2 text-sm">Current Tier: {{subscriptionDetails.name}}</div>
            <div
              class="w-2/8 text-purple px-2 text-sm capitalize justify-center content-center"
            >Payment: {{subscriptionDetails.card_brand}} Card {{subscriptionDetails.card_last_four}}</div>
            <div class="w-2/8 text-purple px-2 text-sm capitalize">
              <a
                class="social-a flex items-center justify-center content-center cursor-pointer"
                @click="changePlan()"
              >Change</a>
            </div>
          </div>
          <div class="flex justify-right mb-4 items-right px-3 w-full" v-else>
            <div class="w-2/3 text-purple px-2 text-sm"></div>
            <div class="w-2/8 text-purple px-2 text-sm capitalize"></div>
            <div class="w-2/8 text-purple px-2 text-sm capitalize">
              <a
                class="social-a flex items-center justify-center content-center cursor-pointer"
                @click="subscribePlan()"
              >Subscribe Plan</a>
            </div>
          </div>
        </div>
        <div class="w-full mr-2">
          <div class="flex mb-4 items-center px-3 w-full">
            <div class="w-2/5 text-purple px-2 text-lg">Users</div>
            <div class="w-2/5 text-purple px-2 text-lg"></div>
            <div class="w-2/10 text-purple px-2 text-md">
              <div
                v-if="subscriptionDetails"
                class="cursor-pointer m-3 content-center rounded-full red-light w-full h-8 flex items-center button-detail accept-decline-btn"
                @click="inviteUsers()"
              >
                <p class="text-white text-sm text-center content-center flex-1">Invite Users</p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full mr-2 border-2 border-gray-300">
          <div class="flex justify-center mb-4 items-center px-3 w-full bg-grey-500">
            <div class="w-2/5 ml-4 text-purple px-2 text-md">Name</div>
            <div class="w-2/5 ml-4 text-purple px-2 text-md">Joined</div>
            <div class="w-2/10 ml-4 text-purple px-2"></div>
          </div>
          <div class="w-full mr-2" v-for="(user, index) of inviteUserList" :key="index">
            <div class="flex justify-center mb-4 items-center px-3 w-full">
              <div class="w-2/5 ml-4 text-purple px-2 text-sm">
                <img
                  v-lazy="user.image && user.image.url ? user.image.url : ''"
                  class="h-10 w-10 rounded object-cover"
                  alt="Logo"
                />
                {{user.details.first_name +' '+ (user.details.last_name ? user.details.last_name : '')}}
                <br />
                {{user.email}}
              </div>
              <div
                class="w-2/5 ml-4 text-purple px-2 text-sm"
              >{{user.details.created_at | formatDate}}</div>
              <div class="w-2/10 ml-4 text-purple px-2">
                <div
                  v-if="user.is_active == 1"
                  class="cursor-pointer m-3 content-center rounded-full red-light w-full h-8 flex items-center button-detail accept-decline-btn"
                  @click="deactivateUser(user)"
                >
                  <p class="text-white text-sm text-center content-center flex-1">Deactivate</p>
                </div>
                <div
                  v-else
                  class="cursor-pointer content-center rounded-full red-light w-full h-8 flex items-center button-detail accept-decline-btn"
                  @click="activateUser(user)"
                >
                  <p class="text-white text-sm text-center content-center flex-1">Activate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import axios from "axios";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import TokenService from "../services/core/TokenService";
import DEFINE from "../utils/const";

Vue.use(Loading);

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      form: [
        {
          email: "",
          name: ""
        }
      ],
      inviteUserList: [],
      subscriptionDetails: null
    };
  },
  async mounted() {
    this.getInviteUser();
  },
  methods: {
    async getInviteUser() {
      this.isLoading = true;
      try {
        const {
          data: { data }
        } = await axios.get(`/users/subscriptionDetails`);
        console.log("getInviteUser -> data", data);
        if (data) {
          this.subscriptionDetails = data.subscription
            ? data.subscription
            : null;
          this.inviteUserList = data.invitedUsers ? data.invitedUsers : [];
          console.log(
            "getInviteUser -> this.subscriptionDetails",
            this.subscriptionDetails
          );
        } else {
          this.subscriptionDetails = null;
          this.inviteUserList = [];
        }

        this.isLoading = false;
      } catch (e) {
        this.subscriptionDetails = null;
        this.inviteUserList = [];
        this.$toasted.error(
          "You don't have any subscrition plan, please subscribe plan."
        );
      } finally {
        this.isLoading = false;
      }
    },
    deactivateUser(user) {},
    activateUser(user) {},
    inviteUsers() {
      this.$router.push({
        name: "invite_user",
        params: { type: btoa("settings") }
      });
    },
    changePlan() {
      this.$toasted.clear();
      console.log("changePlan -> changePlan");
    },
    subscribePlan() {      
      this.$toasted.clear();
      this.$router.push({name : 'subscribe_plan'});
    },
    onCancel() {
      console.log("User cancelled the loader.");
    }
  }
};
</script>
<style scoped>
.invite-block-hieght {
  min-height: 500px;
  min-height: 500px;
}
</style>
