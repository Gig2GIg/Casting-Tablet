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
        class="relative flex items-center text-purple cursor-pointer outside-click-exclude"
        @click="manageInvitations = !manageInvitations"
      >
        <img src="/images/icons/person.png" alt="Icon" class="h-4 mr-2 outside-click-exclude" />
        <span class="select-none outside-click-exclude">Add Invitations</span>
      </div>
    </div>

    <form
      v-show="manageInvitations"
      v-outside-click="{
      exclude: ['outside-click-exclude'],
        handler: closeInviteForm
      }"
      class="bubble absolute right-0 w-64 -mr-12 z-50 p-3"
      data-vv-scope="invitation"
      @submit.prevent="handleInvitation"
    >
      <base-button
        v-if="!invitation.adding"
        class="pt-2 pb-2 outside-click-exclude"
        border-classes="rounded-full border border-purple"
        color="bg-white "
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

        <base-button class="pt-2 pb-2 outside-click-exclude" type="submit" expanded>Send</base-button>
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
    <div class="flex" :style="!form.online ? 'display: none!important;' : ''">
      <base-input
        v-model="form.end_date"
        style="height: 50px !important"
        v-validate="form.online ? 'required' : ''"
        id="end_date"
        name="end_date"
        class="w-1/3 px-2"
        type="date"
        :mindate="min_end_date"
        placeholder="End Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.end_date')"
        data-vv-as="end date"
      />
      <template>
        <custom-time-picker v-if="isSetCutOff"
          style="margin-top: 8px; width: 100% !important;"
          class="timepicker-custom cus-des-timepicker text-left px-2"
          :default-hour="timeDefaultTimeHour"
          :default-minute="timeDefaultTimeMinute"
          :onTimeChange="endTimeChangeHandler"
          id="end_time"
          :defaultFocused="false"
          v-validate="form.online ? 'required' : ''"
          :message="errors.first('create.end_date')"
          placeholder="Cut off time"
          :HOURS="24"
          colorPalette="dark"
          theme="material"
          data-vv-as="cut off time"
        ></custom-time-picker>
      </template>
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
        <div class="relative h-12 my-2" v-if="isSetTime">
          <custom-time-picker
            mode="24"
            :default-hour="defaultTimeHour"
            :default-minute="defaultTimeMinute"
            class="cus-des-timepicker px-2 text-left"
            :onTimeChange="timeChangeHandler"
            :defaultFocused="false"
            v-validate="'required'"
            :message="errors.first('create.time')"
            placeholder="Time"
            colorPalette="dark"
            theme="material"
          ></custom-time-picker>
        </div>
        <base-input
          v-if="!isSetTime"
          v-model="form.time"
          name="time"
          class="w-1/3 px-2"
          placeholder="Time"
          :custom-classes="['border', 'border-purple']"
          :message="errors.first('create.time')"
        />
      </template>

      <button
        class="w-1/3 location-icon border border-purple rounded-full h-full py-3 px-6 h-12 my-2 text-left text-purple"
        v-validate="'required'"
        :custom-classes="['border', 'border-purple']"
        name="location"
        type="button"
        :message="errors.first('create.location')"
        @click="openLocationModel()"
      >{{changeLocationBtnTxt ? 'Location Saved' : 'Location'}}</button>
      <modal width="80%" height="500px" :adaptive="true" name="location_model">
        <template>
          <div class="close-btn search wrap">
            <div>
              <label class="search-btn-wrap">
                <button type="button">
                  <i
                    class="material-icons"
                    @click="closeLocationModel('close')"
                    style="font-size: 35px;"
                  >clear</i>
                </button>
                <gmap-autocomplete
                  class="w-1/3 px-2 border border-purple rounded-full h-full location-input"
                  @place_changed="setPlace"
                ></gmap-autocomplete>
                <button
                  type="button"
                  class="w-1/4 w-2btn border border-purple bg-purple-gradient text-white rounded-full h-full"
                  @click="closeLocationModel('save')"
                >Save</button>
              </label>
              <br />
            </div>
            <br />
            <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
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
          class="flex rounded-large h-full items-center border border-purple cursor-pointer justify-center bg-grey-500 overflow-hidden"
          @click="$refs.coverFile.click()"
        >
          <div v-if="!previewCover" class="flex flex-col flex-no-wrap py-5 justify-between">
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
      <!-- v-validate="'required|max:500'" -->
      <base-input
        v-model="form.personal_information"
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
        v-validate="'max:500'"
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
      <!-- v-validate="'required'" -->
      <base-input
        v-model="form_dates[0].from"
        name="contract_start_date"
        class="w-1/2 px-2"
        type="date"
        :mindate="new Date()"
        placeholder="Contract Start Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.contract_start_date')"
        data-vv-as="start date"
        @input="handleChangeDates('contract')"
      />
      <!-- v-validate="'required'" -->
      <base-input
        v-model="form_dates[0].to"
        name="contract_end_date"
        class="w-1/2 px-2"
        type="date"
        :mindate="form_dates[0].from ? form_dates[0].from : null"
        placeholder="Contract End Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.contract_end_date')"
        data-vv-as="end date"
      />
    </div>
    <div class="flex w-full">
      <!-- v-validate="'required'" -->
      <base-input
        v-model="form_dates[1].from"
        :mindate="new Date()"
        name="rehearsal_start_date"
        class="w-1/2 px-2"
        type="date"
        placeholder="Rehearsal Start Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.rehearsal_start_date')"
        data-vv-as="start date"
        @input="handleChangeDates('rehearsal')"
      />
      <!-- v-validate="'required'" -->
      <base-input
        v-model="form_dates[1].to"
        :mindate="form_dates[1].from ? form_dates[1].from : null"
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
        v-validate="'url'"
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
        v-validate="'max:255'"
        name="phone"
        v-mask="'(###) ###-####'"
        class="w-1/3 px-2"
        placeholder="Phone"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.phone')"
      />
      <base-input
        v-model="form.email"
        v-validate="'email'"
        name="email"
        class="w-1/3 px-2"
        placeholder="Email"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.email')"
      />
      <base-input
        v-model="form.other_info"
        v-validate="'max:255'"
        name="other_info"
        class="w-1/3 px-2"
        placeholder="Other"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.other_info')"
        data-vv-as="other information"
      />
    </div>

    <template v-if="!form.online">
      <div class="flex flex-wrap py-6">
        <div class="overflow-auto w-10/12">
          <span
            class="text-purple text-lg font-bold ml-5"
          >Will this audition require socially distanced group entrances?</span>
        </div>
        <div class="w-1/12">
          <!-- v-model="form.grouping_enabled" -->
          <label class="switch cursor-pointer" for="grouping_enable">
            <input
              id="grouping_enable"
              type="checkbox"
              :checked="form.grouping_enabled ? true : false"
              disabled="true"
            />
            <span class="slider round" />
          </label>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="overflow-auto w-full">
          <p
            class="text-purple text-mg ml-5"
          >Allow for automatic assignment of grouping of performers, based on the parameters set below. Groups can be used to notify performers of updates and changes.</p>
        </div>
      </div>
      <div class="flex" v-if="form.grouping_enabled">
        <group-size-dropdown
          class="text-red-600 bg-white mt-5"
          :options="group_size_array"
          :selected="selected_group_size"
          :setgroupsize.sync="set_group_size"
          @setGroupSizeOption="methodToGroupSizeOnSelect"
          v-on:updateOption="methodToGroupSizeOnSelect"
          :placeholder="'Group Size'"
          :disabled="true"
        ></group-size-dropdown>
      </div>
    </template>

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
                    :src="role && role.preview ? role.preview :imgUrlAlt"
                    @error="imgUrlAlt"
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
              <DocumentItem
                :media="media"
                @destroy="handleDeleteDocument"
                @renamedoc="handleRenameDoc"
              />
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
      <!-- Cover image crop modal -->
      <modal
        class="flex flex-col w-full items-center my-info-mdel modal-height-96 crop-modal"
        :width="600"
        name="modal_crop_image"
      >
        <div class="content my-info-content flex-col" ng-if="imgSrc">
          <div class="w-full content-center justify-center text-center mrtop-minus-crop">
            <span
              class="text-center text-sm w-full text-purple"
            >Please upload an image, which has a size of more than width {{cover_image_size.min_width}} X height {{cover_image_size.min_height}}.</span>
          </div>
          <section class="cropper-area">
            <div class="img-cropper">
              <vue-cropper
                ref="cropper"
                :aspectRatio="1/1"
                :initialAspectRatio="1/1"
                :src="imgSrc"
                preview=".preview"
                drag-mode="crop"
                :minCropBoxWidth="minHeight"
                :minCropBoxHeight="minWidth"
                :minContainerWidth="minWidthCropContainer"
                :minContainerHeight="minHeightCropContainer"
                :minCanvasWidth="minWidth"
                :minCanvasHeight="minHeight"
                :auto-crop-area="1"
                alt="Profile Picture"
                :img-style="{ 'width': '400px', 'height': '400px' }"
              />
            </div>
            <div class="actions">
              <a href="#" role="button" @click.prevent="cropSaveImage">Crop & Save</a>
              <!-- <a
                    href="#"
                    role="button"
                    @click.prevent="cropImage"
                    >
                    Crop
                    </a>
                    <a
                    href="#"
                    role="button"
                    @click.prevent="reset"
                    >
                    Reset
                    </a>            
                    <a
                    href="#"
                    role="button"
                    @click.prevent="showFileChooser"
                    >
                    Upload New Image
                    </a>
                    <a
                    href="#"
                    role="button"
                    @click.prevent="cropImageDone"
                    >
                    Done
              </a>-->
              <a href="#" role="button" @click.prevent="cropImageCancel">Cancel</a>
            </div>
            <!-- <base-input
                    v-model="coverFileName"
                    :custom-classes="['border border-b border-gray-300']"
                    name="cover_file_name"
                    placeholder="Cover Name"
                    data-vv-as="cover name"
                    class="w-8/12"
            />-->
          </section>
          <!-- <section class="preview-area">
                <p>Image Preview</p>
                <div class="preview" />
                <p>Cropped Image</p>
                <div class="cropped-image">
                    <img
                    v-if="cropImg"
                    :src="cropImg"
                    alt="Cropped Profile"
                    />
                    <div v-else class="crop-placeholder" />
                </div>
          </section>-->
        </div>
      </modal>
      <modal
        class="flex flex-col w-full items-center"
        :width="450"
        :height="200"
        name="rename_file_name"
        :clickToClose="false"
      >
        <div class="content my-info-content">
          <section class="image-preview-area">
            <div class="flex justify-center mb-4 items-center px-3 w-full">
              <div class="w-full ml-4 text-purple px-2">
                <base-input
                  v-if="currentDoc && currentDoc.index != null"
                  v-model="form.media[currentDoc.index].name"
                  :custom-classes="['border border-b border-gray-300']"
                  name="file_name"
                  placeholder="File Name"
                  data-vv-as="file name"
                />
              </div>
            </div>
            <div class="container flex w-full mt-3 cursor-pointer">
              <div class="flex w-full text-center justify-center flex-wrap actions">
                <a href="#" role="button" @click.prevent="fileRenameDone">Done</a>
              </div>
            </div>
          </section>
        </div>
      </modal>
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
      :role_count="form && form.roles && form.roles.length ? form.roles.length : 0"
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
import { setTimeout } from "timers";
import DEFINE from "../../utils/const.js";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import ThumbService from "@/services/ThumbService";
import moment from "moment";

