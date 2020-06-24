<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <p class="text-2xl" v-if="selectedPlan">Payment Details</p>
    <PlanDetails
      v-if="!selectedPlan"
      :from="'subsribe_plan'"
      @select_plan="handleSelectPlan"
      @child_loder="handleChildLoader"
    />
    <form v-else class="w-full max-w-xs mt-16" @submit.prevent="handleSubscription()">
      <base-input
        key="name_on_card-input"
        v-model="form.name_on_card"
        v-validate="'required|max:255'"
        name="name_on_card"
        placeholder="Name on Card"
        :message="errors.first('name_on_card')"
        data-vv-as="name on card"
      />
      <base-input
        key="card_number-input"
        v-model="form.card_number"
        v-validate="'required'"
        name="card_number"
        placeholder="Card Number"
        :type="'stripe_element'"
        :stripe_cardformat="'formatCardNumber'"
        :maxlength='23'
        :message="errors.first('card_number')"
        data-vv-as="card number"
      />
      <base-input
        key="card_expiry-input"
        v-model="form.card_expiry"
        v-validate="'required'"
        name="card_expiry"
        class="month-picker"
        placeholder="Card Expiry"
        type="month"        
        :message="errors.first('card_expiry')"
        data-vv-as="card expiry"
      />
      <base-input
        key="card_cvc-input"
        v-model="form.card_cvc"
        v-validate="'required'"
        name="card_cvc"
        placeholder="CVC"
        :type="'stripe_element'"
        :stripe_cardformat="'formatCardCVC'"
        :maxlength='3'
        :message="errors.first('card_cvc')"
        data-vv-as="cvc"
      />

      <base-button class="mt-16" type="submit" expanded>Subscribe Plan</base-button>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import AuthService from "@/services/AuthService";
import states from "@/utils/states";
import DEFINE from "../utils/const.js";
import { mapActions } from "vuex";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);

import axios from "axios";
import moment from "moment";
import TokenService from "../services/core/TokenService";
import PlanDetails from "../components/shared/PlanDetails.vue";
import payment from "@/utils/jquery.payment.js";

export default {
  components: {
    Loading,
    PlanDetails
  },
  data() {
    return {
      form: {},
      step: 1,
      isLoading: false,
      fullPage: true,
      preview: null,
      states,
      imgSrc: null,
      updatedImageFile: null,
      updatedImageBlob: null,
      cropImg: "",
      data: null,
      minHeight: Number(200),
      minWidth: Number(200),
      profileFileName: null,
      profileNameObject: {},
      profileThumbnail: {},
      selectedPlan: null,
      minmonthdate: moment(),
      isSignUpDone: false
    };
  },
  methods: {
    async handleSubscription() {
      this.$toasted.clear();
      try {
        if (this.isLoading || !(await this.$validator.validateAll())) {
          return;
        }

        if(!payment.validateCardNumber(this.form.card_number)){
          this.$toasted.error("Please enter valid card number!");
          return;
        }  
        if(!payment.validateCardCVC(this.form.card_cvc)){
          this.$toasted.error("Please enter valid CVC!");
          return;
        }

        this.isLoading = true;
        let data = JSON.parse(JSON.stringify(this.form));

        // start : create subscription plan
        const Request = {
          name_on_card: data.name_on_card,
          exp_year: moment(data.card_expiry).format("YYYY"),
          exp_month: moment(data.card_expiry).format("MM"),
          number: data.card_number.replace(/\s/g, ""),
          cvc: data.card_cvc,
          user_id: TokenService.getUserId(),
          stripe_plan_id: this.selectedPlan.stripe_plan,
          stripe_plan_name: this.selectedPlan.name,
          plan_id: this.selectedPlan.id
        };

        await axios.post(`/t/users/subscribe`, Request);
        // end : create subscription plan
        
        this.$toasted.show("Subscription created successfully");
        this.$router.push({ name: "my.settings" });

      } catch (e) {
        let errorMsg;
        if (e.response && e.response.data) {
          errorMsg = this.$options.filters.getErrorMsg(e.response.data.errors);
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
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    handleSelectPlan(selectedPlan) {
      console.log("handleSelectPlan -> selectedPlan", selectedPlan);
      if (selectedPlan) {
        this.selectedPlan = selectedPlan;
        console.log("handleSelectPlan -> this.step", this.step);
      } else {
        this.selectedPlan = null;
      }
    },
    handleChildLoader(value) {
      this.isLoading = value;
    }
  }
};
</script>
<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}
.header h2 {
  margin: 0;
}
.header a {
  text-decoration: none;
  color: black;
}
.content {
  display: flex;
  justify-content: space-between;
}
.cropper-area {
  width: 614px;
}
.actions {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #782541;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
textarea {
  width: 100%;
  height: 100px;
}
.preview-area {
  width: 307px;
}
.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
  color: #782541;
}
.preview-area p:last-of-type {
  margin-top: 1rem;
}
.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}
.cropped-image img {
  max-width: 100%;
}
.v--modal-box.v--modal {
  overflow: auto !important;
}
.cropper-area > textarea {
  display: none;
}
.credit-card-inputs.complete {
  border: 2px solid green;
}
.month-picker .month-year-display{
  background-color: #ffffff;
}
.month-picker .month-year-display .picker .flexbox div{color: #ffffff;}
.vue-monthly-picker .picker .flexbox div {
    color: #000000;
    font-weight: 600;
}
.vue-monthly-picker .date-popover{
  border-radius: 15px !important;
}
.vue-monthly-picker .picker .monthItem .item.active:hover {
    background-color: transparent !important;
    background-image: linear-gradient(#4D2545, #782541) !important;
    color: #ffffff !important;
}
.vue-monthly-picker .picker .monthItem .item.deactive{
  color: #999 !important;
}
.vue-monthly-picker .picker .monthItem .item.active.selected {
    background-color: transparent !important;
    background-image: linear-gradient(#4D2545, #782541) !important;
    color: #ffffff !important;
}
.month-picker-wrapper .display-text.display-text-left{color: #4D2545 !importanta;}
</style>