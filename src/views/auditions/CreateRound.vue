<template>
  <div class="flex flex-col justify-center  bg-white w-full  max-h-full">
    <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage"></loading>
  <form
    class="relative flex flex-col justify-center"
    data-vv-scope="create"
    @submit.prevent="handleCreate"
  >
    <div class="flex mb-10">
      <base-input
        v-model="appointments.date"
        v-validate="'required'"
        name="date"
        :mindate="new Date()"
        class="w-1/3 px-2"
        type="date"
        placeholder="Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.date')"
      />
      <template>
        <div class="relative h-12 my-2">                    
            <vue-clock-picker
                mode="24"                         
                class="cus-des-timepicker px-2 text-left"
                :onTimeChange="timeChangeHandler"
                :defaultFocused="false"                                
                placeholder="Time"
                :defaultHour="defaultHour"
                :defaultMinute="defaultMinute"
                colorPalette="dark"
                theme="material"
            >
            </vue-clock-picker>
            <!-- <p v-if="isFormSubmit && (!appointments.time || appointments.time == '')" data-v-2d998ef9="" class="ml-6 mb-2">
              The time field is required.
            </p> -->
            <input  
              type="hidden"
              :value="appointments.time"
              v-validate="'required'"
              name="time"
              class="w-1/3 px-2"
            />
            <!-- {{errors}} -->
            
            <p v-if="errors.has('create.time')" class="ml-6 mb-2">
              {{errors.first('create.time')}}
            </p>

        </div>
      </template>

      <!-- <base-input
        v-model="appointments.time"
        v-validate="'required'"
        name="time"
        class="w-1/3 px-2"
        type="time"
        placeholder="Time"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.time')"
      /> -->
      <button
        class="w-1/3 location-icon border border-purple rounded-full h-full py-3 px-6 h-12 my-2 text-left text-purple"
        :custom-classes="['w-1/4', 'border', 'border-purple']"
        name="location"
        type="button"
        @click="openLocationModel()"
        >{{changeLocationBtnTxt ? 'Location Saved' : 'Location'}}
    </button>
    <modal width="80%" height="500px" :adaptive="true" name="location_model">
      <template>
        <div class="close-btn search wrap">

            <div>
                <label class="search-btn-wrap">
                    <button type="button" class="location-close-button"><i class="material-icons" @click="closeLocationModel('close')"
                                              style="font-size: 35px;">clear</i></button>
                    <gmap-autocomplete class="w-1/3 px-2 border border-purple rounded-full h-full location-input" @place_changed="setPlace">
                    </gmap-autocomplete>
                    <button type="button" class="w-1/4 w-2btn border border-purple bg-purple-gradient text-white rounded-full h-full"
                            @click="closeLocationModel('save')">Save
                    </button>
                </label>
                <br/>
            </div>
            <br>
            <gmap-map
                    :center="center"
                    :zoom="12"
                    style="width:100%;  height: 400px;"
            >
                <gmap-marker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        @click="center=m.position"
                ></gmap-marker>
            </gmap-map>
        </div>
      </template>
    </modal>
    </div>

  </form>
    <div class="flex">
    </div>
    <div class="flex">
      <div class="w-1/2 max-h-screen overflow-hidden">
        <div class="w-full flex w-full items-center px-8">
          <div class="w-3/4">
              <h1 class="text-purple ml-2">Manage Appointments</h1>
          </div>
          <p class="text-purple text-xs w-24 text-center ml-10">
            Mark as Walk-In Appointment
          </p>
        </div>
        <div class="flex items-center justify-around px-8 mt-2" v-if="appointments.slots && appointments.slots.length > 0">
            <div class="flex items-center justify-around px-8" >
              <p class="text-purple text-lg w-24">
                Select All
              </p>
            </div>
            <div
            class="w-10 h-10 flex justify-center items-center rounded-full border border-purple cursor-pointer mt-3 check-all-margin-left"            
            :class="{ 'bg-purple': checkAll }"
            @click="checkedSlotManage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21.182"
              height="15.893"
              viewBox="0 0 21.182 15.893"
            >
              <path
                id="Path_3054"
                data-name="Path 3054"
                d="M17717.283,10215.319l6.916,6.856,10.027-11.582"
                transform="translate(-17715.162 -10208.479)"
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-width="3"
              />
            </svg>
          </div>
        </div>
        <ul class="h-full pb-24 overflow-y-scroll">
          <SlotItem
            v-for="(slot, index) in appointments.slots"
            :key="index"
            :data="slot"
            v-model="slot.is_walk"
          />
        </ul>
      </div>
      <div class="border-l border-gray-300 w-1/2 flex p-10 max-h-full flex-col ">
        <p class="py-2 pt-5 text-purple">
          Appointment Slots
        </p>
        <div class="relative w-full">
          <input
            v-model="appointments.spaces"
            type="number"
            class="w-full slots-input py-3 px-4 text-xl text-purple font-bold rounded-full border border-purple "
            @input="makeSlots"
            placeholder="0"
          >
          <span class="appointment-label w-2/3 text-center right-0 absolute text-white rounded-r-full py-3 text-xl px-4 border border-transparent">
            Appointments
          </span>
        </div>

        <p class="pt-5 text-purple">
          Appointment type
        </p>
        <base-select
          v-model="appointments.type"
          class="w-full"
          :custom-classes="['border border-purple']"
          @input="makeSlots"
        >
          <option value="1">
            Time
          </option>
          <option value="2">
            Numeric
          </option>
        </base-select>

        <p class="pt-5 text-purple">
          Appointment length
        </p>
        <base-select
          v-model="appointments.length"
          class="w-full"
          :custom-classes="['border border-purple']"
          @input="makeSlots"
        >
          <option value="3">
            3 minutes
          </option>
          <option value="5">
            5 minutes
          </option>
          <option value="10">
            10 minutes
          </option>
          <option value="20">
            20 minutes
          </option>
          <option value="30">
            30 minutes
          </option>
          <option value="40">
            40 minutes
          </option>
          <option value="50">
            50 minutes
          </option>
          <option value="60">
            60 minutes
          </option>
        </base-select>

        <p class="pt-5 text-purple">
          Start time
        </p>
        <base-input
          v-model="appointments.start"
          type="text"
          name="time"
          :time="true"
          class="w-full"
          :custom-classes="['border', 'border-purple']"
          @input="makeSlots"
        />

        <p class="pt-5 text-purple">
          End time
        </p>
        <base-input
          v-model="appointments.end"
          class="w-full"
          type="text"
          name="time"
          :time="true"
          :custom-classes="['border', 'border-purple']"
          readonly
        />

        <base-button
          class="mt-6"
          expanded
          @click="handleCreate"
        >
          Done
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueClockPicker from 'vue-clock-picker'
import { mapActions, mapState, mapGetters } from "vuex";
import SlotItem from '@/components/auditions/SlotItem.vue';
import AuditionForm from '@/components/auditions/AuditionForm.vue';
import uuid from 'uuid/v1';
import firebase from 'firebase/app';
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'