import customTimePicker from "../custom/custom-clock-picker/components/customTimePicker.vue";

Vue.use(VueGoogleMaps, {
  load: {
    key: DEFINE.google.key,
    libraries: DEFINE.google.libraries,
  },
});

export default {
  name: "AuditionForm",
  components: {
    AppointmentsUpdModal,
    RolesUpdModal,
    ContributorItem,
    DocumentItem,
    Loading,
    customTimePicker,
    VueCropper,
  },
  data() {
    return {
      defaultTimeHour: 0,
      defaultTimeMinute: 0,
      timeDefaultTimeHour: 0,
      timeDefaultTimeMinute: 0,
      isSetTime: false,
      isSetCutOff: false,
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
      cover_image_size: DEFINE.cover_image,
      invitation: {
        adding: false,
        email: "",
      },
      end_time: null,
      form_dates: [
        {
          to: "",
          from: "",
          type: "contract",
        },
        {
          to: "",
          from: "",
          type: "rehearsal",
        },
      ],
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
      group_size_array: DEFINE.group_size_array,
      selected_group_size: "",
      set_group_size: "",
      union_status: [
        // {
        //   value: "any",
        //   name: "Any",
        //   selected: false
        // },
        {
          value: "UNION",
          name: "Union",
          selected: true,
        },
        {
          value: "NONUNION",
          name: "Non Union",
          selected: false,
        },
      ],
      contract_types: [
        // {
        //   key: "any",
        //   name: "Any",
        //   selected: false
        // },
        {
          key: "PAID",
          name: "Paid",
          selected: true,
        },
        {
          key: "UNPAID",
          name: "Unpaid",
          selected: false,
        },
        {
          key: "ACADEMIC",
          name: "Academic",
          selected: false,
        },
      ],
      production_types: [
        {
          key: "THEATER",
          name: "Theater",
          selected: true,
        },
        {
          key: "FILM",
          name: "Film",
          selected: false,
        },
        {
          key: "VOICEOVER",
          name: "VoiceOver",
          selected: false,
        },
        {
          key: "COMMERCIALS",
          name: "Commercials",
          selected: false,
        },
        {
          key: "PERFORMING ARTS",
          name: "Performing Arts",
          selected: false,
        },
        {
          key: "MODELING",
          name: "Modeling",
          selected: false,
        },
        {
          key: "TV & VIDEO",
          name: "TV & Video",
          selected: false,
        },
      ],
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      imgSrc: null,
      updatedImageFile: null,
      updatedImageBlob: null,
      cropImg: "",
      data: null,
      minHeight: Number(350),
      minWidth: Number(350),
      minHeightCropContainer: Number(450),
      minWidthCropContainer: Number(450),
      currentDoc: {},
      coverFileName: null,
      coveNameObject: {},
      coverThumbnail: {},
      min_end_date: new Date(),
    };
  },
  watch: {
    manageRoles(value) {
      if (!value) {
        this.selectedRole = null;
      }
    },
  },
  computed: {
    ...mapState("audition", ["audition"]),
  },
  watch: {
    audition: function () {
      let timeArr =
        this.audition && this.audition.time
          ? this.audition.time.split(":")
          : [];
      this.defaultTimeHour = parseInt(timeArr[0] ? timeArr[0] : 0);
      this.defaultTimeMinute = parseInt(timeArr[1] ? timeArr[1] : 0);

      let endTimeArr = this.audition && this.audition.online && this.audition.end_date
          ? moment(this.audition.end_date).format("HH:mm:ss").split(":")
          : [];
      this.timeDefaultTimeHour = parseInt(endTimeArr[0] ? endTimeArr[0] : 0);
      this.timeDefaultTimeMinute = parseInt(endTimeArr[1] ? endTimeArr[1] : 0);
    },
  },
  created() {
    let endTimeArr = this.audition && this.audition.online && this.audition.end_date
          ? moment(this.audition.end_date).format("HH:mm:ss").split(":")
          : [];
    this.timeDefaultTimeHour = parseInt(endTimeArr[0] ? endTimeArr[0] : 0);
    this.timeDefaultTimeMinute = parseInt(endTimeArr[1] ? endTimeArr[1] : 0);
    console.log("from create", endTimeArr)
    this.min_end_date.setDate(new Date().getDate() + 1);
    window.addEventListener("resize", this.onResize);
  },
  async mounted() {
    await this.fetchAuditionData(this.$route.params.id);

    let auditionCopiedObject = JSON.parse(JSON.stringify(this.audition));

    let endTimeArr = auditionCopiedObject && auditionCopiedObject.online && auditionCopiedObject.end_date
          ? moment(auditionCopiedObject.end_date).format("HH:mm:ss").split(":")
          : [];
    this.timeDefaultTimeHour = parseInt(endTimeArr[0] ? endTimeArr[0] : 0);
    this.timeDefaultTimeMinute = parseInt(endTimeArr[1] ? endTimeArr[1] : 0);
    this.isSetCutOff = true;

    this.form.title = auditionCopiedObject.title;
    let date = new Date(auditionCopiedObject.date);
    date.setDate(date.getDate() + 1);
    this.form.date = date;
    this.form.time = auditionCopiedObject.time;

    this.form.description = auditionCopiedObject.description;
    this.form.personal_information = auditionCopiedObject.personal_information;
    this.form.additional_info = auditionCopiedObject.additional_info;
    this.form.phone = auditionCopiedObject.phone;
    this.form.email = auditionCopiedObject.email;
    this.form.other_info = auditionCopiedObject.other_info;
    this.form.url = auditionCopiedObject.url;
    this.form.cover_thumbnail = auditionCopiedObject.cover_thumbnail;
    this.coverFileName = auditionCopiedObject.cover_name
      ? auditionCopiedObject.cover_name
      : "";

    this.form.dates = auditionCopiedObject.dates.length
      ? auditionCopiedObject.dates
      : [];
    this.form.online =
      auditionCopiedObject.online && auditionCopiedObject.online == 1
        ? true
        : false;
    this.form.grouping_enabled = auditionCopiedObject.grouping_enabled
      ? auditionCopiedObject.grouping_enabled
      : false;
    this.selected_group_size = this.form.grouping_capacity = auditionCopiedObject.grouping_capacity
      ? auditionCopiedObject.grouping_capacity
      : null;
    this.form.appointment = auditionCopiedObject.apointment.general;

    this.form.appointment.type = this.form.appointment.type == "time" ? 1 : 2;
    this.form.appointment.spaces = auditionCopiedObject.apointment.slots.length;
    this.form.appointment.slots = auditionCopiedObject.apointment.slots;
    this.form.appointment.slots.map((slot) => {
      slot.is_walk = slot.is_walk == 1 ? true : false;
      return slot;
    });
    this.changeLocationBtnTxt = true;
    this.union_status.map((items) => {
      if (items.value == auditionCopiedObject.union) {
        items.selected = true;
      } else {
        items.selected = false;
      }
    });
    this.contract_types.map((items) => {
      if (items.key == auditionCopiedObject.contract) {
        items.selected = true;
      } else {
        items.selected = false;
      }
    });
    auditionCopiedObject.production.map((value) => {
      this.production_types.map((items) => {
        if (items.key == value.trim()) {
          items.selected = true;
        }
      });
    });
    this.form.contract = auditionCopiedObject.contract;
    this.form.production = auditionCopiedObject.production;

    let timeArr =
      auditionCopiedObject && auditionCopiedObject.time
        ? auditionCopiedObject.time.split(":")
        : [];
    this.defaultTimeHour = parseInt(timeArr[0] ? timeArr[0] : 0);
    this.defaultTimeMinute = parseInt(timeArr[1] ? timeArr[1] : 0);
    this.isSetTime = true;

    this.form.dates.map((values) => {
      if (values.type == "contract") {
        this.form_dates[0].from = values.from
          ? moment(values.from).toDate()
          : "";
        this.form_dates[0].to = values.to ? moment(values.to).toDate() : "";
      } else if (values.type == "rehearsal") {
        this.form_dates[1].from = values.from
          ? moment(values.from).toDate()
          : "";
        this.form_dates[1].to = values.to ? moment(values.to).toDate() : "";
      }
    });
    this.form.end_date = auditionCopiedObject.end_date
      ? moment(auditionCopiedObject.end_date).toDate()
      : "";
    
    this.form.media = auditionCopiedObject.media;
    this.form.roles = auditionCopiedObject.roles;
    this.form.contributors = auditionCopiedObject.contributors;

    this.form.roles.map((items) => {
      items.preview = items.image.thumbnail
        ? items.image.thumbnail
        : items.image.url;
    });
    this.previewCover = auditionCopiedObject.cover_thumbnail
      ? auditionCopiedObject.cover_thumbnail
      : auditionCopiedObject.cover;
    this.form.id_cover = auditionCopiedObject.id_cover;
    // debugger;
  },
  methods: {
    ...mapActions("audition", ["fetchAuditionData"]),
    onResize() {
      this.innerWidth = window.innerWidth;
    },
    async methodToGroupSizeOnSelect(value) {
      this.set_group_size = value;
      this.form.grouping_capacity = this.set_group_size;
    },
    openLocationModel() {
      this.$modal.show("location_model");
      this.geolocate();
    },

    closeLocationModel(type) {
      if (type == "save") {
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
          (x) => x.email === this.invitation.email.toLowerCase()
        ) ||
        !(await this.$validator.validateAll("invitation"))
      ) {
        return;
      }

      this.form.contributors.push({
        email: this.invitation.email.toLowerCase(),
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
      const index = this.form.roles.findIndex((x) => x.id === role.id);

      if (index !== -1) {
        this.$set(this.form.roles, index, role);
      } else {
        this.form.roles.push(role);
      }
    },

    handleDeleteRole(role) {
      const index = this.form.roles.findIndex((x) => x.id === role.id);
      this.form.roles.splice(index, 1);
    },

    handleFile(e) {
      const files = Array.from(e.target.files);

      files
        .filter((file) => !this.form.media.some((x) => x.name === file.name))
        .forEach((file) => {
          const extension = file.name.split(".").pop();
          this.form.media.push({
            name: file.name,
            type: 1,
            url: file,
            share: "yes",
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
          slots: appoint,
        },
      ];
      // debugger;
    },

    handleCoverFile(e) {
      // const file = e.target.files[0];

      // this.previewCover = URL.createObjectURL(file);
      // this.form.cover = file;
      // this.form.cover_name = file.name;

      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        this.$toasted.error("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        this.cropImg = null;
        this.updatedImageBlob = null;
        this.coverFileName = null;
        this.updatedImageFile = file;
        this.coveNameObject.name = file.name;
        this.coveNameObject.org_name = file.name;
        this.coverFileName = JSON.parse(
          JSON.stringify(this.updatedImageFile.name)
        );
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          if (this.$refs.cropper) {
            this.$refs.cropper.replace(event.target.result);
            this.reset();
          }
          this.$modal.show("modal_crop_image");
        };
        reader.readAsDataURL(file);

        this.$refs.coverFile.value = "";
      } else {
        this.$toasted.error("Something went to wrong, please try again!");
      }
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
    handleChangeDates(type) {
      if (type == "contract") {
        if (
          moment(this.form_dates[0].from).isAfter(this.form_dates[0].to, "day")
        ) {
          this.form_dates[0].to = "";
        }
      } else if (type == "rehearsal") {
        if (
          moment(this.form_dates[1].from).isAfter(this.form_dates[1].to, "day")
        ) {
          this.form_dates[1].to = "";
        }
      }
    },
    async handleCreate() {
      let coverSnapshot = null,
        rolesSnapshots = [],
        rolesThumbailSnapshots = [],
        filesSnaphosts = [];
      this.$toasted.clear();
      try {
        if (this.isLoading) {
          // if (this.isLoading || !(await this.$validator.validateAll("create"))) {
          // console.log("TCL: handleCreate -> this.$validator.validateAll", this.$validator.validateAll())
          return;
        }

        if (
          moment.isDate(this.form_dates[0].from) &&
          !moment.isDate(this.form_dates[0].to)
        ) {
          this.$toasted.error("The contract end date field is required.");
          return;
        }

        if (
          moment.isDate(this.form_dates[1].from) &&
          !moment.isDate(this.form_dates[1].to)
        ) {
          this.$toasted.error("The rehearsal end date field is required.");
          return;
        }

        if (
          !moment.isDate(this.form_dates[0].from) &&
          moment.isDate(this.form_dates[0].to)
        ) {
          this.$toasted.error("The contract from date field is required.");
          return;
        }

        if (
          !moment.isDate(this.form_dates[1].from) &&
          moment.isDate(this.form_dates[1].to)
        ) {
          this.$toasted.error("The rehearsal from date field is required.");
          return;
        }

        this.form.location = this.form.online ? null : this.form.location;
        if (this.updatedImageBlob && this.updatedImageFile) {
          this.updatedImageBlob.name = this.coveNameObject.name;
          this.form.cover_file = this.updatedImageBlob;
          this.form.cover_name = this.coveNameObject.name;
          this.form.cover_org_name = this.coveNameObject.org_name;
        } else {
          this.form.cover_file = null;
        }
        // this.form.appointment = this.form.online ? this.audition.apointment : this.form.appointment;
        let data = Object.assign({}, this.form);
        this.isLoading = true;
        data.union = this.union_status.find((x) => x.selected).value;
        data.contract = this.contract_types.find((x) => x.selected).key;
        data.production = this.production_types
          .filter((x) => x.selected)
          .map((x) => x.key)
          .join(",");

        this.audition.apointment.general.time = this.form.time;
        // data.appointment = [this.audition.apointment];
        delete data.appointment; // delete appoiment due to it's read only same as casting tablet

        // debugger;
        if (this.selectedLocation) {
          data.location = {
            latitude: this.selectedLocation.geometry.location.lat(),
            longitude: this.selectedLocation.geometry.location.lng(),
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0043,
          };
        }

        // Upload cover
        if (data.cover_file != undefined && data.cover_file) {
          // upload cover thumbnail file
          let coverThumbnailUrl;
          if (this.coverThumbnail.file) {
            const thumbnailFileSnapshot = await firebase
              .storage()
              .ref(`audition_cover/thumbnail/${uuid()}.png`)
              .put(this.coverThumbnail.file);
            coverThumbnailUrl = await thumbnailFileSnapshot.ref.getDownloadURL();
          }

          const coverRxtension = this.form.cover_org_name.substring(
            this.form.cover_org_name.lastIndexOf(".") + 1
          );
          const coverFilePath = data.cover_name.includes(`${coverRxtension}`)
            ? `audition_cover/${uuid()}_${data.cover_name}`
            : `audition_cover/${uuid()}_${data.cover_name}.${coverRxtension}`;

          coverSnapshot = await firebase
            .storage()
            .ref(coverFilePath)
            .put(data.cover_file);

          data.cover = await coverSnapshot.ref.getDownloadURL();
          data.cover_thumbnail = coverThumbnailUrl ? coverThumbnailUrl : null;
          data.cover_name = data.cover_name;
        } else {
          data.cover = this.audition.cover;
          data.cover_thumbnail = this.audition.cover_thumbnail;
        }
        // Upload roles
        await Promise.all(
          data.roles.map(async (role) => {
            if (
              role.cover_file != undefined &&
              role.name_cover &&
              role.name_cover != undefined
            ) {
              delete role.preview;
              // Upload role cover thumbnail
              let roleThumbnailUrl = null;
              if (role.thumb_file && role.thumb_file != undefined) {
                const thumbnailFileSnapshot = await firebase
                  .storage()
                  .ref(`audition_role_cover/thumbnail/${uuid()}.png`)
                  .put(role.thumb_file);
                roleThumbnailUrl = await thumbnailFileSnapshot.ref.getDownloadURL();
                rolesThumbailSnapshots.push(thumbnailFileSnapshot);
              }

              const roleCoverExtension = role.cover_file.name.substring(
                role.cover_file.name.lastIndexOf(".") + 1
              );
              const roleCoverFilePath = role.name_cover.includes(
                `${roleCoverExtension}`
              )
                ? `audition_role_cover/${uuid()}_${role.name_cover}`
                : `audition_role_cover/${uuid()}_${
                    role.name_cover
                  }.${roleCoverExtension}`;

              const snapshot = await firebase
                .storage()
                .ref(roleCoverFilePath)
                .put(role.cover_file);

              role.cover = await snapshot.ref.getDownloadURL();
              role.cover_thumbnail = roleThumbnailUrl ? roleThumbnailUrl : null;
              role.cover_name = role.name_cover;
              rolesSnapshots.push(snapshot);
            } else {
              role.cover =
                role.image && role.image.url ? role.image.url : role.cover;
              role.cover_name = role.name_cover;
            }
            delete role.name_cover;
            delete role.image;
          })
        );

        data.online = data.online ? 1 : 0;
        if (data.online && this.form.end_date) {
          data.end_date = moment(this.form.end_date).format("YYYY-MM-DD") + " " + this.end_time;
        }
        // // Upload files
        // await Promise.all(data.media.map(async (media) => {
        //   const snapshot = await firebase.storage()
        //     .ref(`temp/${uuid()}.${media.name.split('.').pop()}`)
        //     .put(media.url);

        //   media.url = await snapshot.ref.getDownloadURL();

        //   filesSnaphosts.push(snapshot);
        // }));

        // update date back
        if (this.form_dates[0].from != "" && this.form_dates[0].to != "") {
          let contractIndex = this.form.dates.findIndex(
            (x) => x.type === "contract"
          );
          if (contractIndex > -1) {
            this.form.dates[contractIndex].from = moment.isDate(
              this.form_dates[0].from
            )
              ? moment(this.form_dates[0].from).format("YYYY-MM-DD")
              : null;
            this.form.dates[contractIndex].to = moment.isDate(
              this.form_dates[0].from
            )
              ? moment(this.form_dates[0].to).format("YYYY-MM-DD")
              : null;
          } else {
            let datesData = this.form_dates[0];
            datesData.from = moment.isDate(this.form_dates[0].from)
              ? moment(datesData.from).format("YYYY-MM-DD")
              : null;
            datesData.to = moment.isDate(this.form_dates[0].from)
              ? moment(datesData.to).format("YYYY-MM-DD")
              : null;
            this.form.dates.push(datesData);
          }
        }
        if (this.form_dates[1].from != "" && this.form_dates[1].to != "") {
          let rehearsalIndex = this.form.dates.findIndex(
            (x) => x.type === "rehearsal"
          );
          if (rehearsalIndex > -1) {
            this.form.dates[rehearsalIndex].from = moment.isDate(
              this.form_dates[1].from
            )
              ? moment(this.form_dates[1].from).format("YYYY-MM-DD")
              : null;
            this.form.dates[rehearsalIndex].to = moment.isDate(
              this.form_dates[1].to
            )
              ? moment(this.form_dates[1].to).format("YYYY-MM-DD")
              : null;
          } else {
            let datesData = this.form_dates[1];
            datesData.from = moment.isDate(this.form_dates.from)
              ? moment(datesData.from).format("YYYY-MM-DD")
              : null;
            datesData.to = moment.isDate(this.form_dates.to)
              ? moment(datesData.to).format("YYYY-MM-DD")
              : null;
            this.form.dates.push(datesData);
          }
        }

        let action = await axios.put(
          `/t/auditions/update/${this.$route.params.id}`,
          data
        );
        this.isLoading = false;
        this.$toasted.success("The audition has updated successfully.");
        this.$router.push({
          name: "auditions/detail",
          params: { id: this.$route.params.id },
        });
      } catch (e) {
        console.log(e);
        this.isLoading = false;
        let errorMsg =
          e.response && e.response.data && e.response.data.errors
            ? this.$options.filters.getErrorMsg(e.response.data.errors)
            : null;
        this.$toasted.error(
          errorMsg ? errorMsg : "Audition not updated, try later."
        );
        coverSnapshot && coverSnapshot.ref.delete();
        await Promise.all(rolesSnapshots.map((role) => role.ref.delete()));
        // await Promise.all(filesSnaphosts.map(file => file.ref.delete()));
      }
    },

    setTags({ target }, type, multiple = false) {
      const text = target.textContent.trim();
      const itemSelected = this[type].find((item) => item.name === text);
      if (multiple) {
        if (itemSelected.selected) {
          itemSelected.selected = false;
          return;
        }
        itemSelected.selected = true;
        return;
      }

      this[type].forEach((item) => (item.selected = false));
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
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    timeChangeHandler: function (event) {
      this.form.time =
        event.hour > 0 || event.minute > 0
          ? `${event.hour}:${event.minute}`
          : "";
    },
    endTimeChangeHandler: function (event) {
      this.end_time =
        event.hour > 0 || event.minute > 0
          ? `${event.hour}:${event.minute}:00`
          : "";
    },
    imgUrlAlt(event) {
      event.target.src = DEFINE.role_placeholder;
    },
    /**
     * validate cover image minimum width height
     */
    async coverImageSizeValidate(imageSrc) {
      const imageSize = new Image();
      imageSize.src = imageSrc;
      const that = this;
      return new Promise((resolve, reject) => {
        imageSize.onload = function () {
          console.log(
            "width :: ",
            imageSize.width + ", height :: " + imageSize.height
          );
          if (
            imageSize.width < DEFINE.cover_image.min_width ||
            imageSize.height < DEFINE.cover_image.min_height
          ) {
            that.$toasted.error(
              `Please upload an image, which has a size of more than width ${DEFINE.cover_image.min_width} X height ${DEFINE.cover_image.min_height}!`
            );
            reject();
          } else {
            resolve(true);
          }
        };
      });
    },
    async cropSaveImage() {
      this.$toasted.clear();
      // if(!this.coverFileName || this.coverFileName == '' || this.coverFileName.trim() == ''){
      //   this.$toasted.error('Please enter cover filename!');
      //   return;
      // } else if(this.coverFileName && this.coverFileName.length > 150){
      //   this.$toasted.error('Cover filename is too long, it should not be more than 150 characters!');
      //   return;
      // }
      this.coverThumbnail = {};
      // get image data for post processing, e.g. upload or setting image src
      const croppedImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      //start : check minimum image width and height
      await this.coverImageSizeValidate(croppedImg)
        .then((validImage) => {
          if (validImage) {
            this.cropImg = croppedImg;
          } else {
            that.$toasted.error(
              `Please upload an image, which has a size of more than width ${DEFINE.cover_image.min_width} X height ${DEFINE.cover_image.min_height}!`
            );
            return;
          }
        })
        .catch((error) => {
          return;
        });
      if (!this.cropImg) {
        return;
      }
      //end : check minimum image width and height

      await this.$refs.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.updatedImageBlob = blob;
        await ThumbService.imageThumbnail(
          this.updatedImageBlob,
          DEFINE.thumbSize.coverImageThumbWidth
        ).then((thumb_data) => {
          Vue.set(this.coverThumbnail, "preview", thumb_data.preview);
          Vue.set(this.coverThumbnail, "file", thumb_data.file);
        });
      });

      if (this.cropImg) {
        this.previewCover = this.cropImg;
      }
      this.coveNameObject.name = this.coverFileName;
      this.imgSrc = null;
      this.$refs.coverFile.value = "";
      this.$modal.hide("modal_crop_image");
    },
    async cropImage() {
      this.coverThumbnail = {};
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.updatedImageBlob = blob;
        await ThumbService.imageThumbnail(
          this.updatedImageBlob,
          DEFINE.thumbSize.imageThumbWidth
        ).then((thumb_data) => {
          Vue.set(this.coverThumbnail, "preview", thumb_data.preview);
          Vue.set(this.coverThumbnail, "file", thumb_data.file);
        });
      });
    },
    reset() {
      this.$refs.cropper.reset();
      this.cropImg = null;
      this.coverFileName = null;
      this.coverFileName = JSON.parse(JSON.stringify(this.coveNameObject.name));
    },
    showFileChooser() {
      this.$refs.coverFile.click();
    },
    cropImageDone() {
      this.$toasted.clear();
      // if(!this.coverFileName || this.coverFileName == '' || this.coverFileName.trim() == ''){
      //   this.$toasted.error('Please enter cover filename!');
      //   return;
      // } else if(this.coverFileName && this.coverFileName.length > 150){
      //   this.$toasted.error('Cover filename is too long, it should not be more than 150 characters!');
      //   return;
      // }
      if (this.cropImg) {
        this.previewCover = this.cropImg;
      }
      this.coveNameObject.name = this.coverFileName;
      this.imgSrc = null;
      this.$refs.coverFile.value = "";
      this.$modal.hide("modal_crop_image");
    },
    cropImageCancel() {
      this.imgSrc = null;
      this.cropImg = null;
      this.updatedImageBlob = null;
      this.updatedImageFile = null;
      this.$refs.coverFile.value = "";
      this.$modal.hide("modal_crop_image");
    },
    cancelUpdateProfile() {
      this.hideMenuInfo = false;
      this.tabSelected = "";
      this.imgSrc = null;
      this.cropImg = null;
      this.updatedImageBlob = null;
      this.updatedImageFile = null;
      this.coveNameObject = {};
      this.coverFileName = null;
      this.$refs.coverFile.value = "";
      this.setUserData();
    },
    handleRenameDoc(media) {
      const index = this.form.media.indexOf(media);
      Vue.set(this.currentDoc, "index", index);
      this.$modal.show("rename_file_name");
    },
    fileRenameDone() {
      this.$modal.hide("rename_file_name");
    },
    closeInviteForm() {
      this.manageInvitations = false;
    },
  },
};
</script>

