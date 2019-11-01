<template>
<div>
  <div class="container text-purple pl-6 py-8 h-84">
    <p class="w-full text-3xl">
      Upcoming
    </p>
    <div class="flex flex-wrap items-center justify-center w-full h-84" v-if="upcoming == ''">
      <p class="text-purple font-bold tracking-wide text-lg">No auditions found</p>
    </div>
    <carousel
      class="flex mt-4"
      :per-page="3"
      :pagination-enabled="false"
    >
      <slide
        v-for="data in upcoming"
        :key="data.id"
      >
        <card-item
          :title="data.title"
          :date="data.online == 0 ? '' : data.date"
          :contributor="data.user_id == userId  ? false : true"
          :image="data.cover"
          actionable
          :navigate-to="data.id"
          state="upcoming"
        />
      </slide>
    </carousel>
  </div>
  <div class="container text-purple pl-6 py-8 w-full h-84">
    <p class="text-3xl mt-6">
      Past
    </p>
    <div class="flex flex-wrap items-center justify-center w-full h-84" v-if="passed == ''">
      <p class="text-purple font-bold tracking-wide text-lg">No auditions found</p>
    </div>
    <carousel
      class="flex mt-4 w-full"
      :per-page="3"
      :pagination-enabled="false"
    >
      <slide
        v-for="data in passed"
        :key="data.id"
      >
        <card-item
          :title="data.title"
          :date="data.online == 0 ? '' : data.date"
          :image="data.cover"
          actionable
          :navigate-to="data.id"
          state="passed"
        />
      </slide>
    </carousel>
  </div>
  </div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex';
import TokenService from '../services/core/TokenService';

export default {
  data() {
    return {
      isLoading: true,
      userId:'',
    };
  },
  computed: {
    ...mapState('audition', ['auditions', 'upcoming', 'passed']),
    ...mapState('profile', ['user']),
  },
  async created() {
    this.fetchUpcoming();
    this.fetchPassed();
    this.fetch();
  },
  async mounted(){
    this.userId = TokenService.getUserId()
  },
  methods: {
    ...mapActions('audition', ['fetchUpcoming', 'fetchPassed']),
    ...mapActions('profile', ['fetch']),
  },
};
</script>
<style>
@media (min-width: 1280px){
  .container {
      max-width: 1450px;
  }
}
</style>
