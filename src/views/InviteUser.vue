<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <div
      class="tags w-9/12 shadow-lg mx-auto px-3 py-3 bg-white invite-block-hieght text-purple rounded"
    >
      <form @submit.prevent="handleInviteUser()">
        <div class="py-4 px-4 mr-2">
          <div class="flex w-full justify-center text-purple text-xl uppercase">
            <p>INVITE YOUR CASTING TEAM</p>
          </div>
        </div>

        <div class="py-4 px-4 mr-2 flex flex-wrap justify-center">
          <div class="w-full mr-2">
            <div class="flex justify-center mb-2 items-center px-3 w-full">
              <div class="w-1/2 ml-4 text-purple px-2 text-md">Email Address</div>
              <div class="w-1/2 text-purple px-2 text-md">Name(Optional)</div>
            </div>
          </div>
          <div class="w-full mr-2" v-for="(user, index) of form" :key="index">
            <div class="flex justify-center mb-4 items-start px-3 w-full">
              <div class="w-3/5 ml-4 text-purple px-2">
                <base-input
                  v-model="user.email"
                  v-validate="'required|email'"
                  :custom-classes="['border border-b border-gray-300 text-sm']"
                  :name="'email_'+index"
                  placeholder="Eg. john@mail.com"
                  :message="errors.first('email_'+index)"
                  data-vv-as="email"
                />
              </div>
              <div class="w-3/5 ml-4 text-purple px-2">
                <base-input
                  v-model="user.name"
                  :custom-classes="['border border-b border-gray-300 text-sm']"
                  :name="'name_'+index"
                  placeholder="Eg. John"
                  :message="errors.first('name_'+index)"
                  data-vv-as="name"
                />
              </div>
              <div class="w-2/10 ml-4 text-purple px-2 mt-auto mb-auto">
                <img
                  v-if="form.length > 1"
                  @click="removeAt(index)"
                  src="/images/icons/remove.png"
                  class="h-6 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div class="w-full mr-2">
            <div class="flex justify-left mb-2 px-3 w-full cursor-pointer" @click="addNew()">
              <div class="w-1/2 ml-4 text-purple px-2 text-sm add-new-btn">
                <img src="/images/icons/new.png" class="h-6" />
                <span class="ml-2">Add New OR Add Multiple at once</span>
              </div>
            </div>
          </div>
        </div>
        <div class="py-4 px-4 mr-2 flex flex-wrap justify-center">
          <div class="flex justify-center mb-4 items-center px-3 w-full">
            <div class="w-2/5 ml-4 text-purple px-2"></div>
            <div class="w-2/5 ml-4 text-purple px-2">
              <a
                v-if="commingFrom == 'signup'"
                class="flex items-center justify-center content-center mt-16 cursor-pointer"
                @click="skipInviteUser()"
              >I'll complete this later</a>
              <a
                v-else
                class="flex items-center justify-center content-center mt-16 cursor-pointer"
                @click="backToSetting()"
              >Back</a>
            </div>
            <div class="w-2/5 ml-4 text-purple px-2 text-md">
              <base-button class="mt-16 text-md" type="submit" expanded>Send Invitations</base-button>
            </div>
          </div>
        </div>
      </form>
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
      commingFrom: "",
      form: [
        {
          email: "",
          name: ""
        }
      ]
    };
  },
  created() {
    const enc_type = this.$route.params.type;
    this.commingFrom = atob(enc_type);
  },
  methods: {
    async handleInviteUser() {
      // console.log("handleInviteUser -> handleInviteUser");
      this.$toasted.clear();
      if (await this.$validator.validateAll()) {
        // console.log("handleInviteUser -> this.form", this.form);
        let valueArr = this.form.map(function(item) {
          return item.email;
        });

        let isDuplicate = valueArr.some(function(item, idx) {
          return valueArr.indexOf(item) != idx;
        });
        if (isDuplicate) {
          this.$toasted.error("Please enter unique email ids!");
          return false;
        }

        this.isLoading = true;
        try {
          const requestParam = {
            user_id: TokenService.getUserId(),
            data: this.form
          };
          const {
            data: { data }
          } = await axios.post(`/t/users/inviteCaster`, requestParam);
          this.isLoading = false;
          this.$toasted.show("Invite casting successfully.");
          this.redirect();
        } catch (e) {
          let errorMsg;
          if (e.response && e.response.data) {
            errorMsg = this.$options.filters.getErrorMsg(
              e.response.data.errors
            );
          }
          this.$toasted.error(
            errorMsg
              ? errorMsg
              : e.response.data && e.response.data.message
              ? e.response.data.message
              : DEFINE.common_error_message
          );
        } finally {
          this.isLoading = false;
        }
      }
    },
    addNew() {
      this.form.push({
        email: "",
        name: ""
      });
    },
    removeAt(index) {
      this.form.splice(index, 1);
    },
    skipInviteUser() {
      this.redirect();
    },
    redirect() {
      if (this.commingFrom == "signup") {
        this.$router.push({ name: "tour" });
      } else {
        this.$router.push({
          name: "my.settings",
          query: { tab: "subscription" }
        });
      }
    },
    backToSetting() {
      this.$router.push({
        name: "my.settings",
        query: { tab: "subscription" }
      });
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
}
.add-new-btn {
  display: flex;
  align-items: center;
}
.add-new-btn img {
  width: 18px;
  height: 18px !important;
  padding: 2px;
  border: 1px solid;
  border-radius: 50%;
}
.add-new-btn span {
  font-size: 12px;
  font-weight: 500;
}
</style>



