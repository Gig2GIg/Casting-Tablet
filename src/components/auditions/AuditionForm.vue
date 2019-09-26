<!-- eslint-disable max-len -->
<template>
  <form class="relative">
    <div class="flex">
      <base-input
        class="w-2/3 px-4 py-3"
        type="text"
        placeholder="Title"
        name="title"
        :custom-classes="['border', 'border-purple']"
      />
      <base-input
        class="w-1/3 px-4 py-3"
        type="text"
        name="title"
        value="Online submition"
        :custom-classes="['w-1/4', 'border', 'border-purple']"
      />
    </div>
    <div class="flex">
      <base-input
        class="w-1/3 px-4 py-3"
        type="date"
        placeholder="Date"
        name="date"
        :custom-classes="['border', 'border-purple']"
      />
      <base-input
        class="w-1/3 px-4 py-3"
        type="number"
        placeholder="Time"
        :time="true"
        name="time"
        :custom-classes="['w-1/4', 'border', 'border-purple']"
      />
      <base-input
        class="w-1/3 px-4 py-3"
        type="location"
        name="location"
        :custom-classes="['w-1/4', 'border', 'border-purple']"
      />
    </div>
    <p
      class="px-5 text-purple py-8"
    >
      Personal information
    </p>
    <div class="flex w-full">
      <div class="px-4 py-3 w-2/3">
        <textarea
          name="description"
          placeholder="Description"
          class="p-5 rounded-2lg w-full h-40 border border-purple placeholder-purple"
        />
      </div>
      <div class="px-4 py-3 w-1/3">
        <vue2Dropzone
          id="dropzone"
          class="flex rounded-2lg h-40 items-center border border-purple cursor pointer justify-center bg-grey-500"
          :options="dropzoneOptions"
        />
      </div>
    </div>
    <div class="flex w-full">
      <div class="px-4 py-3 w-full">
        <textarea
          name="personel_info"
          placeholder="Personnel Information"
          class="p-5 rounded-2lg w-full h-40 border border-purple placeholder-purple"
        />
      </div>
    </div>
    <div class="flex w-full">
      <div class="px-4 py-3 w-full">
        <textarea
          name="additional_info"
          placeholder="Additional information"
          class="p-5 rounded-2lg w-full h-40 border border-purple placeholder-purple"
        />
      </div>
    </div>
    <p
      class="px-5 text-purple py-8"
    >
      Contract information
    </p>
    <div class="flex w-full">
      <base-input
        class="w-1/2 px-4 py-3"
        type="date"
        placeholder="Contract Start Date"
        name="start_date"
        :custom-classes="['border', 'border-purple']"
      />
      <base-input
        class="w-1/2 px-4 py-3"
        type="date"
        placeholder="Contract End Date"
        name="end_date"
        :custom-classes="['border', 'border-purple']"
      />
    </div>
    <div class="flex w-full">
      <base-input
        class="w-1/2 px-4 py-3"
        type="date"
        placeholder="Rehearsal Start Date"
        name="rehearsal_start_date"
        :custom-classes="['border', 'border-purple']"
      />
      <base-input
        class="w-1/2 px-4 py-3"
        type="date"
        placeholder="Rehearsal End Date"
        name="rehearsal_end_date"
        :custom-classes="['border', 'border-purple']"
      />
    </div>
    <div class="flex w-1/2">
      <div class="px-4 my-4 w-full">
        <select class="w-full text-purple px-4 py-3 border border-purple rounded-full bg-transparent">
          <option
            class="text-purple"
            disabled
            selected
            hidden
          >
            Contract Type</option>
          <option value="unpaid">Any</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>
    </div>
    <p
      class="px-5 text-purple py-8"
    >
      Contact Information
    </p>
    <div class="flex">
      <base-input
        class="w-full px-4 py-3"
        type="text"
        placeholder="Audition URL"
        name="url"
        :custom-classes="['border', 'border-purple']"
      />
    </div>
    <div class="flex">
      <base-input
        class="w-1/3 px-4 py-3"
        type="text"
        placeholder="Phone"
        name="phone"
        :custom-classes="['border', 'border-purple']"
      />
      <base-input
        class="w-1/3 px-4 py-3"
        type="text"
        placeholder="Email"
        name="email"
        :custom-classes="['border', 'border-purple']"
      />
      <base-input
        class="w-1/3 px-4 py-3"
        type="text"
        placeholder="other"
        name="other"
        :custom-classes="['border', 'border-purple']"
      />
    </div>
    <div class="flex pt-12">
      <div class="tags w-2/5">
        <p
          class="px-4 text-purple py-4"
        >
          Union Status
        </p>
        <div class="flex px-4">
          <div
            @click="setTags($event, 'union_status', false)"
            v-for="union in union_status"
            :key="union.key"
            class="py-2 px-4 border border-purple uppercase mr-2 rounded-full cursor-pointer"
            :class="[union.selected ? 'bg-purple text-white' : 'bg-white text-purple']"
          >
            {{ union.name }}
          </div>
        </div>

        <p
          class="px-5 text-purple py-4"
        >
          Contract type
        </p>
        <div class="flex px-4">
          <div
            v-for="contract_type in contract_types"
            @click="setTags($event, 'contract_types', false)"
            :key="contract_type.key"
            class="py-2 px-4 uppercase border border-orange-500 mr-2 rounded-full cursor-pointer"
            :class="[contract_type.selected ? 'bg-orange-500 text-white' : 'bg-white text-orange-500']"
          >
            {{ contract_type.name }}
          </div>
        </div>
        <p
          class="px-4 text-purple py-4"
        >
          Production Type
        </p>
        <div class="flex flex-wrap px-4">
          <div
            v-for="production_type in production_types"
             @click="setTags($event, 'production_types', true)"
            :key="production_type.key"
            class="py-2 px-4 uppercase border border-pink-800 my-2 mr-2 rounded-full cursor-pointer"
            :class="[production_type.selected ? 'bg-pink-800 text-white' : 'bg-white text-pink-800']"
          >
            {{ production_type.name }}
          </div>
        </div>
      </div>
      <div class="managers w-3/5 flex flex-col items-end">
        <button
          @click.prevent="manageAppointments = true"
          class="w-2/3 mt-4 py-3 px-4 border-4 border-purple text-purple rounded-full"
        >Manage appointments</button>
        <button
          class="w-2/3 mt-4 py-3 px-4 border-4 border-purple text-purple rounded-full"
        >Edit Roles</button>
        <button
          class="w-2/3 mt-4 py-3 px-4 border-4 border-purple text-purple rounded-full"
        >Manage Documents</button>
      </div>
    </div>
    <AppointmentsModal :data="form.slots" v-if="manageAppointments" @modalexit="manageAppointments = false"/>
  </form>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import AppointmentsModal from './AppointmentsModal.vue';

