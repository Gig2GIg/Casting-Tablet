<template>
  <div class="modal-container bg-white w-5/6 rounded-2lg left-1/2 absolute top-1/2 shadow-2xl overflow-hidden max-h-full">
    <div class="flex">
      <div class="w-1/2 max-h-screen overflow-hidden pt-6">
        <div class="w-full px-10 flex justify-between w-full items-center" >
          <p @click="$emit('modalexit')" class="text-3xl cursor-pointer pb-10 font-bold leading-none text-purple">x</p>
          <p class="text-purple text-xs w-1/3 text-center self-end" v-if="appointments.slots.length">Mark as Walk-In Appointment</p>
        </div>
        <ul class="h-full pb-24 overflow-y-scroll">
          <li v-for="(slot, index) in appointments.slots" :key="index">
            <div class="flex justify-around px-8">
              <div class="w-3/4 relative">
                <input type="text" readonly class="w-full py-2 pl-20 rounded-full border border-purple my-2">
                <span class="absolute text-purple left-0 py-2 px-4 my-2 border border-purple rounded-l-full">{{ appointments.type == 1 ? slot.time : slot.number }}</span>
              </div>
              <div class="w-1/4 flex justify-center items-center">
                <input type="checkbox" v-model="slot.is_walk">
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="border-l border-gray-300 w-1/2 flex p-10 max-h-full flex-col justify-center items-center">
        <p class="py-3 pt-5 text-purple">Appointment Slots</p>
        <div class="relative w-full">
          <input type="number" v-model="appointments.spaces" @input="makeSlots" class="w-full slots-input py-3 px-4 text-xl text-purple font-bold rounded-full border border-purple ">
          <span class="appointment-label w-2/3 text-center right-0 absolute text-white rounded-r-full py-3 text-xl px-4 border border-transparent">
            Appointments
          </span>
        </div>
        <p class="py-4 pt-5 text-purple" >Appointment type</p>
        <select v-model="appointments.type" @change="makeSlots" class="w-full text-purple px-3 py-4 border border-purple rounded-full bg-transparent">
          <option value="1">Time</option>
          <option value="2">Number</option>
        </select>
        <p class="py-4 pt-5 text-purple">Appointment length</p>
        <select v-model="appointments.length" @change="makeSlots" class="w-full text-purple px-3 py-4 border border-purple rounded-full bg-transparent">
          <option value="10">10 minutes</option>
          <option value="20">20 minutes</option>
          <option value="30">30 minutes</option>
          <option value="40">40 minutes</option>
          <option value="50">50 minutes</option>
          <option value="60">60 minutes</option>
        </select>
        <p class="py-2 pt-5 text-purple">Start time</p>
        <base-input
          v-model="appointments.start"
          @input="makeSlots"
          class="py-2 h-full max-h-full w-full"
          type="text"
          name="time"
          :time="true"
          :custom-classes="['py-1', 'w-full', 'border', 'border-purple']"
        />
        <p class="py-2 pt-5 text-purple">End time</p>
        <base-input
          v-model="appointments.end"
          class="py-2 h-full max-h-full w-full"
          type="text"
          name="time"
          :time="true"
          :custom-classes="['w-full', 'border', 'border-purple', 'py-1']"
        />

        <button class="text-white py-3 mt-5 w-2/3 px-4 border border-purple rounded-full">Done</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppointmentsModal',
    props: {
      data: {
        type: Object,
        default: () => ({
          spaces: null,
          type: 1,
          length: 10,
          start: '8:00',
          end: '',
          slots: []
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
      this.$emit('input', this.appointments);
    },
    methods: {
      makeSlots() {
        if(!this.appointments.spaces) {
          this.appointments.slots = [];
        }

        if(this.appointments.type == 1) {
          const validate = /([0-1][0-9]|2[0-3]):[0-5][0-9]/;
          if((validate).test(this.appointments.start)) {
            return;
          }
        }
        if(this.appointments.spaces > 0 && (this.appointments.type == 1 ? this.appointments.start : true)) {

          this.appointments.slots = [];
          let counter = this.appointments.type == 1 ? this.appointments.start : 0;
          for(let i = 0; i <= this.appointments.spaces; i++) {
            this.appointments.slots.push({
              time: this.appointments.type == 1 ? counter : null,
              number: this.appointments.type == 1 ? null : counter,
              status: false,
              is_walk: false,
            });

            if(this.appointments.type == 1) {
              let pivot = counter.split(':');
              let hour = parseInt(pivot[0], 10);
              let minutes = parseInt(pivot[1], 10);
              minutes = minutes + parseInt(this.appointments.length, 10);
              if(minutes >= 60) {
                hour += 1;
                if(hour >= 24) {
                  hour = '0'
                }
                minutes = minutes === 60 ? 0 : (minutes - 60);
              }

              counter = `${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0'  + minutes : minutes }`;

            } else {
              counter += 1;
            }
          }

          if(this.appointments.slots && this.appointments.type == 1) {
            this.appointments.end = this.appointments.slots[this.appointments.slots.length - 1].time;
          }
        }
      }
    },
    watch: {
      data(data) {
        this.appointments = Object.assign({}, data)
      }
    },
  }
</script>

<style lang="scss" scoped>
.rounded-2lg {
  border-radius: 1.5em;
}
.top-1\/2 {
  top: 50%;
  transform: translateY(-50%);
}
.top-1\/2 {
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
