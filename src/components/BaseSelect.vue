<!-- eslint-disable max-len -->
<template>
  <div>
    <select
      v-model="computedValue"
      class="text-black rounded-full overflow-hidden w-full h-full my-2 py-3 px-6 placeholder-purple"
      v-bind="$attrs"
    >
      <option
        v-if="computedValue == null"
        :value="null"
        disabled
        hidden
      >
        {{ placeholder }}
      </option>

      <slot />
    </select>
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
  $_veeValidate: {
    name() {
      return this.name;
    },
    value() {
      return this.value;
    },
  },
  props: {
    name: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      selected: this.value,
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.selected;
      },
      set(value) {
        this.selected = value;
        this.$emit('input', value);
      },
    },
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Set the selected option.
     *   2. If it's invalid, validate again.
     */
    value(value) {
      this.selected = value;
    },
  },
};
</script>

<style scoped>
select:focus {
  outline: none;
}
</style>
