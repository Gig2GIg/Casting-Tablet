<template>
  <div class="flex text-purple h-full w-full">
    <div class="w-full">
      <div v-if="status == 0" class="flex items-center flex-wrap ml-5 h-full">
        <h4 class="w-full text-center text-purple font-semibold text-2xl">Check-In has not opened for this audition</h4>
      </div>
      <div v-if="status == 1" class=" flex flex-wrap ml-5">
        <div
          v-for="data in userList"
          :key="data.user_id"
        >
          <router-link :to="{ name: 'auditions/user', params: {id: data.user_id, round: round.id, audition:$route.params.id} }">
          <card-user
            :title="data.name"
            :time="data.time"
            :image="data.image"
          />
          </router-link>
        </div>
      </div>
    </div>
    <sidebar-detail @selected="chargeUsers" @statusSet="changeView" class="float-right w-1/2 ml-2"/>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import AuditionService from '@/services/AuditionService';

export default {
  data() {
    return {
      isLoading: true,
      status: 0,
      round: '',
    };
  },
  computed: {
    ...mapState('audition', ['userList']),
  },
  async created() {
    
  },
  methods: {
    ...mapActions('audition', ['fetchUserList']),
    async chargeUsers(value){
      this.round = value;
      await this.fetchUserList(value.id);
    },
    async changeView(status){
      this.status = status;
    }
  },
};
</script>
<style scoped>
@media (min-width: 1280px){
  .container {
      max-width: 900px;
  }
}
</style>
