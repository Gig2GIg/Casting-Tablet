<template>
  <div class="text-purple pl-6 py-8">
    <p class="text-3xl">
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

export default {
  data() {
    return {
      upcoming: [],
      past: [],
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
