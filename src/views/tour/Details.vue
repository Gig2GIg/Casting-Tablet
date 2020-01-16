<template>
  <div>    
    <carousel
      class="flex mt-4 carousel-slider-width "
      :per-page="1"
      :pagination-enabled="true"
      :pagination-active-color="'#512544'"
      :pagination-color="'#8E768A'"
      :pagination-position="'bottom'"
      :navigate-to="setPage"
      @page-change="pageChange"
    >
    
      <slide
        v-for="data in tour_list"
        :key="data.step"
        >

      <img v-lazy="data.image" class="tour-img" >
      <h1 class="font-bold text-2xl text-center ml-20 tracking-wide text-purple">{{ data.title }}</h1>
      <h1 class="text-center text-purple">{{ data.details }}</h1>
      </slide>
    </carousel>
    <router-link :to="{ name: 'auditions'}" class="cursor-pointer left-2">
      Skip
    </router-link>
    <router-link v-if="(current_page_index+1) == tour_list.length" :to="{ name: 'auditions'}" class="cursor-pointer right-2">
      Done
    </router-link>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import DEFINE from '../../utils/const.js';

export default {
  data() {
    return {
      tour_list : [],
      current_page_index : 0,
      setPage : [0,false]
    };
  },
  created() {
    this.tour_list  = DEFINE.tours;
    this.current_page_index = this.$route.params.step;
    
  },
  updated() {
    console.log("TCL: created -> this.current_page_index", this.current_page_index)
    this.setPage = [this.current_page_index,false];
  },
  methods: {
    pageChange(page){

      this.current_page_index = page;
      if(this.$route.params.step != this.current_page_index){
        this.$router.push({ name: 'tour',  params:{step : page} });
      }
      
    }
  }
  
};
</script>
<style>
/* .carousel-slider-width{
  width: 96% !important;
} */
.tour-img{
  height: 50%!important;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  /* width: 100%; */
}
</style>

