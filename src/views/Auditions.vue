<template>
  <div class="text-purple pl-6 py-8">
    <p class="text-3xl">
      Upcoming
    </p>
    <carousel
      class="flex mt-4"
      :per-page="4"
      :pagination-enabled="false"
    >
      <slide>
        <card-item
          title="Aladdin the Musical"
          date="2019-10-22"
          image="/images/xd.png"
          actionable
        />
      </slide>
      <slide>
        <card-item
          title="Aladdin the Musical"
          date="2019-10-22"
          image="/images/xd.png"
          actionable
        />
      </slide>
      <slide>
        <card-item
          title="Aladdin the Musical"
          date="2019-10-22"
          image="/images/xd.png"
          actionable
        />
      </slide>
    </carousel>

    <p class="text-3xl mt-6">
      Past
    </p>
    <carousel
      class="flex mt-4"
      :per-page="4"
      :pagination-enabled="false"
    >
      <slide>
        <card-item
          title="Aladdin the Musical"
          date="2019-10-22"
          image="/images/xd.png"
        />
      </slide>
      <slide>
        <card-item
          title="Aladdin the Musical"
          date="2019-10-22"
          image="/images/xd.png"
        />
      </slide>
      <slide>
        <card-item
          title="Aladdin the Musical"
          date="2019-10-22"
          image="/images/xd.png"
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
  async created() {
    const { data } = await AuditionService.all();
    console.log(data);
  },
};
</script>
