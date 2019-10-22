<template>
  <button
    v-if="color && text"
    class="text-white overflow-hidden my-2 p-3 text-lg focus:outline-none"
    :class="[borderClasses, color, text, hover.map(x => `hover:${x}`), { 'w-full': expanded }]"
    v-bind="$attrs"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>

  <button
    v-else
    class="bg-purple-gradient text-white overflow-hidden my-2 p-3 text-lg focus:outline-none"
    :class="[borderClasses, { 'w-full': expanded }]"
    v-bind="$attrs"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    expanded: Boolean,
    color: {
      type: String,
      default: null,
    },
    hover: {
      type: Array,
      default: () => [],
    },
    text: {
      type: String,
      default: null,
    },
    borderClasses: {
      type: String,
      default: 'rounded-full shadow-xl',
    },
    type: {
      type: String,
      default: 'button',
      validator: value => [
        'button',
        'submit',
        'reset',
      ].indexOf(value) >= 0,
    },
  },
};
</script>
<style scoped>
.button-detail{
  background-image: linear-gradient(#4D2545, #782541);
}
</style>
