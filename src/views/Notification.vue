<template>
  <div class="flex flex-wrap content-center justify-center container text-purple pl-6 py-8 ">
    <div class="flex flex wrap content-center justify-center w-full">
      <div class="w-1/12">
        <img class="" :src="'/images/icons/message.png'" alt="message">
      </div>
      <div class="w-1/2">
        <p><strong>Luis Garcia</strong> has accepted your invitation to contribute on <strong>Ad Astra</strong></p>
      </div>
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
