<template>
  <div class="w-90 m-5">
    <carousel    
      v-if="planList && planList.length > 0"
      :per-page="3"
      :pagination-enabled="false"
      :navigation-enabled="true"
      :navigation-prev-label="'&#x279C;'"                            
      :navigation-next-label="'&#x279C;'"
      class="flex flex-wrap items-center justify-center plan-list-carousel"
    >
      <!-- <div
        v-for="plan of planList"
        :key="plan.id"
        class="col-6 w-11/8 bg-white h-full mr-5 mb-5 border-radius-6"
      > -->
      <slide
          v-for="plan of planList"
          :key="plan.id"        
          class="bg-white h-full mr-5 mb-5 border-radius-6"
        >
        <div class="border-radius-6 box">
          <div
            class="relative flex flex-col h-48 items-center justify-center bg-cus-orange border-tl-radius-6 border-tr-radius-6"
          >
            <span class="text-xl text-white" v-if="plan.is_custom == 0" >Up to {{plan.allowed_performers}} Performers</span>
            <span class="text-xl text-white" v-else>{{plan.allowed_performers}}+ Performers</span>
          </div>
          <div class="relative flex flex-col h-full shadow-md">
            <div class="flex flex-col px-4 py-2 w-full h-50 items-center justify-center">
              <div class="price" v-if="plan.is_custom == 0">
                <span class="font-medium text-xl text-black">
                  $
                  <b class="f-28">{{plan.amount}}</b>
                </span>
                <span class="letter-space text-black">per {{plan.type}}</span>
              </div>
              <div class="custom-plan-blank" v-else>
                <span class="font-medium text-xl text-black">                  
                </span>
                <span class="letter-space text-black"></span>
              </div>
              <div 
                v-if="plan.is_custom == 0"
                class="cursor-pointer m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail accept-decline-btn"
                @click="selectPlan(plan)"
              >
                <p class="text-white text-center uppercase content-center flex-1">Select</p>
              </div>
              <a 
                v-else
                target="_blank"
                v-bind:href="'mailto:'+account_email+''"
                class="cursor-pointer m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail accept-decline-btn"                
              >
                <p class="text-white text-center uppercase content-center flex-1" >Contact Us</p>
              </a>
              <span class="font-400 text-sm cus-p f-10 text-black text-center">{{plan.description}}</span>
            </div>
          </div>
        </div>
      </slide>
      <!-- </div> -->    
    </carousel>
    <div class="bottom-text">
      <span class="text-md text-white text-center mt-5 f-14">
        All subscriptions are billed monthly. if your Talent Database exceeds the number of
        <br />performers assigned to your account tier. your tier will automatically be upgraded.
      </span>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";
import store from "@/store";
import DEFINE from "@/utils/const.js";

export default {
  name: "PlanDetails",
  props: {
    from: String
  },
  data() {
    return {
      planList: Array,
      currentUser: null,
      account_email : DEFINE.account_email,
      default: () => []
    };
  },
  created() {
    this.currentUser = store.getters["profile/currentUser"];
    // console.log("created -> currentUser", this.currentUser)
    this.getPlanList();
  },
  methods: {
    selectPlan(plan) {
      // console.log("selectPlan -> plan", plan)
      this.$emit("select_plan", plan);
    },
    async getPlanList() {
      this.$emit("child_loder", true);
      const {
        data: { data }
      } = await axios.get(`/users/listSubscriptionPlans`);
      // console.log("getPlanList -> data", data);
      this.planList = data && data.length > 0 ? data : [];
      if (
        this.currentUser &&
        this.currentUser.total_performers &&
        this.currentUser.total_performers > 0
      ) {
        this.planList = this.planList.filter(
          val => val.allowed_performers >= this.currentUser.total_performers
        );
      }
      // console.log("this.planList -> data", this.planList);
      this.$emit("child_loder", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.top-1\/2 {
  top: 50%;
  transform: translateY(-50%);
}
.left-1\/2 {
  left: 50%;
  transform: translateX(-50%);
}
.bg-orange {
  background: orange;
}
.box {
  width: 210px !important;
}
.h-48 {
  height: 48px !important;
}
.f-28 {
  font-size: 28px !important;
}
.price {
  padding: 25px 0;
  display: flex;
  flex-direction: column;
}
.price span b {
  font-weight: 600;
  letter-spacing: 3px;
}
.price :first-of-child span {
  font-weight: 300;
}
.f-10 {
  font-size: 12px !important;
}
.cus-p {
  padding: 20px 0 14px 0;
}
.f-14 {
  font-size: 14px !important;
}
.border-tl-radius-6 {
  border-top-left-radius: 6px !important;
}
.border-tr-radius-6 {
  border-top-right-radius: 6px !important;
}
.border-radius-6 {
  border-radius: 6px !important;
}
.bottom-text {
  width: 100% !important;
  text-align: center !important;
  margin-top: 90px !important;
}
.bg-cus-orange {
  background: #d8893a !important;
}
.font-400 {
  font-weight: 400px !important;
}
.letter-space {
  letter-spacing: 2.1px;
}
.plan-list-carousel{

}
</style>
