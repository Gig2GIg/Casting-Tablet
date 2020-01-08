<template>
  <component
    :is="layout"
    class="layout"
    :class="layout"
  />
</template>

<script>
export default {
  computed: {
    defaultLayout() {
      return 'dashboard';
    },
    layout() {
      return `${this.$route.meta.layout || this.defaultLayout}-layout`;
    },
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.bg-purple-gradient {
  background-image: linear-gradient(#4D2545, #782541);
}

.bg-purple-gradient:hover {
  background-image: linear-gradient(#331d2f, #5e1d33);
}

body, html {
  height: 100%;
}
.cus-des-timepicker .time-picker-preview {
    border-radius: 50px !important;
    border: 1px solid #4d2545 !important;
    box-shadow: none !important;
}
.cus-des-timepicker .time-picker-preview .preview-container{
    font-size: 100%;
    color: #4d2545;
}
.cus-des-timepicker .time-picker-preview.active{
      background-image: linear-gradient(#4D2545, #782541);
      color: #ffffff;
}
.cus-des-timepicker .time-picker-preview.active .preview-container{
  color: #ffffff;
}
.cus-des-timepicker .time-picker-modal-container{
  width: 300px;
}
.cus-des-timepicker .time-picker-modal-header .time-picker-header.active, .cus-des-timepicker .time-picker-modal-header .time-picker-header:hover{
  color: #4d2545;
}
.cus-des-timepicker .picker-point.current{
  background-image: linear-gradient(#4D2545, #782541);
}
.cus-des-timepicker .time-picker-interval.active, .cus-des-timepicker .time-picker-interval:hover{
  color: #4d2545;
  font-weight: bold;
}
.cus-des-timepicker .interval-container{
  text-align: center;
}
.h-57{height: 57px;}
.VueCarousel-navigation-prev {transform: rotate(180deg) translate(32px, 20px) !important;}
.VueCarousel-navigation-button{color: #592543!important;}
</style>
