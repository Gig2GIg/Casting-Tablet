<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <div
      class="tags w-full mx-auto invite-block-hieght text-purple"
      v-if="!isLoading && !notSuscription"
    >
      <div class="py-4 px-4 mr-2 flex flex-wrap justify-center">
        <div class="w-full mr-2">
          <div class="flex justify-center mb-4 items-center px-3 w-full">
            <div class="w-1/2 text-purple px-2 text-lg text-bold-500">Subscription</div>
            <div class="w-1/2 text-purple px-2 text-md"></div>
          </div>
          <div class="flex justify-right mb-4 items-right px-3 w-full" v-if="subscriptionDetails">
            <div class="w-2/3 text-purple px-2 text-sm">Current Tier: {{subscriptionDetails.name}}</div>
            <div
              class="w-2/8 text-purple px-2 text-sm capitalize justify-center content-center"
            >Payment: {{subscriptionDetails.card_brand}} Card {{subscriptionDetails.card_last_four}}</div>
            <div class="w-2/8 text-purple px-2 text-sm capitalize">
              <a
                class="flex items-center justify-center content-center cursor-pointer font-bold"
                @click="changePaymentDetails()"
              >Change</a>
            </div>
          </div>
        </div>
        <div class="w-full mr-2">
          <div class="flex justify-center mb-4 items-center px-3 w-full">
            <div class="w-1/2 text-purple px-2 text-lg text-bold-500"></div>
            <div class="w-1/2 text-purple px-2 text-md"></div>
          </div>
          <div class="flex justify-right mb-4 items-right px-3 w-full" v-if="subscriptionDetails">
            <div class="w-2/3 text-purple px-2 text-sm"></div>
            <div
              class="w-2/7 text-purple px-2 text-sm capitalize justify-center content-center"
            ></div>
            <div class="w-2/8 text-purple px-5 pr-0 ml-15 text-sm capitalize margin-left-cancel">
              <a
                class="flex items-center justify-center content-center cursor-pointer font-bold"
                @click="cancelSubscription()"
              >Cancel Subscription</a>
            </div>
          </div>
        </div>
        <div class="w-full mr-2">
          <div class="flex mb-4 items-center px-3 w-full">
            <div class="w-2/5 text-purple px-2 text-lg text-bold-500">Users</div>
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
        <div class="w-full mr-2 border-grey-1 border-raduis-8">
          <div
            class="flex justify-center mb-4 items-center px-3 w-full bg-grey-500 border-tl-8 ptb-10"
          >
            <div class="w-2/5 ml-4 text-purple px-2 text-md">Name</div>
            <div class="w-2/5 ml-4 text-purple px-2 text-md">Joined</div>
            <div class="w-2/10 ml-4 text-purple px-2"></div>
          </div>
          <div class="w-full mr-2" v-for="(user, index) of inviteUserList" :key="index">
            <div class="flex justify-center mb-4 items-center px-3 w-full">
              <div class="w-2/5 ml-4 text-purple px-2 text-sm user-img">
                <img
                  v-lazy="user.image && user.image.thumbnail ? user.image.thumbnail : (user.image && user.image.url ? user.image.url : '')"
                  class="h-10 w-10 rounded object-cover"
                  alt="Logo"
                />
                <span>
                  {{user.details.first_name +' '+ (user.details.last_name ? user.details.last_name : '')}}
                  <br />
                  {{user.email}}
                </span>
              </div>
              <div
                class="w-2/5 ml-4 text-purple px-2 text-sm joined-date"
              >{{user.details.created_at | formatDate}}</div>
              <div class="w-2/10 ml-4 text-purple px-2 active-btn">
                <div
                  v-if="user.is_active == 1"
                  class="cursor-pointer m-3 content-center rounded-full red-light w-full h-8 flex items-center button-detail accept-decline-btn"
                  @click="deactivateUser(user)"
                >
                  <p class="text-white text-sm text-center content-center flex-1">Deactivate</p>
                </div>
                <div
                  v-else
                  class="cursor-pointer m-3 content-center rounded-full red-light w-full h-8 flex items-center button-detail accept-decline-btn"
                  @click="activateUser(user)"
                >
                  <p class="text-white text-sm text-center content-center flex-1">Activate</p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-full mr-2 text-center"
            v-if="inviteUserList.length == 0"
          >No invited user found!</div>
        </div>
      </div>
    </div>
    <div class="tags w-full mx-auto invite-block-hieght text-purple mr-2" v-else-if="!isLoading">
      <div class="py-4 px-4 mr-2 flex flex-wrap justify-center">
        <div class="w-full">
          <div class="flex justify-center mb-4 items-center px-3 w-full">
            <div class="w-1/2 text-purple px-2 text-lg text-bold-500"></div>
            <div class="w-1/2 text-purple px-2 text-md"></div>
          </div>
          <div
            class="flex mb-4 items-center justify-center px-3 w-full"
          >You don't have any subscription</div>
        </div>
      </div>

      <div class="py-4 px-4 mr-2 flex flex-wrap justify-center">
        <div class="w-2/10 text-purple text-md margin-minus-subscribe-div">
          <div
            class="cursor-pointer content-center capitalize rounded-full red-light w-subscire-btn h-8 flex items-center button-detail accept-decline-btn"
            @click="subscribePlan()"
          >
            <p class="text-white text-sm text-center capitalize content-center flex-1">SUBSCRIBE</p>
          </div>
        </div>
        <!-- <div class="w-full text-purple text-sm capitalize mt-5">
              <a
                class="social-a flex items-center justify-center content-center cursor-pointer"
                @click="subscribePlan()"
              >Subscribe</a>
        </div>-->
      </div>
    </div>
    <modal
      class="flex flex-col w-full items-center mt-4"
      :width="540"
      height="175"
      name="modal_confirm_status_change"
    >
      <div class="py-8 px-3">
        <p class="text-lg text-purple font-bold text-center">{{statusConfirmMsg}}</p>
        <div class="w-full flex flex-wrap justify-center overflow-hidden mt-3">
          <div class="w-1/4">
            <base-button type="button" expanded @click="onCancelStatusChange()">No</base-button>
          </div>
          <div class="w-1/4 ml-3">
            <base-button type="button" expanded @click="onStatusChangeConfirm()">Yes</base-button>
          </div>
        </div>
      </div>
    </modal>
    <modal
      class="flex flex-col w-full items-center mt-4"
      :width="540"
      height="175"
      name="modal_confirm_cancel_subscribe"
    >
      <div class="py-8 px-3">
        <p class="text-lg text-purple font-bold text-center">Are you sure, you want to cancel the subscription?</p>
        <div class="w-full flex flex-wrap justify-center overflow-hidden mt-3">
          <div class="w-1/4">
            <base-button type="button" expanded @click="subscribeConfirmCancel()">No</base-button>
          </div>
          <div class="w-1/4 ml-3">
            <base-button type="button" expanded @click="subscribeConfirmDone()">Yes</base-button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Vue from "vue";

