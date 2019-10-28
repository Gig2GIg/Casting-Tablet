<!-- eslint-disable max-len -->
<template>
  <div class="relative w-84 py-2 pr-2 ml-1 mr-4">
    <div
      v-if="tag"
      class="flex items-center justify-center absolute top-0 right-0 bg-white shadow rounded-sm rounded-bl-lg w-32 h-12"
    >
      {{ tag }}
    </div>

    <div class="flex flex-col h-full rounded-lg shadow-md overflow-hidden">
      <img
        :src="image || '/images/xd.png'"
        class="h-48 object-cover"
        alt="Image"
      >
      <div
        class="flex flex-col justify-center px-4 py-2"
        :class="{ 'w-56': actionable }"
      >
        <span class="font-medium text-lg truncate">
          {{ title }}
        </span>
        <span v-if="date != ''" class="-mt-2">{{ $dayjs(date).format('MMMM Do') }}</span>
        <span v-else class="-mt-2 text-white">.</span>
      </div>
    </div>
    <router-link :to="{ name: 'auditions/detail', params: {id: navigateTo } }">
      <base-button
        v-if="actionable"
        class="absolute bottom-0 right-0 mb-0 w-32 text-sm"
        border-classes="rounded-sm rounded-tl-lg"
      >
        Manage {{navigateTo}}
      </base-button>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: '/images/xd.png',
    },
    navigateTo: {
      type: Number,
    },
    actionable: Boolean,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>
