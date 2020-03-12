<template>
  <nav class="flex justify-center items-center h-12 text-white">      
    <div class=" cursor-pointer flex content-around w-100 items-center relative cmb-10" @click="back">
      <img
        src="/images/icons/left_arrow_white.png"
        class="absolute left-0 pl-1"        
      />
      <h1 class="absolute left-0 text-white text-lg back-mrg-l">{{audition_title}}</h1>
    </div>
    
     <div class="flex items-center border-l border-white text-white ml-auto cursor-pointer">
      <span class="mx-4">
        {{user.details && user.details.first_name ? user.details.first_name : ''}} {{user.details && user.details.last_name ? user.details.last_name : '' }}
      </span>      
      <img
        v-if="user.image && user.image.url"
        :src="user.image.url"
        class="w-12 img-h48 object-cover"
        alt="Avatar"
      >
    </div>


  </nav>

</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import axios from "axios";
import { eventBus } from "../main";
import firebase from "firebase/app";
import uuid from "uuid/v1";

export default {
  data() {
    return {
      audition_title: "",      
    };
  },
  computed: {    
    ...mapState("profile", ["user"])
  },
  mounted() {
    this.fetch();
    eventBus.$on("auditionTitle", value => {
      this.audition_title = value;
    });
  },
  created() {    
  },
  methods: {    
    ...mapActions("profile", ["fetch"]),    
    back(){
      this.$router.push({ name: 'auditions/detail',params:{id: this.$route.params.id } });
    },
  }
};
</script>
<style scoped>
nav {
  background-image: linear-gradient(#4d2545, #782541);
}
.custom-top-nav {
    width: 100%;
}
.custom-btn-group {
    display: flex;
    border: 1px solid #fff;
    padding: 5px 18px;
    align-items: center;
    font-size: 16px;
}
.custom-btn-group img {
    width: 32px;
    margin-right: 5px;
}
.custom-top-nav .text-white.h-6 {
    height: auto !important;
}
.custom-btn {
    border: 1px solid #fff;
    padding: 5px 18px;
    font-size: 16px;
    display: inline-block;
    border-radius: 4px;
}
.custom-btn.btn-fill {
    background-color: #fff;
    color: #4D2545;
}
.custom-btn-record {padding: 0 15px;margin-right: 15px;border: 1px solid #fff;}
.img-h48{
  height: 48px;
}
.back-mrg-l{
  padding-left: 30px !important;
}
</style>
