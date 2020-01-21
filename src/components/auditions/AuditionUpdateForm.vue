<!-- eslint-disable max-len -->
<template>
  <form class="relative" data-vv-scope="create" @submit.prevent="handleCreate">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <div class="flex flex-row-reverse mb-4 px-2">
      <div
        class="relative flex items-center text-purple cursor-pointer"
        @click="manageInvitations = !manageInvitations"
      >
        <img src="/images/icons/person.png" alt="Icon" class="h-4 mr-2" />
        <span class="select-none">Add Invitations</span>
      </div>
    </div>

    <form
      v-if="manageInvitations"
      class="bubble absolute right-0 w-64 -mr-12 z-50 p-3"
      data-vv-scope="invitation"
      @submit.prevent="handleInvitation"
    >
      <base-button
        v-if="!invitation.adding"
        class="pt-2 pb-2"
        border-classes="rounded-full border border-purple"
        color="bg-white"
        :hover="['bg-purple', 'text-white']"
        text="text-purple"
        expanded
        @click="invitation.adding = true"
      >Add Contributor</base-button>

      <div v-show="invitation.adding">
        <base-input
          v-model="invitation.email"
          v-validate="'required|email'"
          name="email"
          placeholder="Email"
          :custom-classes="['border', 'border-purple']"
          :message="errors.first('invitation.email')"
          expanded
        />

        <base-button class="pt-2 pb-2" type="submit" expanded>Send</base-button>
      </div>

      <contributor-item
        v-for="contributor in form.contributors"
        :key="contributor.email"
        class="-mx-3"
        :contributor="contributor"
        @destroy="handleDeleteContributor"
      />
    </form>

    <div class="flex">
      <base-input
        v-model="form.title"
        v-validate="'required|max:255'"
        name="title"
        class="w-2/3 px-2"
        placeholder="Title"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.title')"
        expanded
      />
      <base-checkbox
        class="w-1/3 px-2"
        v-model="form.online"
        :custom-classes="['border', 'border-purple']"
        name="title"
        :value="form.online"
      >Online Submission</base-checkbox>
    </div>
    <div class="flex" v-if="!form.online">
      <base-input
        v-model="form.date"
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
                  v-bind='{ defaultTimeHour, defaultTimeMinute }'
                  :defaultHour="defaultTimeHour"
                  :defaultMinute="defaultTimeMinute"                     
                  class="cus-des-timepicker px-2 text-left"
                  :onTimeChange="timeChangeHandler"
                  :defaultFocused="false"
                  v-validate="'required'"
                  :message="errors.first('create.time')"
                  placeholder="Time"
                  colorPalette="dark"
                  theme="material"
              >
              </vue-clock-picker>
          </div>
      </template>
      <!-- <base-input
        v-model="form.time"
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
              v-validate="'required'"
              :custom-classes="['border', 'border-purple']"
              name="location"
              type="button"
              :message="errors.first('create.location')"
              @click="openLocationModel()"
      >{{changeLocationBtnTxt ? 'Location Saved' : 'Location'}}
      </button>
      <modal width="80%" height="500px" :adaptive="true" name="location_model">
        <template>
          <div class="close-btn search wrap">

            <div>
              <label class="search-btn-wrap">
                <button type="button"><i class="material-icons" @click="closeLocationModel('close')"
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
      <!--<base-input
        v-model="form.location"
        name="location"
        class="w-1/3 px-2"
        placeholder="Select a ubication"
        type="location"
        :custom-classes="['w-1/4', 'border', 'border-purple']"
        :message="errors.first('create.location')"
        @place="handleLocation"
      />-->
    </div>

    <p class="px-5 text-purple font-medium py-8 pb-6">Production Information</p>
    <div class="flex w-full">
      <base-input
        v-model="form.description"
        v-validate="'required|max:500'"
        name="description"
        class="px-2 py-2 w-2/3"
        type="textarea"
        placeholder="Description"
        :custom-classes="['border', 'border-purple', 'mt-0', { 'mb-0': !errors.has('create.description') }]"
        :message="errors.first('create.description')"
      />
      <div class="px-2 py-2 w-1/3">
        <div
          class="flex rounded-large h-40 items-center border border-purple cursor-pointer justify-center bg-grey-500 overflow-hidden"
          @click="$refs.coverFile.click()"
        >
          <div v-if="!previewCover" class="flex flex-col flex-no-wrap justify-between">
            <p class="pb-6 text-purple">Cover photo</p>
            <img src="/images/icons/file.svg" />
          </div>

          <img v-else :src="previewCover" alt="Cover" class="w-full h-full object-cover" />
        </div>

        <input
          ref="coverFile"
          accept=".png, .jpg, .jpeg"
          type="file"
          hidden
          @change="handleCoverFile"
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
        placeholder="Personal Information"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.personal_information')"
        data-vv-as="Personal information"
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
        :message="errors.first('create.additional_info')"
        data-vv-as="additional information"
      />
    </div>

    <p class="px-5 text-purple font-medium py-8 pb-6">Contract Information</p>
    <div class="flex w-full">
      <base-input
        v-model="form.dates[0].from"
        v-validate="'required'"
        name="contract_start_date"
        class="w-1/2 px-2"
        type="date"
        :mindate="new Date()"
        placeholder="Contract Start Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.contract_start_date')"
        data-vv-as="start date"
      />
      <base-input
        v-model="form.dates[0].to"
        v-validate="'required'"
        name="contract_end_date"
        class="w-1/2 px-2"
        type="date"
        :mindate="form.dates[0].from"
        placeholder="Contract End Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.contract_end_date')"
        data-vv-as="end date"
      />
    </div>
    <div class="flex w-full">
      <base-input
        v-model="form.dates[1].from"
        :mindate="new Date()"
        v-validate="'required'"
        name="rehearsal_start_date"
        class="w-1/2 px-2"
        type="date"
        placeholder="Rehearsal Start Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.rehearsal_start_date')"
        data-vv-as="start date"
      />
      <base-input
        v-model="form.dates[1].to"
        :mindate="form.dates[1].from"
        v-validate="'required'"
        name="rehearsal_end_date"
        class="w-1/2 px-2"
        type="date"
        placeholder="Rehearsal End Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.rehearsal_end_date')"
        data-vv-as="end date"
      />
    </div>

    <p class="px-5 text-purple font-medium py-8 pb-6">Contact Information</p>
    <div class="flex">
      <base-input
        v-model="form.url"
        v-validate="'required|url'"
        name="url"
        class="w-full px-2"
        placeholder="Audition URL"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.url')"
      />
    </div>
    <div class="flex">
      <base-input
        v-model="form.phone"
        v-validate="'required|max:255'"
        name="phone"
        v-mask="'(###) ###-####'"
        class="w-1/3 px-2"
        placeholder="Phone"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.phone')"
      />
      <base-input
        v-model="form.email"
        v-validate="'required|email'"
        name="email"
        class="w-1/3 px-2"
        placeholder="Email"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.email')"
      />
      <base-input
        v-model="form.other_info"
        v-validate="'required|max:255'"
        name="other_info"
        class="w-1/3 px-2"
        placeholder="Other"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.other_info')"
        data-vv-as="other information"
      />
    </div>

    <div class="flex pt-12">
      <div class="tags w-2/5">
        <p class="px-4 text-purple py-4">Union Status</p>
        <div class="flex px-4">
          <div
            v-for="union in union_status"
            :key="union.key"
            class="py-2 px-4 border border-purple uppercase mr-2 rounded-full cursor-pointer"
            :class="[union.selected ? 'bg-purple text-white' : 'bg-white text-purple']"
            @click="setTags($event, 'union_status', false)"
          >{{ union.name }}</div>
        </div>

        <p class="px-5 text-purple py-4">Contract type</p>
        <div class="flex px-4">
          <div
            v-for="contract_type in contract_types"
            :key="contract_type.key"
            class="py-2 px-4 uppercase border border-orange-500 mr-2 rounded-full cursor-pointer"
            :class="[contract_type.selected ? 'bg-orange-500 text-white' : 'bg-white text-orange-500']"
            @click="setTags($event, 'contract_types', false)"
          >{{ contract_type.name }}</div>
        </div>
        <p class="px-4 text-purple pt-4 pb-2">Production Type</p>
        <div class="flex flex-wrap px-4">
          <div
            v-for="production_type in production_types"
            :key="production_type.key"
            class="py-2 px-4 uppercase border border-pink-800 my-2 mr-2 rounded-full cursor-pointer"
            :class="[production_type.selected ? 'bg-pink-800 text-white' : 'bg-white text-pink-800']"
            @click="setTags($event, 'production_types', true)"
          >{{ production_type.name }}</div>
        </div>
      </div>
      <div class="managers w-3/5 flex flex-col items-end">
        <button
          v-if="!form.online"
          class="w-2/3 mt-4 py-3 px-4 border-4 border-purple text-purple rounded-full focus:outline-none"
          type="button"
          @click.prevent="manageAppointments = true"
        >Manage Appointments</button>

        <div v-if="!!form.roles.length" class="flex flex-col items-center my-5 w-2/3">
          <p class="text-purple text-lg mb-4">Roles</p>

          <carousel
            class="flex-none w-full"
            :per-page="innerWidth < 1920 ? 3 : 4"
            :pagination-enabled="false"
            :navigation-enabled="true"
            :navigation-prev-label="'&#x279C;'"                            
            :navigation-next-label="'&#x279C;'"
          >
            <slide
              v-for="(role, index) in form.roles"
              :key="index"
              :data-index="index"
              @slide-click="openRole"
              class="py-2 pr-2 cml-6"
            >
              <div class="flex flex-col items-center cursor-pointer box-shadow">
                <div
                  class="bg-purple-gradient flex items-center justify-center rounded-full h-12 w-12"
                >
                  <img
                    :src="role.preview"
                    alt="Cover"
                    class="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span class="text-purple font-medium mt-2">{{ role.name }}</span>
              </div>
            </slide>
          </carousel>
        </div>
        <!--
        <button
          class="w-2/3 mt-4 py-3 px-4 border-4 border-purple text-purple rounded-full focus:outline-none"
          type="button"
          @click.prevent="manageRoles = true"
        >
          {{ form.roles.length ? 'Add' : 'Edit' }} Roles
        </button>-->

        <div v-if="!!form.media.length" class="flex flex-col items-center my-5 w-2/3">
          <p class="text-purple text-lg mb-4">Documents</p>

          <carousel
            class="flex-none w-full"
            :per-page="innerWidth < 1920 ? 1 : 2"
            :pagination-enabled="false"
            :navigation-enabled="true"
            :navigation-prev-label="'&#x279C;'"                            
            :navigation-next-label="'&#x279C;'"
          >
            <slide v-for="(media, index) in form.media" :key="index">
              <DocumentItem :media="media" @destroy="true" />
            </slide>
          </carousel>
        </div>

        <!-- <input
          ref="inputFile"
          accept=".png, .jpg, .jpeg"
          type="file"
          multiple
          hidden
          @change="handleFile"
        >-->

        <!-- <button
          class="w-2/3 py-3 px-4 border-4 border-purple text-purple rounded-full focus:outline-none mb-4"
          type="button"
          :class="{ 'mt-4': !form.media.length }"
          @click="$refs.inputFile.click()"
        >
          Manage Documents
        </button>-->

        <base-button class="mt-auto w-2/3 mb-12" type="submit">Update Audition</base-button>
      </div>
    </div>

    <AppointmentsUpdModal
      v-if="manageAppointments"
      :data="form.appointment"
      @change="updatedata($event)"
      @close="manageAppointments = false"
    />

    <RolesUpdModal
      v-if="manageRoles"
      :data="selectedRole"
      @save="handleSaveRole"
      @destroy="handleDeleteRole"
      @close="manageRoles = false"
    />
  </form>
