<template>
  <div class="flex flex-wrap content-center justify-center container text-purple pl-6 py-8 ">
    <div class="w-1/2">
    <div class="rounded overflow-hidden shadow-lg w-full">
      <img class="w-full" src="https://firebasestorage.googleapis.com/v0/b/dd-gig2gig.appspot.com/o/tablet%2Fauditions%2Fcover%2F092617?alt=media&token=0c304e1a-198a-4088-afb7-1acaf8d15e98" alt="Sunset in the mountains">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
    </div>
    <div class="rounded overflow-hidden shadow-lg w-full mt-5">
      <img class="w-full" src="https://firebasestorage.googleapis.com/v0/b/dd-gig2gig.appspot.com/o/tablet%2Fauditions%2Fcover%2F141250?alt=media&token=fae34b67-a721-492c-84f3-82c04406c859" alt="Sunset in the mountains">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
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
