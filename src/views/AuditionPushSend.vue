<template>
<section class="w-4/5 mx-auto my-6">
  <form class="relative" data-vv-scope="send_push" @submit.prevent="sendPush">
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <div class="flex mb-4 px-2 text-mr">
      <div class="relative flex items-center text-purple font-medium">
        Notifications will be sent to all users who have acquired an appointment for this audition.
      </div>
    </div>
    <div class="flex">
        <base-input v-model="form.title" v-validate="'required|max:100'" name="title" class="w-full px-2" placeholder="Message Title" :custom-classes="['border', 'border-purple']" :message="errors.first('send_push.title')" expanded data-vv-as="message title" />      
    </div>    
    <div class="flex w-full h-full">
      <base-input rows="5" v-model="form.message" v-validate="'required|max:1000'" name="message" class="w-full px-2 py-2" type="textarea" placeholder="Message" :custom-classes="['border', 'border-purple', 'mt-0', { 'mb-0': !errors.has('send_push.message') }]" :message="errors.first('send_push.message')" />
    </div>
    <div class="flex flex-col w-full items-end mt-5">
      <base-button class="mt-auto w-1/4 mb-12" type="submit">Send</base-button>
    </div>
  </form>
</section>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";

import axios from "axios";
import _ from "lodash";

import { eventBus } from "../main";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(Loading);

import ExcelService from '@/services/ExcelService';
import DEFINE from '@/utils/const';

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage : true,
      form : {}
    };
  },
  destroyed:() => {
    eventBus.$off();
  },
  watch: {
  },
  async created() {    
      await this.fetchAuditionData(this.$route.params.id);      
      if(!this.audition.id) { 
        this.$toasted.error('Audition details not found!');
        this.$router.push({ name: 'auditions'});
      }
      eventBus.$emit("auditionTitle", this.audition.title);
  },
  computed: {
    ...mapState("audition", ['audition']),
  },
  methods: {    
    ...mapActions("audition", [
      "fetchAuditionData"
    ]),
    backToDetails(){
      this.$router.push({ name: 'auditions/detail',params:{id: this.$route.params.id } });
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    async sendPush() {      
      if (this.isLoading || !(await this.$validator.validateAll('send_push'))) {
          return;
      }
      try {
        this.isLoading = true;
        this.form.audition_id = this.$route.params.id;
        const { data: { data } } = await axios.post("/t/auditions/notifyPerformers", this.form);
        this.$toasted.success(data);
        this.form = {};
      } catch(ex){
        console.log("sendPush -> ex.response", ex)
        let errorMsg = ex.response && ex.response.data.errors ? this.$options.filters.getErrorMsg(
            ex.response.data.errors
          ) : (ex.response && ex.response.data.message ? ex.response.data.message : DEFINE.common_error_message);
          
        this.$toasted.error(errorMsg);        
      } finally{
        this.isLoading = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .button { 
    margin-top: 35px;
  }
  .text-mr {
    margin-bottom: 40px!important;
  }
      
</style>
