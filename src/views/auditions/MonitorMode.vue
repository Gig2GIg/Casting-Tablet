<template>
  <div class="flex flex-wrap h-full">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <div class="flex flex-wrap flex-1 justify-center items-center text-white py-16 h-full bg-gray-100 ">
      <div class="container flex w-full mt-3">
          <div class="flex w-full text-center justify-center flex-wrap flex-row">
            
            <div v-for="(val, index) in updateTextArray" :key="index">
              <base-input                
                name="tag"
                v-model="val.title"
                class="px-2"
                type="text"
                readonly="true"
                :custom-classes="['border-2', 'border-purple']"
              />
            </div>
            
             <base-input
                v-model="updateText"
                name="tag"
                class="w-1/5 px-2"
                type="add"
                placeholder="Add a new update"
                :custom-classes="['border-2', 'border-purple']"
              />
            <div class="m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail cursor-pointer" @click="sendUpdate()">
              <p class="text-white text-sm font-bold content-center tracking-tighter flex-1">
                Send Updates
              </p>
            </div>
          </div>
        </div>
        <div class="container flex flex-wrap custom-flex-updates w-1/2 h-96 overflow-y-auto overflow-x-hidden">
        <p class="w-full font-bold text-purple text-lg mt-3">Updates</p>
        <p class="text-purple font-medium tracking-wide" v-if="Object.keys(updates).length>0 == 0">Updates to this audition have not yet been sent</p>
        <div class="w-full h-20 " v-for="data in updates" :key="data.id">            
          <p class="w-full text-purple text-base m-3 description">{{data.title}}</p>
          <p class="w-full text-purple font-bold text-sm m-3">{{data.time | custTimeFormat}}</p>
        </div>
      </div>
    </div>
  <section class=" bg-white flex flex-col items-center h-full w-1/5 overflow-scroll">
    <div class="flex w-full mt-10 ">
      <div class="w-full text-center font-bold text-purple text-xl">
        Audition <br> Appointments
      </div>
    </div>
      <div v-if="!slotsData || slotsData.length == 0 || !slotsData.length" class="mt-10">
        <p class="text-purple font-medium tracking-wide">Appointments not added yet</p>
      </div>
      <draggable
        v-else
        :list="slotsData"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="endMove"
      >
        <div
          v-for="data in slotsData"
          :key="data.id"
          class="w-full"
        >
          <div class="flex w-full -mb-5">
            <div class="w-1/2 text-center m-8 float-left">
              <h4 class="text-left text-sm  text-purple">
                {{ data.name ? data.name : 'Free' }}
              </h4>
            </div>
            <div class="w-1/2 text-center m-8 float-right">
              <h4 class="text-right text-sm font-bold text-purple">
                {{ data.time }}
              </h4>
            </div>
          </div>
          <div class="w-full border border-gray-300" />
        </div>
      </draggable>

    </section>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from 'vuex';
import axios from 'axios';
import moment from "moment";
import DEFINE from '../../utils/const.js';
import draggable from "vuedraggable";

// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(Loading);

