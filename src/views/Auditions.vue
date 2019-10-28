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
          :date="data.online == 1 ? '' : data.date"
          :image="data.cover"
          actionable
          :navigate-to="data.id"
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
      :per-page="4"
      :pagination-enabled="false"
    >
      <slide
        v-for="data in passed"
        :key="data.id"
      >
        <card-item
          :title="data.title"
          :date="data.online == 1 ? '' : data.date"
          :image="data.cover"
        />
      </slide>
    </carousel>
  </div>
  </div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState('audition', ['auditions', 'upcoming', 'passed']),
  },
  async created() {
    this.fetchUpcoming();
    // this.fetchPassed();
  },
  methods: {
    ...mapActions('audition', ['fetch', 'fetchUpcoming', 'fetchPassed']),
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
