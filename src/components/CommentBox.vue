<!-- eslint-disable max-len -->
<template>
  <div class="flex flex-col">
    <div      
      class="flex-1 my-2 rounded-large w-full h-full overflow-hidden"
      :class="customClasses"
    >
      <img        
        :src="'/images/icons/new.png'"
        alt="Icon"
        @click="$emit('added', 'set')"
        class="top-0 left-0 top-0 content-center h-6 ml-4 mt-3 cursor-pointer"
      />
      <textarea
        class="text-black w-full h-full py-3 px-6 placeholder-purple focus:outline-none resize-none"
        :value="value"
        :name="name"
        v-bind="$attrs"
        @input="$emit('input', $event.target.value)"
      />
    </div>
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
      type: [String, Date, Object],
      default: null,
    },       
    customClasses: {
      type: Array,
      default: () => [],
    },
    time: {
      type: Boolean,
      default: false,
    },
  },  
  methods: {
    focus() {
      this.$refs.inputTag.focus();
    },
  },
};
</script>

<style scoped>
.top-1\/2 {
  top: 50%;
  transform: translateY(-50%);
}
</style>