export default {
  name: 'AuditionForm',
  components: { vue2Dropzone, AppointmentsModal },
  data() {
    return {
      manageAppointments: false,
      form: {
        title: '',
        slots: {
          spaces: null,
          type: 1,
          length: 10,
          start: '8:00',
          end: '',
          slots: []
        }
      },
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailHeight: 150,
        maxFilesize: 15,
        maxFiles: 1,
        clickable: true,
        uploadMultiple: false,
        addRemoveLinks: true,
        headers: { 'My-Awesome-Header': 'header value' },
        // eslint-disable-next-line
        dictDefaultMessage: `<div class="flex flex-col flex-no-wrap justify-between"><p class="pb-8 text-purple">Cover photo</p> <img src="/images/icons/file.svg"/></div>`,
      },
      union_status: [
        {
          value: 'any', name: 'Any', selected: false,
        },
        {
          value: 'union', name: 'Union', selected: true,
        },
        {
          value: 'nounion', name: 'Nounion', selected: false,
        },
      ],
      contract_types: [
        {
          key: 'any', name: 'Any', selected: false,
        },
        {
          key: 'paid', name: 'Paid', selected: true,
        },
        {
          key: 'unpaid', name: 'Unpaid', selected: false,
        },
      ],
      production_types: [
        {
          key: 'theater', name: 'Theater', selected: true,
        },
        {
          key: 'film', name: 'Film', selected: false,
        },
        {
          key: 'vo_ceover', name: 'Vo Ceover', selected: false,
        },
        {
          key: 'commercials', name: 'Commercials', selected: false,
        },
        {
          key: 'performing_arts', name: 'Performing Arts', selected: false,
        },
        {
          key: 'modeling', name: 'Modeling Arts', selected: false,
        },
        {
          key: 'tv_video', name: 'TV & Video', selected: false,
        },
      ],
    };
  },
  methods: {
    setTags(e, type, multiple = false){
      const { target } = e;
      const text = target.textContent.trim();
      const itemSelected = this[type].find(item => item.name === text);
      if(multiple) {
        if(itemSelected.selected) {
          itemSelected.selected = false;
          return;
        }
        itemSelected.selected = true;
        return;
      }

      this[type].forEach(item => item.selected = false);
      itemSelected.selected = true;
    },
  },
};
</script>

<style scoped>
textarea, textarea:focus, select, select:focus {
  outline: none;
}
.rounded-2lg {
  border-radius: 1.5em;
}
</style>
