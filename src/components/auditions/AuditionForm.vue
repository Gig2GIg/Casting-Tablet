<!-- eslint-disable max-len -->
<template>
  <form class="relative">
    <div class="flex">
      <base-input
        v-model="form.title"
        v-validate="'required|max:255'"
        name="title"
        class="w-2/3 px-2"
        placeholder="Title"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('title')"
      />
      <!-- <base-checkbox
        class="w-1/3 px-2"
        :custom-classes="['border', 'border-purple']"
        name="title"
      >
        Online submition
      </base-checkbox> -->
    </div>
    <div class="flex">
      <base-input
        v-model="form.date"
        v-validate="'required'"
        name="date"
        class="w-1/3 px-2"
        type="date"
        placeholder="Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('date')"
      />
      <base-input
        v-model="form.time"
        v-validate="'required'"
        name="time"
        class="w-1/3 px-2"
        type="number"
        placeholder="Time"
        :time="true"
        :custom-classes="['w-1/4', 'border', 'border-purple']"
        :message="errors.first('time')"
      />
      <base-input
        v-model="form.location"
        v-validate="'required'"
        name="location"
        class="w-1/3 px-2"
        type="location"
        :custom-classes="['w-1/4', 'border', 'border-purple']"
        :message="errors.first('location')"
      />
    </div>

    <p class="px-5 text-purple font-medium py-8 pb-6">
      Production Information
    </p>
    <div class="flex w-full">
      <base-input
        v-model="form.description"
        v-validate="'required|max:500'"
        name="description"
        class="px-2 py-2 w-2/3"
        type="textarea"
        placeholder="Description"
        :custom-classes="['border', 'border-purple', 'mt-0 mb-0']"
        :message="errors.first('description')"
      />
      <div class="px-2 py-2 w-1/3">
        <vue2Dropzone
          id="dropzone"
          class="flex rounded-large h-40 items-center border border-purple cursor pointer justify-center bg-grey-500"
          :options="dropzoneOptions"
        />
      </div>
    </div>
    <div class="flex w-full">
      <base-input
        v-model="form.personal_information"
        v-validate="'required|max:500'"
        name="personal_information"
        class="px-2 w-full h-40"
        type="textarea"
        placeholder="Personnel Information"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('personal_information')"
        data-vv-as="personnel information"
      />
    </div>
    <div class="flex w-full">
      <base-input
        v-model="form.additional_info"
        v-validate="'required|max:500'"
        name="additional_info"
        class="px-2 w-full h-40"
        type="textarea"
        placeholder="Additional Information"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('additional_info')"
        data-vv-as="additional information"
      />
    </div>

    <p class="px-5 text-purple font-medium py-8 pb-6">
      Contract Information
    </p>
    <div class="flex w-full">
      <base-input
        v-model="form.dates[0].from"
        v-validate="'required'"
        name="contract_start_date"
        class="w-1/2 px-2"
        type="date"
        placeholder="Contract Start Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('contract_start_date')"
        data-vv-as="start date"
      />
      <base-input
        v-model="form.dates[0].to"
        v-validate="'required'"
        name="contract_end_date"
        class="w-1/2 px-2"
        type="date"
        placeholder="Contract End Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('contract_end_date')"
        data-vv-as="end date"
      />
    </div>
    <div class="flex w-full">
      <base-input
        v-model="form.dates[1].from"
        v-validate="'required'"
        name="rehearsal_start_date"
        class="w-1/2 px-2"
        type="date"
        placeholder="Rehearsal Start Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('rehearsal_start_date')"
        data-vv-as="start date"
      />
      <base-input
        v-model="form.dates[1].from"
        v-validate="'required'"
        name="rehearsal_end_date"
        class="w-1/2 px-2"
        type="date"
        placeholder="Rehearsal End Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('rehearsal_end_date')"
        data-vv-as="end date"
      />
    </div>

    <p class="px-5 text-purple font-medium py-8 pb-6">
      Contact Information
    </p>
    <div class="flex">
      <base-input
        v-model="form.url"
        v-validate="'required|url'"
        name="url"
        class="w-full px-2"
        placeholder="Audition URL"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('url')"
      />
    </div>
    <div class="flex">
      <base-input
        v-model="form.phone"
        v-validate="'required|integer|max:255'"
        name="phone"
        class="w-1/3 px-2"
        placeholder="Phone"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('phone')"
      />
      <base-input
        v-model="form.email"
        v-validate="'required|email'"
        name="email"
        class="w-1/3 px-2"
        placeholder="Email"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('email')"
      />
      <base-input
        v-model="form.other_info"
        v-validate="'required|max:255'"
        name="other_info"
        class="w-1/3 px-2"
        placeholder="Other"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('other_info')"
        data-vv-as="other information"
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
            v-for="union in union_status"
            :key="union.key"
            class="py-2 px-4 border border-purple uppercase mr-2 rounded-full cursor-pointer"
            :class="[union.selected ? 'bg-purple text-white' : 'bg-white text-purple']"
            @click="setTags($event, 'union_status', false)"
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
            :key="contract_type.key"
            class="py-2 px-4 uppercase border border-orange-500 mr-2 rounded-full cursor-pointer"
            :class="[contract_type.selected ? 'bg-orange-500 text-white' : 'bg-white text-orange-500']"
            @click="setTags($event, 'contract_types', false)"
          >
            {{ contract_type.name }}
          </div>
        </div>
        <p
          class="px-4 text-purple pt-4 pb-2"
        >
          Production Type
        </p>
        <div class="flex flex-wrap px-4">
          <div
            v-for="production_type in production_types"
            :key="production_type.key"
            class="py-2 px-4 uppercase border border-pink-800 my-2 mr-2 rounded-full cursor-pointer"
            :class="[production_type.selected ? 'bg-pink-800 text-white' : 'bg-white text-pink-800']"
            @click="setTags($event, 'production_types', true)"
          >
            {{ production_type.name }}
          </div>
        </div>
      </div>
      <div class="managers w-3/5 flex flex-col items-end">
        <button
          class="w-2/3 mt-4 py-3 px-4 border-4 border-purple text-purple rounded-full"
          @click.prevent="manageAppointments = true"
        >
          Manage appointments
        </button>
        <button
          class="w-2/3 mt-4 py-3 px-4 border-4 border-purple text-purple rounded-full"
        >
          Edit Roles
        </button>
        <button
          class="w-2/3 mt-4 py-3 px-4 border-4 border-purple text-purple rounded-full"
        >
          Manage Documents
        </button>
      </div>
    </div>
    <AppointmentsModal
      v-if="manageAppointments"
      :data="form.slots"
      @modalexit="manageAppointments = false"
    />
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
        dates: [
          {
            type: 1,
          },
          {
            type: 2,
          },
        ],
        slots: {
          spaces: null,
          type: 1,
          length: 10,
          start: '8:00',
          end: '',
          slots: [],
        },
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
          key: 'voiceover', name: 'VoiceOver', selected: false,
        },
        {
          key: 'commercials', name: 'Commercials', selected: false,
        },
        {
          key: 'performing arts', name: 'Performing Arts', selected: false,
        },
        {
          key: 'modeling', name: 'Modeling', selected: false,
        },
        {
          key: 'tv & video', name: 'TV & Video', selected: false,
        },
      ],
    };
  },
  methods: {
    handleCreate() {
      try {

        this.form.union = this.union_status.find(x => x.selected);
        this.form.contract = this.contract_types.find(x => x.selected);
        this.form.production = this.production_types.filter(x => x.selected).map(x => x.key).join(', ');

      } catch (e) {

      }
    },
    setTags({ target }, type, multiple = false) {
      const text = target.textContent.trim();
      const itemSelected = this[type].find(item => item.name === text);
      if (multiple) {
        if (itemSelected.selected) {
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
