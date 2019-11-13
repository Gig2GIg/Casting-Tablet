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
      <base-input
        v-model="appointments.time"
        v-validate="'required'"
        name="time"
        class="w-1/3 px-2"
        type="time"
        placeholder="Time"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.time')"
      />
      <base-input
        v-model="appointments.location"
        v-validate="'required'"
        name="location"
        class="w-1/3 px-2"
        type="location"
        placeholder="Select a ubication"
        :custom-classes="['w-1/4', 'border', 'border-purple']"
        :message="errors.first('create.location')"
        @place="handleLocation"
      />
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
import { mapActions, mapState, mapGetters } from "vuex";
import SlotItem from '@/components/auditions/SlotItem.vue';
import AuditionForm from '@/components/auditions/AuditionForm.vue';
import uuid from 'uuid/v1';
import firebase from 'firebase/app';
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  name: 'AppointmentsModal',
  components: { SlotItem, Loading },
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
      appointments: {},
      selectedLocation: null,
      isLoading: false,
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

      for (let i = 0; i < spaces; i++) {
        this.appointments.slots.push({
          time: this.appointments.type == 1 ? counter : null,
          number: this.appointments.type == 1 ? null : i + 1,
          status: false,
          is_walk: false,
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
    handleLocation(place) {
      this.selectedLocation = place;
    },
    async handleCreate() {
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
      } catch (e) {
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
</style>
