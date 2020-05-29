<template>
  <div class="flex flex-wrap items-center justify-center">
    <div v-for="plan of planList" :key="plan.id" class="col-6 w-11/8 bg-white h-full mr-5 mb-5 border-radius-6">
      <div  class="border-radius-6 box">
          <div  class="relative flex flex-col h-48 items-center justify-center bg-cus-orange border-tl-radius-6 border-tr-radius-6">      
            <span class="text-xl text-white">{{plan.name}}</span>
          </div>
          <div class="relative flex flex-col h-full shadow-md">
            <div class="flex flex-col px-4 py-2 w-full h-50 items-center justify-center">
              <div class="price">
                <span class="font-medium text-xl text-black">$<b class="f-28">{{plan.amount}}</b></span>
                <span class="letter-space text-black">per {{plan.interval}}</span>
              </div>
              <div
                class="cursor-pointer m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail accept-decline-btn"
                @click="selectPlan(plan)"
              >
                <p class="text-white text-center uppercase content-center flex-1">Select</p>
              </div>
              <span
                class="font-400 text-sm cus-p f-10 text-black text-center"
              >{{plan.nickname}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-text">
        <span class="text-md text-white text-center mt-5 f-14">
          All subscriptions are billed monthly. if your Talent Database exceeds the number of<br> performers assigned to your account tier. your will automatically be upgrade.
        </span>
    </div>  
    </div>
       
</template>

<script>
import axios from "axios";

export default {
  name: "PlanDetails",
  props: {
    from: String
  },
  data() {
    return {
      planList : Array,
      default: () => [],
    };
  },
  created() {
    this.getPlanList();
  },
  methods: {
    selectPlan(plan) {
      console.log("selectPlan -> plan", plan)
      this.$emit('select_plan', plan);        
    },
    async getPlanList() {
      const {
        data: { data }
      } = await axios.get(`/users/listSubscriptionPlans`);
      console.log("getPlanList -> data", data);
      this.planList = data.data && data.data.length > 0 ? data.data : [];
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
  background:  orange;
}
.box {
    width: 210px !important;
}
.h-48{
  height: 48px !important;
}
.f-28{
  font-size: 28px !important;
}
.price{
  padding: 25px 0;
  display: flex;
  flex-direction: column;
}
.price span b{
  font-weight: 600;
  letter-spacing: 3px;
}
.price :first-of-child span{
  font-weight: 300;
}
.f-10{
  font-size: 12px !important;
}
.cus-p{
  padding: 20px 0 14px 0;
}
.f-14{
  font-size: 14px !important; 
}
.border-tl-radius-6{
  border-top-left-radius: 6px !important;
}
.border-tr-radius-6{
  border-top-right-radius: 6px !important;
}
.border-radius-6{
  border-radius: 6px !important;
}
.bottom-text{
  width: 100% !important;
  text-align: center !important;
  margin-top: 90px !important;
}
.bg-cus-orange{
  background: #D8893A !important;
}
.font-400{
  font-weight: 400px !important;
}
.letter-space{
      letter-spacing: 2.1px;
}
</style>
