<!-- eslint-disable max-len -->
<template>
  <div
    class="flex items-center justify-center h-10"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <template v-if="!hover">
      <img
        src="/images/icons/person.png"
        alt="Icon"
        class="ml-4 h-4 mr-4"
      >
      <span class="text-purple truncate mr-4">
        {{ contributor.email }}
      </span>
    </template>
    <template v-else>
      <div
        class="flex items-center justify-center text-white w-full h-full cursor-pointer"
        style="background-color: #93183E;"
        @click="$emit('destroy', contributor)"
      >
        Delete
      </div>
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
