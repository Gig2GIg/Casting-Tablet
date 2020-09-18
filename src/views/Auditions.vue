<template>
<div>
  <div class="container text-purple pl-8 pr-8 py-8 h-84">
    <p class="w-full text-3xl">
      Upcoming
    </p>
    <div class="flex flex-wrap items-center justify-center w-full h-84" v-if="!upcoming || upcoming.length == 0">
      <p class="text-purple font-bold tracking-wide text-lg">There are no upcoming auditions</p>
    </div>
    <!-- :paginationPosition="bottom-overlay" -->
    <carousel
      class="flex mt-4 carousel-slider-width"
      :per-page="3"
      :pagination-enabled="false"
      :navigation-enabled="true"
      :navigation-prev-label="'&#x279C;'"                            
      :navigation-next-label="'&#x279C;'"
    >
      <slide
        v-for="data in upcoming"
        :key="data.id"
      >
        <card-item
          :title="data.title"
          :date="data.online == 1 ? '' : data.date"
          :contributor="(data.user_id == userId || data.admin_id == userId)  ? false : true"
          :image="data.cover_thumbnail ? data.cover_thumbnail : data.cover"
          :imagealt="data.cover_name ? data.cover_name : ''"
          actionable
          :navigate-to="data.id"
          state="upcoming"
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
    ...mapState('audition', ['auditions', 'upcoming']),
    ...mapState('profile', ['user']),
  },
  async created() {
    await this.fetch();
    if(this.user.is_invited && (this.user.selected_admin == "" && this.user.selected_admin == null)) {
      // If no admin is selected user will be refirected to select admin page
      this.$router.push({
        name: "my.settings",
        query: { tab: "teamAdmins" },
      }); 
    } else {
        this.fetchUpcoming();
    }
  },
  async mounted(){
    this.userId = TokenService.getUserId()
  },
  methods: {
    ...mapActions('audition', ['fetchUpcoming']),
    ...mapActions('profile', ['fetch']),
  },
};
</script>
<style>
.carousel-slider-width{
  width: 100% !important;
}
@media (min-width: 1280px){
  .container {
      max-width: 1450px;
  }
}
</style>