import axios from "axios";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);

import TokenService from "../services/core/TokenService";
import DEFINE from "../utils/const";
import store from "@/store";
import { eventBus } from "../main";

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
      subscriptionDetails: null,
      statusConfirmMsg: "",
      statusConfirmUser: null,
      newStatus: null,
      notSuscription: false
    };
  },
  async mounted() {
    await this.getInviteUser();
    const currentUser = store.getters["profile/currentUser"];
    if (currentUser.is_invited) {
      // invited user can not access right of invite user or invite user list
      this.hideMenuInfo = false;
      eventBus.$emit("settingNavViewChange", this.hideMenuInfo);
    }
  },
  methods: {
    /**
     * Get list of invited user
     */
    async getInviteUser() {
      this.isLoading = true;
      try {
        const {
          data: { data }
        } = await axios.get(`/users/subscriptionDetails`);
        if (data) {
          this.subscriptionDetails = data.subscription
            ? data.subscription
            : null;
          this.inviteUserList = data.invitedUsers ? data.invitedUsers : [];
        } else {
          this.subscriptionDetails = null;
          this.inviteUserList = [];
        }

        this.isLoading = false;
        this.notSuscription = false;
      } catch (e) {
        this.notSuscription = true;
        this.subscriptionDetails = null;
        this.inviteUserList = [];
        // this.$toasted.error(
        //   "You don't have any subscription plan, please subscribe plan."
        // );
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * On click deactivate user action button, it's used for set selected user details with new status and confirm message
     */
    deactivateUser(user) {
      this.statusConfirmUser = user;
      this.newStatus = 0;
      this.statusConfirmMsg = "Do you want deactivate this user?";
      this.$modal.show("modal_confirm_status_change");
    },
    /**
     * On click activate user action button, it's used for set selected user details with new status and confirm message
     */
    activateUser(user) {
      this.statusConfirmUser = user;
      this.newStatus = 1;
      this.statusConfirmMsg = "Do you want activate this user?";
      this.$modal.show("modal_confirm_status_change");
    },
    /**
     * On cancel reset selected user object and hide modal
     */
    onCancelStatusChange() {
      this.statusConfirmUser = null;
      this.newStatus = null;
      this.statusConfirmMsg = null;
      this.$modal.hide("modal_confirm_status_change");
    },
    /**
     * On user confirmation api call for new status change and handle response of api
     */
    async onStatusChangeConfirm() {
      this.$toasted.clear();
      if (this.statusConfirmUser == null || this.newStatus == null) {
        this.$modal.hide("modal_confirm_status_change");
        this.$toasted.error(DEFINE.common_error_message);
        return false;
      }
      this.isLoading = true;
      try {
        this.$modal.hide("modal_confirm_status_change");
        const requestParam = {
          id: this.statusConfirmUser.id,
          status: this.newStatus
        };
        const {
          data: { data }
        } = await axios.post(`/users/changeStatus`, requestParam);
        this.isLoading = false;
        this.getInviteUser();
        const successMsg =
          this.newStatus == 0
            ? "User has been deactivated successfully."
            : "User has been activated successfully.";
        this.$toasted.success(successMsg);
      } catch (e) {
        this.$toasted.error(DEFINE.common_error_message);
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * On invite button click route navigate to invite user screen
     */
    inviteUsers() {
      this.$router.push({
        name: "invite_user",
        params: { type: btoa("settings") }
      });
    },
    /**
     * On change payment details open payment  details page for change current card details for next subscription used
     */
    changePaymentDetails() {
      this.$toasted.clear();
      console.log("plan_change -> plan_change");
      this.$router.push({ name: "plan_change" });
    },
    /**
     * On click cancel subscription confirmation modal open
     */
    cancelSubscription() {
      if(this.subscriptionDetails && this.subscriptionDetails.grace_period == 1) {
        this.$toasted.error("You have already request for cancel subscription.");
      } else {
        this.$modal.show("modal_confirm_cancel_subscribe");
      }
      
    },
    subscribeConfirmCancel(){
      this.$modal.hide("modal_confirm_cancel_subscribe");
    },
    async subscribeConfirmDone() {
      // this.$modal.show("modal_confirm_cancel_subscribe");
      this.isLoading = true;
      try {
        this.$modal.hide("modal_confirm_cancel_subscribe");       
        const {
          data: { data }
        } = await axios.get(`/t/users/cancelSubscription`);
        this.isLoading = false;
        this.$toasted.success("Your subscription has been cancelled successfully.");
        this.getInviteUser();        
      } catch (e) {
        this.$toasted.error(DEFINE.common_error_message);
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * When user don't have any tier plan then give to option for subscription new tier (plan)
     */
    subscribePlan() {
      this.$toasted.clear();
      this.$router.push({ name: "subscribe_plan" });
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
.bg-grey-500 {
  background-color: #f0f0f0;
}
.border-grey-1 {
  border: 1px solid #f0f0f0;
}
.border-raduis-8 {
  border-radius: 8px !important;
}
.border-tl-8 {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.ptb-10 {
  padding: 10px 0;
}
.user-img {
  display: flex;
  align-items: center;
}
.active-btn {
  width: 104px !important;
}
.user-img span {
  margin-left: 10px;
}
.user-img img {
  border-radius: 50% !important;
}
.text-bold-500 {
  font-weight: 500;
}
.w-subscire-btn {
  width: 160% !important;
}
.margin-minus-subscribe-div{
      margin-left: -54px !important;
}
.margin-left-cancel {
   margin-left: 64px !important;
}
</style>
