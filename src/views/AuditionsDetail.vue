<template>
  <div class="text-purple pl-6 py-8">
    <sidebar-detail @selected="chargeUsers" class="float-right" />
    <div class=" flex flex-wrap ml-5">
      <div
        v-for="data in userList"
        :key="data.id"
      >
        <card-user
          :title="data.name"
          :time="data.time"
          :image="data.image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import AuditionService from '@/services/AuditionService';

export default {
  data() {
    return {
      isLoading: true,
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
      await this.fetchUserList(value.id);
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
