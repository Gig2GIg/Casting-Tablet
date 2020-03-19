<!-- eslint-disable max-len -->
<template>
<!--   -->
  <div class="w-40" :class="[(!isFinalCast ? 'py-2 pr-2 ml-1 mr-4' : '')]" >
    <div class="relative flex flex-col h-full shadow-md overflow-hidden card-img">
      <!-- <img
        :src="image"
        class="h-32"
        alt="Image"
      > -->
      <img v-if="favorite == 1"  :src="'/images/icons/Path_56@2x.png'" class="star-performer" alt="star" >
      <img v-lazy="image"  class="h-32 object-cover user-image" alt="Image" >

      <div
        class="flex flex-col  justify-start px-4 py-2 w-32"
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
    isFinalCast: {
      type: Boolean,
      default: false,
    },
    favorite : {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>
<style>
.star-performer{
  float: left;
  position: absolute;
  left: 7px;
  top: 10px;
  font-weight: bold;
  width: 20px!important;
}
</style>

