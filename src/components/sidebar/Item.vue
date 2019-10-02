<!-- eslint-disable max-len -->
<template>
  <component
    :is="!!to ? 'router-link' : 'div'"
    :to="to"
    class="flex items-center w-full h-12 pl-6 cursor-pointer border-l-2 hover:bg-gray-100 hover:border-purple"
    active-class="bg-gray-100 border-purple"
    exact
  >
    <figure class="flex justify-center mr-4 w-6">
      <img
        :src="`/images/icons/${icon}.png`"
        alt="Icon"
        class="h-4"
      >
    </figure>
    <span class="-mt-1">{{ text }}</span>
  </component>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: null,
    },
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    counter: {
      type: Number,
      default: 0,
    },
  },
};
</script>