</template>

<script>
import Vue from "vue";
import uuid from "uuid/v1";
import firebase from "firebase/app";
import axios from "axios";
import AppointmentsUpdModal from "./AppointmentsUpdModal.vue";
import RolesUpdModal from "./RolesUpdModal.vue";
import ContributorItem from "./ContributorItem.vue";
import DocumentItem from "./DocumentItem.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import "firebase/storage";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(Loading);

// Import v-mask
import VueMask from "v-mask";
Vue.use(VueMask);

// Import Google Maps Autocomplete
import * as VueGoogleMaps from "vue2-google-maps";
import VueClockPicker from 'vue-clock-picker'
import { setTimeout } from 'timers';
import DEFINE from '../../utils/const.js';

Vue.use(VueGoogleMaps, {
  load: {
    key: DEFINE.google.key,
    libraries: DEFINE.google.libraries
  }
});

export default {
  name: "AuditionForm",
  components: {
    AppointmentsUpdModal,
    RolesUpdModal,
    ContributorItem,
    DocumentItem,
    Loading,
    VueClockPicker
  },
  data() {
    return {
      defaultTimeHour: '0',
      defaultTimeMinute: '0',
      innerWidth: window.innerWidth,
      manageAppointments: false,
      manageInvitations: false,
      manageRoles: false,
      selectedRole: null,
      selectedLocation: null,
      previewCover: null,
      isLoading: false,
      fullPage: true,
      changeLocationBtnTxt: false,
      invitation: {
        adding: false,
        email: ""
      },
      form: {
        dates: [
          {
            type: 1
          },
          {
            type: 2
          }
        ],
        roles: [],
        appointment: undefined,
        contributors: [],
        media: []
      },
      union_status: [
        // {
        //   value: "any",
        //   name: "Any",
        //   selected: false
        // },
        {
          value: "union",
          name: "Union",
          selected: true
        },
        {
          value: "nounion",
          name: "Nounion",
          selected: false
        }
      ],
      contract_types: [
        // {
        //   key: "any",
        //   name: "Any",
        //   selected: false
        // },
        {
          key: "paid",
          name: "Paid",
          selected: true
        },
        {
          key: "unpaid",
          name: "Unpaid",
          selected: false
        }
      ],
      production_types: [
        {
          key: "theater",
          name: "Theater",
          selected: true
        },
        {
          key: "film",
          name: "Film",
          selected: false
        },
        {
          key: "voiceover",
          name: "VoiceOver",
          selected: false
        },
        {
          key: "commercials",
          name: "Commercials",
          selected: false
        },
        {
          key: "performing arts",
          name: "Performing Arts",
          selected: false
        },
        {
          key: "modeling",
          name: "Modeling",
          selected: false
        },
        {
          key: "tv & video",
          name: "TV & Video",
          selected: false
        }
      ],
      center: {lat: 45.508, lng: -73.587},
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  watch: {
    manageRoles(value) {
      if (!value) {
        this.selectedRole = null;
      }
    }
  },
  computed: {
    ...mapState("audition", ["audition"]),
  },
  watch: {
    audition: function() {      
      let timeArr = this.audition && this.audition.time ? this.audition.time.split(":") : [];
      this.defaultTimeHour = parseInt(timeArr[0] ? timeArr[0] : '0');
      this.defaultTimeMinute = parseInt(timeArr[1] ? timeArr[1] : '0');
    }
  },
  created() {
    window.addEventListener("resize", this.onResize);
  },
  async mounted() {
    await this.fetchAuditionData(this.$route.params.id);
    this.form.title = this.audition.title;
    let date = new Date(this.audition.date);
    date.setDate(date.getDate() + 1);
    this.form.date = date;
    this.form.time = this.audition.time;
    this.form.description = this.audition.description;
    this.form.personal_information = this.audition.personal_information;
    this.form.additional_info = this.audition.additional_info;
    this.form.phone = this.audition.phone;
    this.form.email = this.audition.email;
    this.form.other_info = this.audition.other_info;
    this.form.url = this.audition.url;
    this.form.dates = this.audition.dates;
    this.form.online = this.audition.online;
    this.form.appointment = this.audition.apointment.general;
    this.form.appointment.type = this.form.appointment.type == "time" ? 1 : 2;
    this.form.appointment.spaces = this.form.appointment.slots;
    this.changeLocationBtnTxt = true;
    this.union_status.map(items => {
      if (items.value == this.audition.union) {
        items.selected = true;
      } else {
        items.selected = false;
      }
    });
    this.contract_types.map(items => {
      if (items.key == this.audition.contract) {
        items.selected = true;
      } else {
        items.selected = false;
      }
    });
    this.audition.production.map(value => {
      this.production_types.map(items => {
        if (items.key == value.trim()) {
          items.selected = true;
        }
      });
    });
    this.form.contract = this.audition.contract;
    this.form.production = this.audition.production;


    let timeArr = this.audition && this.audition.time ? this.audition.time.split(":") : [];
    this.defaultTimeHour = parseInt(timeArr[0] ? timeArr[0] : '0');
    this.defaultTimeMinute = parseInt(timeArr[1] ? timeArr[1] : '0');
    
    
    
    
    this.form.dates.map(function(values) {
      let start = new Date(values.from);
      start.setDate(start.getDate() + 1);
      values.from = start;

      let end = new Date(values.to);
      end.setDate(end.getDate() + 1);
      values.to = end;
    });
    this.form.media = this.audition.media;
    this.form.roles = this.audition.roles;
    this.form.contributors = this.audition.contributors;
    console.log("TCL: mounted -> this.audition", this.audition)
    console.log("TCL: mounted -> this.form", this.form)
    this.form.roles.map(items => {
      items.preview = items.image.url;
    });
    this.previewCover = this.audition.cover;
    // debugger;
  },
  methods: {
    ...mapActions("audition", ["fetchAuditionData"]),
    onResize() {
      this.innerWidth = window.innerWidth;
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


    async handleInvitation() {
      if (
        !this.invitation.email ||
        this.form.contributors.find(
          x => x.email === this.invitation.email.toLowerCase()
        ) ||
        !(await this.$validator.validateAll("invitation"))
      ) {
        return;
      }

      this.form.contributors.push({
        email: this.invitation.email.toLowerCase()
      });

      this.invitation.adding = false;
      this.invitation.email = "";
    },

    handleDeleteContributor(contributor) {
      const index = this.form.contributors.indexOf(contributor);
      this.form.contributors.splice(index, 1);
    },

    openRole(dataset) {
      this.selectedRole = this.form.roles[dataset.index];
      this.manageRoles = true;
    },

    handleSaveRole(role) {
      const index = this.form.roles.findIndex(x => x.id === role.id);

      if (index !== -1) {
        this.$set(this.form.roles, index, role);
      } else {
        this.form.roles.push(role);
      }
    },

    handleDeleteRole(role) {
      const index = this.form.roles.findIndex(x => x.id === role.id);
      this.form.roles.splice(index, 1);
    },

    handleFile(e) {
      const files = Array.from(e.target.files);

      files
        .filter(file => !this.form.media.some(x => x.name === file.name))
        .forEach(file => {
          const extension = file.name.split(".").pop();
          this.form.media.push({
            name: file.name,
            type: 1,
            url: file,
            share: "yes"
          });
        });

      this.$refs.inputFile.value = "";
    },
    updatedata(item) {
      var appoint = item.slots;
      item.slots = appoint.length;
      item.type = item.type == 1 ? "time" : "numeric";
      this.form.appointment = [
        {
          general: item,
          slots: appoint
        }
      ];
      // debugger;
    },

    handleCoverFile(e) {
      const file = e.target.files[0];

      this.previewCover = URL.createObjectURL(file);
      this.form.cover = file;
      this.form.cover_name = file.name;

      this.$refs.coverFile.value = "";
    },

    onCancel() {
      console.log("User cancelled the loader.");
    },

    handleDeleteDocument(media) {
      const index = this.form.media.indexOf(media);
      this.form.media.splice(index, 1);
    },

    handleLocation(place) {
      this.selectedLocation = place;
    },

    async handleCreate() {
      console.log("TCL: handleCreate -> handleCreate")
      let coverSnapshot = null,
        rolesSnapshots = [],
        filesSnaphosts = [];

      try {        
        if (this.isLoading) {
        // if (this.isLoading || !(await this.$validator.validateAll("create"))) {
          console.log("TCL: handleCreate -> this.$validator.validateAll", this.$validator.validateAll())
          return;
        }
        this.form.location = this.form.online ? null : this.form.location;

        // this.form.appointment = this.form.online ? this.audition.apointment : this.form.appointment;
        let data = Object.assign({}, this.form);
        this.isLoading = true;
        data.union = this.union_status.find(x => x.selected).value;
        data.contract = this.contract_types.find(x => x.selected).key;
        data.production = this.production_types
          .filter(x => x.selected)
          .map(x => x.key)
          .join(", ");
        
        this.audition.apointment.general.time = this.form.time
        data.appointment = [this.audition.apointment];
        // debugger;
        if (this.selectedLocation) {
          data.location = {
            latitude: this.selectedLocation.geometry.location.lat(),
            longitude: this.selectedLocation.geometry.location.lng(),
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0043
          };
        }
        // Upload cover
        if (data.cover != undefined) {
          coverSnapshot = await firebase
            .storage()
            .ref(`temp/${uuid()}.${data.cover_name.split(".").pop()}`)
            .put(data.cover);

          data.cover = await coverSnapshot.ref.getDownloadURL();
        } else {
          data.cover = this.audition.cover;
        }
        // Upload roles
        await Promise.all(
          data.roles.map(async role => {
            if (role.cover != undefined) {
              const snapshot = await firebase
                .storage()
                .ref(`temp/${uuid()}.${role.name_cover.split(".").pop()}`)
                .put(role.cover);

              role.cover = await snapshot.ref.getDownloadURL();

              rolesSnapshots.push(snapshot);
            } else {
              role.cover = role.image.url;
            }
          })
        );

        // // Upload files
        // await Promise.all(data.media.map(async (media) => {
        //   const snapshot = await firebase.storage()
        //     .ref(`temp/${uuid()}.${media.name.split('.').pop()}`)
        //     .put(media.url);

        //   media.url = await snapshot.ref.getDownloadURL();

        //   filesSnaphosts.push(snapshot);
        // }));
        let action = await axios.put(
          `/t/auditions/update/${this.$route.params.id}`,
          data
        );
        this.isLoading = false;
        this.$toasted.success("The audition has updated successfully.");
      } catch (e) {
        console.log(e);
        this.isLoading = false;
        this.$toasted.error("Audition not updated, try later.");
        coverSnapshot && coverSnapshot.ref.delete();
        await Promise.all(rolesSnapshots.map(role => role.ref.delete()));
        await Promise.all(filesSnaphosts.map(file => file.ref.delete()));
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

      this[type].forEach(item => (item.selected = false));
      itemSelected.selected = true;
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
      this.form.time = event.hour > 0 || event.minute > 0 ? `${event.hour}:${event.minute}` : '';
      console.log("TCL: this.form", this.form)
    }
  }
};
</script>

<style scoped>
  .bubble {
    background: #fff;
    border-radius: 0.4em;
    box-shadow: 0px 0px 6px #b2b2b2;
  }
  .location-input{padding: 7px 8px;}
  .w-2btn{padding: 7px 8px;margin-left: 10px;float: right;}
  .search-btn-wrap {width: 100%;float: left;padding: 20px;padding-right: 20px;display: flex;align-items: center;justify-content: space-between;}
  /*.close-btn.search.wrap{display: flex;align-items: center;flex-wrap: wrap;}*/
  .vue-map-container{float: left;}
  .location-icon {background-image: url('../../../public/images/icons/location-icon.svg');background-repeat: no-repeat;background-position: right 12px top 14px;}
  .box-shadow{
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
  }    
  .cml-6{
      margin-left: 2px !important;
  }
</style>
