<template>
<div>
  <div class="container text-purple pl-6 py-8 w-full h-84">
      <p class="w-full text-3xl">
        Past
      </p>
      <div class="flex flex-wrap items-center justify-center w-full h-84" v-if="passed == ''">
        <p class="text-purple font-bold tracking-wide text-lg">No auditions found</p>
      </div>
      <carousel
        class="flex mt-4 w-full carousel-slider-width"
        :per-page="3"
        :pagination-enabled="false"
        :navigation-enabled="true"
        :navigation-prev-label="'&#x279C;'"                            
        :navigation-next-label="'&#x279C;'"
      >
        <slide
          v-for="data in passed"
          :key="data.id"
        >
          <card-item
            :title="data.title"
            :date="data.online == 1 ? '' : data.date"
            :image="data.cover_thumbnail ? data.cover_thumbnail : data.cover"
            :imagealt="data.cover_name ? data.cover_name : ''"
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
    ...mapState('audition', ['auditions', 'passed']),
    ...mapState('profile', ['user']),
  },
  async created() {
    this.fetchPassed();
    this.fetch();
  },
  async mounted(){
    this.userId = TokenService.getUserId()
  },
  methods: {
    ...mapActions('audition', ['fetchPassed']),
    ...mapActions('profile', ['fetch']),
  },
};
</script>
<style>
.carousel-slider-width{
  width: 96% !important;
}
@media (min-width: 1280px){
  .container {
      max-width: 1450px;
  }
}
</style>
