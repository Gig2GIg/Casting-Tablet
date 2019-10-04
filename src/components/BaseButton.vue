<template>
  <button
    v-if="color && text"
    class="text-white overflow-hidden my-2 p-3 text-lg"
    :class="[borderClasses, color, text, { 'w-full': expanded }]"
    v-bind="$attrs"
    :type="type"
    @click="$emit('click', $event)"
  >
  <slot />
  </button>

  <button
    v-else
    class="text-white overflow-hidden my-2 p-3 text-lg selbutton"
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
    color: String,
    text: String,
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
.selbutton {
  background-image: linear-gradient(#4D2545, #782541);
} 

.selbutton:hover {
  background-image: linear-gradient(#331d2f, #5e1d33);
}

.selbutton:focus {
  outline: none;
}
</style>
