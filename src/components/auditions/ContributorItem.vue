<!-- eslint-disable max-len -->
<template>
  <div
    class="flex items-center justify-center p-3"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <template v-if="!hover">
      <img
        src="/images/icons/person.png"
        alt="Icon"
        class="h-4 mr-4"
      >
      <span class="text-purple truncate">
        {{ contributor.email }}
      </span>
    </template>
    <template v-else>
      <base-button
        class="h-full pt-2 pb-2 mt-0 mb-0"
        color="bg-purple"
        text="text-white"
        border-classes="rounded-full"
        expanded
        @click="$emit('destroy', contributor)"
      >
        Delete
      </base-button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    contributor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hover: false,
    };
  },
};
</script>