<style scoped>
.bubble {
  background: #fff;
  border-radius: 0.4em;
  box-shadow: 0px 0px 6px #b2b2b2;
}
.location-input {
  padding: 7px 8px;
}
.w-2btn {
  padding: 7px 8px;
  margin-left: 10px;
  float: right;
}
.search-btn-wrap {
  width: 100%;
  float: left;
  padding: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/*.close-btn.search.wrap{display: flex;align-items: center;flex-wrap: wrap;}*/
.vue-map-container {
  float: left;
}
.location-icon {
  background-image: url("../../../public/images/icons/location-icon.svg");
  background-repeat: no-repeat;
  background-position: right 12px top 14px;
}
.box-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
}
.cml-6 {
  margin-left: 2px !important;
}
/** cropper image modal style */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}
.header h2 {
  margin: 0;
}
.header a {
  text-decoration: none;
  color: black;
}
.content {
  display: flex;
  justify-content: space-between;
}
.cropper-area {
  width: 570px;
}
.actions {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #782541;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
}
textarea {
  width: 100%;
  height: 100px;
}
.preview-area {
  width: 307px;
}
.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
  color: #782541;
}
.preview-area p:last-of-type {
  margin-top: 1rem;
}
.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}
.cropped-image img {
  max-width: 100%;
}
.v--modal-box.v--modal {
  overflow: auto !important;
}
.cropper-area > textarea {
  display: none;
}

.modal-height-90 {
  height: 100vh !important;
  top: 0 !important;
}
.modal-height-90 .v--modal-box.v--modal {
  height: 90vh !important;
  top: 5vh !important;
}
.mrtop-minus-crop {
  margin-top: -8px !important;
}
.switch {
  position: relative;
  display: inline-block;
  width: 75px;
  height: 34px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #4d2545;
}

input:focus + .slider {
  box-shadow: 0 0 1px #4d2545;
}

input:checked + .slider:before {
  -webkit-transform: translateX(38px);
  -ms-transform: translateX(38px);
  transform: translateX(38px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