// Import Google Maps Autocomplete
import * as VueGoogleMaps from "vue2-google-maps";
import DEFINE from '../../utils/const.js';

Vue.use(VueGoogleMaps, {
  load: {
    key: DEFINE.google.key,
    libraries: DEFINE.google.libraries
  }
});

export default {
  name: 'AppointmentsModal',
  components: { SlotItem, Loading, VueClockPicker },
  props: {
    data: {
      type: Object,
      default: () => ({
        spaces: null,
        type: 1,
        length: 10,
        start: '08:00',
        end: '',
        slots: [],        
      }),
    },
  },
  data() {
    return {
      defaultHour:'0',
      defaultMinute:'0',
      appointments: {},
      selectedLocation: null,
      isLoading: false,
      isFormSubmit : false,
      form: {
        dates: [
          {
            type: 1,
          },
          {
            type: 2,
          },
        ],
        roles: [],
        appointment: undefined,
        contributors: [],
        media: [],
      },
      changeLocationBtnTxt: false,
      center: {lat: 45.508, lng: -73.587},
      markers: [],
      places: [],
      currentPlace: null,
      fullPage : true,
      checkAll : false
    };
  },
  watch: {
    data(data) {
      this.appointments = Object.assign({}, data);
    },
  },
  created() {
    this.appointments = Object.assign({}, this.data);
    this.$emit('input', this.appointments);
  },
  computed:{
    ...mapState('round', ['rounds']),
  },
  methods: {
    ...mapActions('round', ['fetch']),
    makeSlots() {
      if (!(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(this.appointments.start))) {
        return;
      }

      const spaces = parseInt(this.appointments.spaces);
      let counter = this.appointments.start;

      this.appointments.slots = [];
      let checkedCount = this.getSlotsCheckedCount(spaces);

      for (let i = 0; i < spaces; i++) {
        let isWalk = i >= checkedCount  ? true : false;
        this.appointments.slots.push({
          time: counter,
          number: this.appointments.type == 1 ? null : i + 1,
          status: false,
          is_walk: isWalk,
        });

        const pivot = counter.split(':');
        let hour = parseInt(pivot[0], 10);
        let minutes = parseInt(pivot[1], 10);
        minutes += parseInt(this.appointments.length, 10);
        if (minutes >= 60) {
          hour += 1;
          if (hour >= 24) {
            hour = '0';
          }
          minutes = minutes === 60 ? 0 : (minutes - 60);
        }

        counter = `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`;
      }

      this.appointments.end = this.appointments.slots.length ? counter : '';
    },
    getSlotsCheckedCount(spaces){
      return parseInt(spaces - Math.floor(spaces/3));
    },
    checkedSlotManage(e){
      this.checkAll = !this.checkAll;      
      this.appointments.slots.map(value=>{
        value.is_walk = this.checkAll;
        return value;
      });
    },
    openLocationModel() {
        this.$modal.show("location_model");
        this.geolocate();
    },
    closeLocationModel(type) {
        if (type == 'save') {
            this.changeLocationBtnTxt = true;
            this.$modal.hide("location_model");
        } else {
            this.changeLocationBtnTxt = false;
            this.$modal.hide("location_model");
            this.currentPlace = null;
            this.selectedLocation = null;
        }
    },
    setPlace(place) {
        this.currentPlace = place;
        this.selectedLocation = place;
        this.addMarker();
        // this.$modal.hide("location_model");
    },
    addMarker() {
        if (this.currentPlace) {
            const marker = {
                lat: this.currentPlace.geometry.location.lat(),
                lng: this.currentPlace.geometry.location.lng()
            };
            this.markers.push({position: marker});
            this.places.push(this.currentPlace);
            this.center = marker;
            this.currentPlace = null;
        }
    },
    geolocate: function () {
        navigator.geolocation.getCurrentPosition(position => {
            this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        });
    },
    timeChangeHandler : function (event){
        this.appointments.time = event.hour > 0 || event.minute > 0 ? `${event.hour}:${event.minute}` : '';
    },
    handleLocation(place) {
      this.selectedLocation = place;
    },
    async handleCreate() {
      this.isFormSubmit = true;
      let coverSnapshot = null,
          rolesSnapshots = [],
          filesSnaphosts = [];

      try {
        if (this.isLoading || !await this.$validator.validateAll('create')) {
          return;
        }
        this.isLoading = true;

        // if (!this.form.cover) {
        //   this.$toasted.error('The cover field is required.');
        //   return;
        // }

        this.appointments.appointment = this.appointments.online ? {
            "spaces": 10,
            "type": 1,
            "length": "20",
            "start": "10:00",
            "end": "18:00",
            "slots": null
        } : this.appointments.appointment;

        this.appointments.status = true;
        this.appointments.number_slots = this.appointments.spaces;
        this.appointments.round = 3;
        await this.fetch(this.$route.params.id);
        let lastRound = this.rounds.slice(-1);
        if(lastRound.length>0){
          this.appointments.round = parseInt(lastRound[0].round) + 1;
        }
        const data = Object.assign({}, this.appointments);

        if(this.selectedLocation){
          data.location = {
            latitude: this.selectedLocation.geometry.location.lat(),
            longitude: this.selectedLocation.geometry.location.lng(),
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0043
          }; 
        }
        await axios.post(`/t/appointment/${this.$route.params.id}/rounds`, data);
        this.isLoading = false;
        this.$toasted.success('The round has created successfully.');
        this.$router.push({
            name: "auditions/detail",
            params: {id: this.$route.params.id}
        });
        this.isFormSubmit = false;
        this.isLoading = false;
      } catch (e) {
        this.isFormSubmit = false;
        this.isLoading = false;
        this.$toasted.error('Audition not created, try later.');
        console.log(e);
        coverSnapshot && coverSnapshot.ref.delete();
        await Promise.all(rolesSnapshots.map(role => role.ref.delete()));
        await Promise.all(filesSnaphosts.map(file => file.ref.delete()));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rounded-2lg {
  border-radius: 1.5em;
}
.top-1\/2 {
  top: 50%;
  transform: translateY(-50%);
}
.left-1\/2 {
  left: 50%;
  transform: translateX(-50%);
}

input, input:focus, .slots-input, .slots-input:focus {
  outline: none
}
.appointment-label {
  background-image: -webkit-gradient(linear, left top, left bottom, from(#4D2545), to(#782541));
      background-image: linear-gradient(#4D2545, #782541);
}
button {
  background-image: linear-gradient(#4D2545, #782541);
}
.bubble {
	background: #fff;
  border-radius: .4em;
  box-shadow: 0px 0px 6px #B2B2B2;
}
.location-input{padding: 7px 8px;}
.w-2btn{padding: 7px 8px;margin-left: 10px;float: right;}
.search-btn-wrap {width: 100%;float: left;padding: 20px;padding-right: 20px;display: flex;align-items: center;justify-content: space-between;}
/*.close-btn.search.wrap{display: flex;align-items: center;flex-wrap: wrap;}*/
.vue-map-container{float: left;}
.location-icon {background-image: url('../../../public/images/icons/location-icon.svg');background-repeat: no-repeat;background-position: right 12px top 14px;}
.location-close-button {
  background: transparent;
}
.check-all-margin-left{
  margin-right: -58px !important;
}
</style>
