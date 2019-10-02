<template>
  <div class="container text-purple pl-6 py-8">
    <p class="w-full text-3xl">
      Upcoming
    </p>
    <carousel
      class="flex mt-4"
      :per-page="3"
      :pagination-enabled="false"
    >
      <slide
        v-for="audition in upcoming"
        :key="audition.id"
      >
        <card-item
          :title="audition.title"
          :date="audition.date"
          :image="audition.cover"
          actionable
          :navigateTo="data.id"
        />
      </slide>
    </carousel>

    <p class="text-3xl mt-6">
      Past
    </p>
    <carousel
      class="flex mt-4"
      :per-page="3"
      :pagination-enabled="false"
    >
      <slide
        v-for="audition in past"
        :key="audition.id"
      >
        <card-item
          :title="audition.title"
          :date="audition.date"
          :image="audition.cover"
        />
      </slide>
    </carousel>
    </div>
</template>

<script>
import AuditionService from '@/services/AuditionService';
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  async mounted() {
    const { data: { data } } = await AuditionService.all();
    this.upcoming = data.filter(audition => !!audition.status);
    this.past = data.filter(audition => !audition.status);
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