export default {
  components: {
    draggable,
    Loading
  },
  data() {
    return {
      email: '',
      password: '',
      init:true,
      scan:false,
      prechecked:false,
      appointment_id:"",
      isLoading: false,
      fullPage: true,
      result: null,
      error: null,
      dragover: false,
      showAppointments:false,
      cam: true,
      image: false,
      data:{},
      updates:{},
      updateText:'',
      updateTextArray:[],
      enabled: true,
      dragging: false,
      fromSlot : {},
      toSlot : {},
      slotsData : []
    };
  },
  computed:{
    ...mapState("appointment", ["appointments", "userAppointment", "appointmentNotWalk"]),
    //  draggingInfo() {
    //   return this.dragging ? "under drag" : "";
    // }
  },
  async mounted() {
    await this.fetch(this.$route.params.id);
    this.getSlotsData();
    let { data: { data } } = await axios.get(`/monitor/show/${this.$route.params.id}`);
    this.updates = data;
  },
  async created() {
      let passCode = localStorage.getItem(DEFINE.set_monitor_pass_code_key);
      if(!passCode || passCode == ''){
          this.$toasted.error("You have not passcode to access monitor mode.");
          this.$router.push({ name: 'auditions/detail', params: {id: this.$route.params.auditionId } });
      }                 
  },
  methods: {
    ...mapActions("appointment", ["fetch", "fetchUserAudition", "saveCheckIn", "fetchAppointmentNotWalk"]),
    async reset(){
        let stateCheckin = await this.saveCheckIn(this.data);
        this.$toasted.success('The check-in has been successfully');
        this.data={};
        this.init = true;
        this.scan = false;
        this.prechecked = false;
        this.appointment_id=""
    },
    async getSlotsData(){
      let { data: { data } } = await axios.get(`/t/appointments/${this.$route.params.id}/slots`);             
      this.slotsData = data.map(slot=>{
          let user = this.findUserBySlot(slot.id);
          if(user){
            slot.name = user.name;
            slot.image = user.image;
            slot.user_id = user.user_id;
            slot.email = user.email;            
          }
          return slot;
      });
    },
    findUserBySlot(slot_id){
      let filtered_data = this.appointments.filter(
          user => user.slot_id == slot_id
        );
      return filtered_data[0] ? filtered_data[0] : null;
    },
    checkMove: function(e) {
      this.fromSlot = e.draggedContext.element;      
      this.toSlot = e.relatedContext.element;
    },
    async endMove(){      
      if(this.toSlot && this.fromSlot){
        this.isLoading = true;
        this.enabled = false;
        let slots = [];
        if(this.fromSlot.user_id && this.toSlot.user_id){
          slots = [
              {
                "slot_id": this.toSlot.id,
                "user_id": this.fromSlot.user_id
              },
              {
                "slot_id": this.fromSlot.id,
                "user_id": this.toSlot.user_id
              }
            ]
        } else if(this.fromSlot.user_id){
          slots = [
              {
                "slot_id": this.toSlot.id,
                "user_id": this.fromSlot.user_id
              }
          ]
        } else if(this.toSlot.user_id){
          slots = [
              {
                "slot_id": this.fromSlot.id,
                "user_id": this.toSlot.user_id
              }
          ]
        }
        try {
          let request = {
            slots :slots 
          };
          await axios.put(`t/auditions/appointments/${this.$route.params.id}/slots`, request);
          await this.fetch(this.$route.params.id);
          await this.getSlotsData();
          this.fromSlot = {};
          this.toSlot = {};
          // await this.fetch(this.$route.params.id);
          this.isLoading = false;
          this.enabled = true;
        } catch (error) {
          this.isLoading = false;
          // this.enabled = true;
          this.$toasted.error("Audition appointments not changed");
        }
      }      
    },
    async sendUpdate(){
      if (this.isLoading) {
          return;
      }
      this.$toasted.clear();
      try {        
        if (!this.updateText ||this.updateText == '') {
            this.$toasted.error("Please enter a new udpate.");
            return;
        }
        this.isLoading = true;
        let body = {
          "appointment":this.$route.params.id,
          "title": this.updateText,
          "time": moment().format("hh:mm"),
        }
        await axios.post('t/monitor/updates', body);
        this.$toasted.success('Update send successfully');
        let { data: { data } } = await axios.get(`/monitor/show/${this.$route.params.id}`);
        this.updates = data;
        this.updateTextArray.push({title : this.updateText});
        this.updateText = "";
        this.isLoading = false;

      } catch (error) {
        this.isLoading = false;
        this.$toasted.error("Not performers added to notificate");
      }
    },
    useScanner(){
        this.init = false;
        this.scan = true;
        
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson';
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device';
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)';
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?';
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable';
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser';
        }
      }
    },
    async onDecode (result) {
      this.result = JSON.parse(result);
      if(this.result.hour !== null){
        await this.fetchUserAudition(this.result);
        this.data = {"slot": this.userAppointment.slot_id, "user": this.result.userId, "auditions": this.result.auditionId, "rol": this.result.rolId, "appointment_id": this.result.appointmentId}

        if(stateCheckin){
          this.scan = false;
          this.prechecked = true;
        }
        else{
          this.$toasted.error('Invalid Data Given');
        }
      }
      else{
        await this.fetchAppointmentNotWalk(this.$route.params.id);
        this.scan = false;
        this.showAppointments = true;
      }
    },
    async updateCheckIn(){
      await this.fetchUserAudition(this.result);
      let data = {"slot": this.appointment_id, "user": this.result.userId, "auditions": this.result.auditionId, "rol": this.result.rolId, "appointment_id": this.result.appointmentId}
      let stateCheckin = await this.saveCheckIn(data);
      if(stateCheckin){
        this.scan = false;
        this.showAppointments = false;
        this.prechecked = true;
        await this.fetchUserAudition(this.result);
      }
      else{
        console.log("Invalid Data Given");
      }
    },

    logErrors(promise) {
      promise.catch(console.error);
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },   
  },
};
</script>
<style scoped>
body, html {
    height: 100%;
}
.drop-area {
  height: 300px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  padding: 10px;

  background-color: rgba(0,0,0,.5);
}

.dragover {
  background-color: rgba(0,0,0,.8);
}

.drop-error {
  color: red;
  font-weight: bold;
}
.button-detail{
  background-image: linear-gradient(#4D2545, #782541);
}
.custom-flex-updates {
  justify-content: flex-start;
  align-content: flex-start;

}
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-height: 16px;
  max-height: 62px;
}
</style>
