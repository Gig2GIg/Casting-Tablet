<template>
  <div class="modal-container bg-white w-5/6 rounded-2lg left-1/2 absolute top-1/2 shadow-2xl overflow-hidden max-h-full">
    <div class="flex">
      <div class="w-1/2 max-h-screen overflow-hidden pt-6">
        <div class="w-full px-8 flex justify-between w-full items-center">
          <p
            class="text-3xl cursor-pointer mb-10 font-bold leading-none text-purple"
            @click="$emit('modalexit')"
          >
            x
          </p>
          <p
            v-if="appointments.slots.length"
            class="text-purple text-xs w-1/3 text-center self-end"
          >
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
      <div class="border-l border-gray-300 w-1/2 flex p-10 max-h-full flex-col justify-center items-center">
        <p class="py-2 pt-5 text-purple">
          Appointment Slots
        </p>
        <div class="relative w-full">
          <input
            v-model="appointments.spaces"
            type="number"
            class="w-full slots-input py-3 px-4 text-xl text-purple font-bold rounded-full border border-purple "
            @input="makeSlots"
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
            Number
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
  methods: {
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

    handleDone() {
      if (!parseInt(this.appointments.spaces)) {
        return;
      }

      this.$emit('change', this.appointments);
      this.$emit('modalexit');
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
