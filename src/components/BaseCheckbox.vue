<!-- eslint-disable max-len -->
<template>
  <div>
    <div
      class="py-2 w-full h-full"
      @click="$emit('input', !value)"
    >
      <div
        class="flex items-center justify-between text-black rounded-full overflow-hidden w-full h-full pl-6 pr-2 cursor-pointer"
        :class="[...customClasses]"
        v-bind="$attrs"
      >
        <span>
          <slot />
        </span>

        <i
          class="material-icons"
          :class="value ? 'text-purple' : 'text-gray-400'"
        >
          check_circle
        </i>
      </div>
    </div>

    <p
      v-if="message"
      class="ml-6 mb-2"
    >
      {{ message }}
    </p>
  </div>
</template>

<script>

export default {
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: null,
    },
    value: Boolean,
    message: {
      type: String,
      default: null,
    },
    customClasses: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
