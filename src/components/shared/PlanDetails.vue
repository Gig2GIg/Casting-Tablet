<template>
  <div class="flex flex-wrap items-center justify-center">
    <div v-for="plan of planList" :key="plan.id" class="col-6 w-11/8 border-2 border-purple bg-white h-full mr-5 mb-5">
      <div  class="w-40 border-2 border-purple bg-white">
          <div  class="relative flex flex-col h-full shadow-md items-center justify-center bg-orange">      
            <span class="font-medium text-xl text-black">Tier 1</span>
          </div>
          <div class="relative flex flex-col h-full shadow-md">
            <div class="flex flex-col px-4 py-2 w-full h-50 items-center justify-center">
              <span class="font-medium text-xl text-black">$ {{plan.amount}}</span>
              <span class="font-medium text-lg text-black">per {{plan.interval}}</span>
              <div
                class="cursor-pointer m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail accept-decline-btn"
                @click="selectPlan(plan)"
              >
                <p class="text-white text-center uppercase font-bold content-center flex-1">Select</p>
              </div>
              <span
                class="font-medium text-sm text-black text-center"
              >{{plan.nickname}}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
          <span class="font-medium text-md text-white text-center mt-5">
            All subscriptions are billed monthly. if your Talent Database exceeds the number of performers assigned to your account tier. your will automatically be upgrade.
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
</style>
