<template>
  <nav class="flex items-center h-12">
    <div class="text-white" style="margin-left: 80%">
      {{enableNewGrpBtn}}===
      <button v-if="enableNewGrpBtn == true">New Group</button>
    </div>
    <div class="flex items-center border-l border-white text-white ml-auto cursor-pointer">
      <span class="mx-4">
        {{ user.details?user.details.first_name + ' ' + user.details.last_name:"" }}
      </span>
      <!-- <i class="material-icons mr-4">
        keyboard_arrow_down
      </i> -->
      <img
        :src="user.image?user.image.url:''"
        class="w-12"
        alt="Avatar"
      >
    </div>
  </nav>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import TokenService from '../services/core/TokenService';

export default {
  data() {
    return {
      enableNewGrpBtn:false,
      isLoading: true,
      userId: '',
    };
  },
  computed: {
    defaultLayout() {
      let audition_online_status = localStorage.getItem("audition_online_status");
      if(audition_online_status == 0){
        return this.enableNewGrpBtn = true;
      }else{
        return this.enableNewGrpBtn = false;
      }
    },
    ...mapState('audition', ['auditions', 'upcoming', 'passed']),
    ...mapState('profile', ['user']),
  },
  async created() {
    this.fetch();
  },
  async beforeMount() {
    let audition_online_status = localStorage.getItem("audition_online_status");
    if(audition_online_status == 0){
      this.enableNewGrpBtn = true;
    }else{
      this.enableNewGrpBtn = false;
    }
  },
  async mounted() {
    this.userId = TokenService.getUserId();
  },
  methods: {
    ...mapActions('audition', ['fetchUpcoming', 'fetchPassed']),
    ...mapActions('profile', ['fetch']),
  },
};
</script>
<style scoped>
nav {
  background-image: linear-gradient(#4D2545, #782541);
}

</style>
