<template>
  <div>    
    <carousel
      ref="carousel"
      class="carousel-slider-width btn-position"
      :per-page="1"
      :pagination-enabled="true"
      :pagination-active-color="'#512544'"
      :pagination-color="'#8E768A'"
      :pagination-position="'bottom'"
      @page-change="pageChange"
    >
    <!-- :navigate-to="setPage"
       -->
      <slide
        v-for="data in tour_list"
        :key="data.step"
        >

      <img v-lazy="data.image" class="tour-img" >
      <h1 class="font-bold mb-2 text-2xl text-center tracking-wide text-purple">{{ data.title }}</h1>
      <h1 class="text-center text-purple m-width">{{ data.details }}</h1>
      </slide>
    </carousel>
    <router-link :to="{ name: 'auditions'}" class="cursor-pointer skip-btn left-2 text-purple">
      Skip
    </router-link>
    <router-link v-if="(current_page_index+1) == tour_list.length"  :to="{ name: 'auditions'}" class="cursor-pointer done-btn right-2 text-purple">
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
    // this.current_page_index = this.$route.params.step;    
  },
  // mounted() {
  //   console.log("TCL: created -> this.current_page_index", this.current_page_index)
  //   this.setPage = [this.current_page_index,false];
  // },
  methods: {
    pageChange(page){
      this.current_page_index = page;
      // if(this.$route.params.step != this.current_page_index){
      //   this.$router.push({ name: 'tour',  params:{step : page} });
      // }      
    }
  }
  
};
</script>
<style scoped>
.tour-img {
    max-height: calc(100vh - 25%);
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
}

.btn-position {
    position: relative;
    padding-bottom: 30px;
    height: 100vh;
}

.skip-btn {
    position: absolute;
    left: calc(50% - 265px);
    bottom: 35px;
}

.done-btn {
    position: absolute;
    right: calc(50% - 265px);
    bottom: 35px;
}

.VueCarousel-pagination .VueCarousel-dot-container button.VueCarousel-dot {
    margin-top: 0 !important;
}

.VueCarousel-pagination .VueCarousel-dot-container {
    margin-top: 0 !important;
}

.m-width {
    max-width: 460px;
    margin: 0 auto;
}

.VueCarousel-wrapper {
    height: 100vh;
}

.VueCarousel-slide {
    padding-left:15px;
    padding-right: 15px;
}

@media (max-width: 767px) {
    .skip-btn {
        left: 15px;
    }

    .done-btn {
        right: 15px;
    }
}
</style>