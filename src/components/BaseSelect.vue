<!-- eslint-disable max-len -->
<template>
  <div>
    <select
      v-model="computedValue"
      class="text-purple rounded-full overflow-hidden w-full h-full my-2 py-3 px-6"
      :class="[...customClasses]"
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
  props: {
    name: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Number],
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
    customClasses: {
      type: Array,
      default: () => [],
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
