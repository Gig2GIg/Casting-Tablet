<!-- eslint-disable max-len -->
<template>
  <div class="relative pr-2 pl-2">
    <div
      v-if="tag"
      class="flex items-center justify-center absolute top-0 right-0 bg-white shadow rounded-sm rounded-bl-lg w-32 h-12"
    >
      {{ tag }}
    </div>

    <div class="flex flex-col h-full rounded-lg shadow-md overflow-hidden relative">
<!--      <button-->
<!--        v-if="state == 'upcoming'"-->
<!--        class="absolute top-0 right-0 rounded-b-lg shadow-xl mb-0 w-32 text-sm bg-white text-white overflow-hidden my-2 p-3 text-lg focus:outline-none text-purple"-->
<!--        :class="[borderClasses, { 'w-full': expanded }]"-->
<!--        v-bind="$attrs"-->
<!--        :type="type"-->
<!--        @click="$emit('click', $event)"-->
<!--      >-->
      <button
              v-if="state == 'upcoming'"
              class="absolute top-0 right-0 rounded-b-lg shadow-xl mb-0 w-32 text-sm bg-white text-white overflow-hidden p-3 text-lg focus:outline-none text-purple"
              v-bind="$attrs"
              @click="$emit('click', $event)"
      >
        {{contributor == true ?'Contributor':'Manager'}}
      </button>
      <img
        v-lazy="image || '/images/xd.png'"
        class="object-cover slide-image"
        :alt="imagealt"
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
      <router-link :to="{ name: 'auditions/detail', params: {id: navigateTo } }">
      <base-button
        v-if="actionable"
        class="absolute bottom-0 right-0 mb-0 w-32 text-sm"
        border-classes="rounded-sm rounded-tl-lg"
      >
        Manage
      </base-button>
    </router-link>
    </div>
    
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
    state: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: '/images/xd.png',
    },
    imagealt: {
      type: String,
      default: 'Image',
    },
    navigateTo: {
      type: Number,
    },
    actionable: Boolean,
    contributor: Boolean,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>
<style>
.slide-image {
  width: 100%;
}
</style>