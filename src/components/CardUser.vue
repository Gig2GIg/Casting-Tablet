<!-- eslint-disable max-len -->
<template>
  <div class="relative w-40 py-2 pr-2 ml-1 mr-4">
    <div class="flex flex-col h-full shadow-md overflow-hidden">
      <!-- <img
        :src="image"
        class="h-32"
        alt="Image"
      > -->
      <img v-lazy="image"  class="h-32" alt="Image" >

      <div
        class="flex flex-col justify-center px-4 py-2 w-32"
      >
        <span class="font-medium text-xs truncate">
          {{ title }}
        </span>
        <span class="font-medium text-xs truncate">
          {{ rol }}
        </span>
        <!-- <span class="-mt-2">{{ $dayjs(time).format('MMMM Do') }}</span> -->
        <span class="text-xs">{{ time }}</span>
      </div>
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
    time: {
      type: String,
      required: false,
    },
    tag: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      required: true,
    },
    navigateTo: {
      type: Number,
    },
    rol: {
      type: String,
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
