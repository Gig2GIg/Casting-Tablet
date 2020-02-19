<template>
  <div class="modal-container bg-white w-5/6 rounded-2lg left-1/2 absolute top-1/2 shadow-2xl overflow-hidden max-h-full">
    <svg
      class="absolute left-0 ml-5 mt-5 cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="16.16"
      height="16.165"
      viewBox="0 0 16.16 16.165"
      @click="$emit('close')"
    >
      <path
        id="Path_31"
        data-name="Path 31"
        d="M11.609,9.822,17.532,3.9a1.264,1.264,0,0,0-1.787-1.787L9.822,8.035,3.9,2.112A1.264,1.264,0,0,0,2.112,3.9L8.035,9.822,2.112,15.745A1.268,1.268,0,0,0,3,17.907a1.2,1.2,0,0,0,.885-.374l5.94-5.923,5.923,5.923a1.266,1.266,0,0,0,.885.374,1.2,1.2,0,0,0,.885-.374,1.263,1.263,0,0,0,0-1.787Z"
        transform="translate(-1.742 -1.742)"
        fill="#4d2545"
      />
    </svg>

    <div class="flex">
      <div class="w-1/2 max-h-screen overflow-hidden pt-16">
        <div class="w-full flex w-full items-center px-8">
          <div class="w-3/4" />
          <p class="text-purple text-xs w-24 text-center ml-2">
            Mark as Walk-In Appointment
          </p>
        </div>
        <ul class="h-full pb-24 overflow-y-scroll">
          <SlotItem
            v-for="(slot, index) in appointments.slots"
            :key="index"
            v-model="slot.is_walk"
            :data="slot"
            :is-readonly="true"  
          />
        </ul>
      </div>
      <div class="border-l border-gray-300 w-1/2 flex p-10 max-h-full flex-col justify-center items-center">
        <p class="py-2 pt-5 text-purple">
          Appointment Slots
        </p>
        <div class="relative w-full">
          <input
            v-model="appointments.spaces"
            type="number"
            placeholder="0"
            class="w-full slots-input py-3 h-57 px-4 text-xl text-purple font-bold rounded-full border border-purple "
            @input="makeSlots"
            readonly
          >
          <span class="appointment-label top-0 w-2/3 text-center right-0 absolute text-white rounded-r-full py-3 text-xl px-4 border border-transparent">
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
          :is-readonly="true"  
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
          :is-readonly="true"  
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
          type="time"
          name="time"
          class="w-full"
          :custom-classes="['border', 'border-purple']"
          @input="makeSlots"
          readonly
        />

        <p class="pt-5 text-purple">
          End time
        </p>
        <base-input
          v-model="appointments.end"
          class="w-full"
          type="time"
          name="time"
          :custom-classes="['border', 'border-purple']"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script>
import SlotItem from './SlotItem.vue';

export default {
  name: 'AppointmentsModal',
  components: { SlotItem },
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
    };
  },
  created() {
    this.appointments = Object.assign({}, this.data);
    this.appointments.status = true;
  },
  methods: {
    makeSlots() {
      if (!(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(this.appointments.start))) {
        return;
      }

      // const spaces = parseInt(this.appointments.spaces);
      // let counter = this.appointments.start;

      // this.appointments.slots = [];

      // for (let i = 0; i < spaces; i++) {
      //   this.appointments.slots.push({
      //     time: counter,
      //     number: this.appointments.type == 1 ? null : i + 1,
      //     status: false,
      //     is_walk: false,
      //   });

      //   const pivot = counter.split(':');
      //   let hour = parseInt(pivot[0], 10);
      //   let minutes = parseInt(pivot[1], 10);
      //   minutes += parseInt(this.appointments.length, 10);
      //   if (minutes >= 60) {
      //     hour += 1;
      //     if (hour >= 24) {
      //       hour = '0';
      //     }
      //     minutes = minutes === 60 ? 0 : (minutes - 60);
      //   }

      //   counter = `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`;
      // }

      // this.appointments.end = this.appointments.slots.length ? counter : '';
    },

    handleDone() {
      if (!parseInt(this.appointments.spaces)) {
        return;
      }

      this.$emit('change', this.appointments);
      this.$emit('close');
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
.h-57{
  height: 57px;
}
</style>
