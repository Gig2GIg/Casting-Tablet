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
        <div class="flex items-center justify-around px-8" v-if="appointments.slots && appointments.slots.length > 0">
            <div class="flex items-center justify-around px-8" >
              <p class="text-purple text-lg w-24">
                Select All
              </p>
            </div>
            <div
            class="w-10 h-10 flex justify-center items-center rounded-full border border-purple cursor-pointer ml-4 mt-3"            
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
            v-model="slot.is_walk"
            :data="slot"
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
          >
          <span class="appointment-label w-2/3 top-0 text-center right-0 absolute text-white rounded-r-full py-3 text-xl px-4 border border-transparent">
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
          type="time"
          name="time"
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
          type="time"
          name="time"
          :custom-classes="['border', 'border-purple']"
          readonly
        />

        <base-button
          class="mt-6"
          expanded
          @click="handleDone"
        >
          Done
        </base-button>
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
      checkAll : false
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
          is_walk: isWalk
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
</style>
