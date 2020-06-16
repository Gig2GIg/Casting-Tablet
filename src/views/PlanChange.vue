<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <p class="text-2xl">Payment Details</p>
    <form class="w-full max-w-xs mt-16" @submit.prevent="handleChangePlan()">
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
        :stripe_cardformat="'formatCardExpiry'"
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
        :message="errors.first('card_cvc')"
        data-vv-as="cvc"
      />

      <base-button class="mt-16" type="submit" expanded>Change</base-button>
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
import payment from "@/utils/jquery.payment.js";

export default {
  components: {
    Loading
  },
  data() {
    return {
      form: {},
      step: 1,
      isLoading: false,
      fullPage: true
    };
  },
  methods: {
    async handleChangePlan() {     
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

        // start : change payment details
        const Request = {
          name_on_card: data.name_on_card,
          exp_year: moment(data.card_expiry).format("YYYY"),
          exp_month: moment(data.card_expiry).format("MM"),
          number: data.card_number.replace(/\s/g, ""),
          cvc: data.card_cvc
        };

        await axios.post(`/users/changeDefaultPaymentMethod`, Request);
        // end : change payment details

        this.$toasted.show(
          "Your payment detail has been changed successfully."
        );
        this.$router.push({
          name: "my.settings",
          query: { tab: "subscription" }
        });
      } catch (e) {
        console.log("handleChangePlan -> e", e)
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
.month-picker .month-year-display {
  background-color: #ffffff;
}
.month-picker .month-year-display .picker .flexbox div {
  color: #ffffff;
}
.vue-monthly-picker .picker .flexbox div {
  color: #000000;
  font-weight: 600;
}
.vue-monthly-picker .date-popover {
  border-radius: 15px !important;
}
.vue-monthly-picker .picker .monthItem .item.active:hover {
  background-color: transparent !important;
  background-image: linear-gradient(#4d2545, #782541) !important;
  color: #ffffff !important;
}
.vue-monthly-picker .picker .monthItem .item.deactive {
  color: #999 !important;
}
</style>