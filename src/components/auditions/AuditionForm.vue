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
                <img src="/images/icons/person.png" alt="Icon" class="h-4 mr-2"/>
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
            >Add Contributor
            </base-button>

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
            >Online Submission
            </base-checkbox>
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
                    <div v-if="!previewCover" class="flex flex-col py-5 flex-no-wrap justify-between">
                        <p class="pb-6 text-purple">Cover photo</p>
                        <img src="/images/icons/file.svg"/>
                    </div>

                    <img v-else :src="previewCover" alt="Cover" class="w-full h-full object-cover"/>
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
            <!-- v-validate="'required|max:500'" -->
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
                    v-model="form.dates[0].from"
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
                    v-model="form.dates[0].to"
                    name="contract_end_date"
                    class="w-1/2 px-2"
                    type="date"
                    :mindate="form.dates[0].from"
                    placeholder="Contract End Date"
                    :custom-classes="['border', 'border-purple']"
                    :message="errors.first('create.contract_end_date')"
                    data-vv-as="end date"
                    @input="handleChangeDates('contract')"
            />
        </div>
        <div class="flex w-full">
            <!-- v-validate="'required'" -->
            <base-input
                    v-model="form.dates[1].from"
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
                    v-model="form.dates[1].to"
                    :mindate="form.dates[1].from"
                    name="rehearsal_end_date"
                    class="w-1/2 px-2"
                    type="date"
                    placeholder="Rehearsal End Date"
                    :custom-classes="['border', 'border-purple']"
                    :message="errors.first('create.rehearsal_end_date')"
                    data-vv-as="end date"
                    @input="handleChangeDates('rehearsal')"
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
            <p class="px-5 text-purple font-medium py-8 pb-6">Rounds</p>

            <div class="flex">
                <round-dropdown-form
                class="text-red-600 bg-white"
                :options="rounds"
                :selected="selected_round"
                :setround.sync="set_selected_round"
                @setOption="methodToRunOnSelect"
                v-on:updateOption="methodToRunOnSelect"
                :placeholder="'Select a Round'"
                ></round-dropdown-form>
                
            </div>
            <div v-for="(round,index) of rounds" :key="index">
                <div class="flex" v-if="selected_round.index == index">
                    <base-input                    
                        v-validate="'required'"
                        name="date"
                        v-model="round.date"
                        :mindate="new Date()"
                        class="w-1/3 px-2"
                        type="date"
                        placeholder="Date"
                        :custom-classes="['border', 'border-purple']"
                        :message="errors.first('create.date')"
                    />

                    <template>
                        <div class="relative h-12 my-2">
                            <custom-time-picker                    
                                class="timepicker-custom cus-des-timepicker px-2 text-left"
                                :onTimeChange="timeChangeHandler"
                                :defaultFocused="false"
                                v-validate="'required'"
                                :message="errors.first('create.time')"
                                placeholder="Time"
                                :HOURS="24"
                                colorPalette="dark"
                                theme="material"
                                :defaultHour="round.defaultHour"
                                :defaultMinute="round.defaultMinute"
                            >
                            </custom-time-picker>
                        </div>
                    </template> 

                        <button class="w-1/3 location-icon border border-purple rounded-full h-full py-3 px-6 h-12 my-2 text-left text-purple"
                            v-validate="'required'"
                            :custom-classes="['border', 'border-purple']"
                            name="location"
                            type="button"
                            :message="errors.first('create.location')"
                            @click="openLocationModel()"
                    >{{round.isSelected ? 'Location Saved' : 'Location'}}
                    </button>
                </div>
                <div class="flex" v-if="selected_round.index == index">
                    <button 
                            class="w-1/3 mt-4 py-3 px-4 border-4 border-purple text-purple rounded-full focus:outline-none"
                            type="button"
                            @click.prevent="round.manageAppointments = true"
                    >Manage Appointments
                    </button>    
                    <AppointmentsModal
                            v-if="round.manageAppointments"
                            :data="round.appointment"
                            @change="round.appointment = $event"
                            @close="round.manageAppointments = false"
                    />            
                </div>
            </div>
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
                    >{{ union.name }}
                    </div>
                </div>

                <p class="px-5 text-purple py-4">Contract type</p>
                <div class="flex px-4">
                    <div
                            v-for="contract_type in contract_types"
                            :key="contract_type.key"
                            class="py-2 px-4 uppercase border border-orange-500 mr-2 rounded-full cursor-pointer"
                            :class="[contract_type.selected ? 'bg-orange-500 text-white' : 'bg-white text-orange-500']"
                            @click="setTags($event, 'contract_types', false)"
                    >{{ contract_type.name }}
                    </div>
                </div>
                <p class="px-4 text-purple pt-4 pb-2">Production Type</p>
                <div class="flex flex-wrap px-4">
                    <div
                            v-for="production_type in production_types"
                            :key="production_type.key"
                            class="py-2 px-4 uppercase border border-pink-800 my-2 mr-2 rounded-full cursor-pointer"
                            :class="[production_type.selected ? 'bg-pink-800 text-white' : 'bg-white text-pink-800']"
                            @click="setTags($event, 'production_types', true)"
                    >{{ production_type.name }}
                    </div>
                </div>
            </div>
            <div class="managers w-3/5 flex flex-col items-end">            

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

                <button
                        class="w-2/3 mt-4 py-3 px-4 border-4 border-purple text-purple rounded-full focus:outline-none"
                        type="button"
                        @click.prevent="manageRoles = true"
                >{{ form.roles.length ? 'Edit' : 'Add' }} Roles
                </button>

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
                            <DocumentItem :media="media" @destroy="handleDeleteDocument" @renamedoc="handleRenameDoc" />
                        </slide>
                    </carousel>
                </div>

                <button
                        class="w-2/3 py-3 px-4 border-4 border-purple text-purple rounded-full focus:outline-none mb-4"
                        type="button"
                        :class="{ 'mt-4': !form.media.length }"
                        @click="openDocumentOptionModal"
                >Manage Documents
                </button>

                <base-button class="mt-auto w-2/3 mb-12" type="submit">Create Audition</base-button>
            </div>
        </div>

      
        <RolesModal
                v-if="manageRoles"
                :data="selectedRole"
                @save="handleSaveRole"
                @destroy="handleDeleteRole"
                @close="manageRoles = false"
        />
        <!-- Cover image crop modal -->
        <modal class="flex flex-col w-full items-center my-info-mdel" :width="600" :height="480" name="modal_crop_image">
            <div class="content my-info-content" ng-if="imgSrc">
                <section class="cropper-area">
                <div class="img-cropper">
                    <vue-cropper
                    ref="cropper"
                    :aspect-ratio="14/14"
                    :initial-aspect-ratio="1/1"
                    :src="imgSrc"
                    preview=".preview"
                    drag-mode="crop"
                    :minCropBoxWidth="minHeight"
                    :minCropBoxHeight="minWidth"
                    :auto-crop-area="0.5"
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
                    @click.prevent="resetCropImage"
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
                    </a> -->
                    <a
                    href="#"
                    role="button"
                    @click.prevent="cropImageCancel"
                    >
                    Cancel
                    </a>
                </div>
                <base-input
                    v-model="coverFileName"
                    :custom-classes="['border border-b border-gray-300']"
                    name="cover_file_name"
                    placeholder="Cover Name"
                    data-vv-as="cover name"
                    class="w-8/12"
                  />
                
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
                </section> -->
            </div>
        </modal>
        <modal class="flex flex-col items-center" :width="250" :height="250" name="modal_document_options">
            <div class="flex flex-col items-center text-purple text-lg mt-5 mb-2">
                <h1>Select Document</h1>
            </div>
            <div class="flex flex-col items-center">
                <input
                            ref="inputFile"
                            accept="audio/*,video/*,image/*, .pdf"
                            type="file"
                            multiple
                            hidden
                            @change="handleFile"
                    />

                    <button
                            class="w-2/3 py-3 px-4 border-4 border-purple text-purple rounded-full focus:outline-none mb-4"
                            type="button"
                            :class="{ 'mt-4': !form.media.length }"
                            @click="$refs.inputFile.click()"
                    >Add Files
                    </button>
                    <button
                            class="w-2/3 py-3 px-4 border-4 border-purple text-purple rounded-full focus:outline-none mb-4"
                            type="button"
                            :class="{ 'mt-4': !form.media.length }"
                            @click="showLinkManageModal"
                    >Add Links
                    </button>
            </div>
        </modal>
        <modal class="flex w-full items-center link-modal" :width="500" :height="650" name="modal_document_file_manage" :clickToClose="false">                        
          <div class="flex flex-col items-center text-purple text-lg mt-5 mb-2">
                <h1>Manage Documents Name</h1>
            </div>
            <div class="max-link-screen" id="link_container">            
                <div class="mt-5">
                    <div class="flex flex-col w-10/13 px-2 mb-5" v-for="(media, index) in form.media" :key="index">
                        <span class="relative px-2 text-purple"> Document {{(index+1)}} :</span>
                        <div class="relative h-12 w-9/12 my-2">
                            <base-input
                                v-model="media.name"
                                name="media_name[]"
                                class="w-full px-2"
                                placeholder="Name"
                                :custom-classes="['border', 'border-purple']"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="actions cus-action-btn">                           
                <a
                href="#"
                role="button"
                @click.prevent="documentFileManageDone"
                >
                Done
                </a>                
            </div>
            
        </modal>
        <modal class="flex w-full items-center link-modal" :width="500" :height="650" name="modal_document_link_manage" :clickToClose="false">            
            <div class="d-flex justify-end text-right top-add-btn" >
                <a
                href="#"
                role="button"
                @click.prevent="addNewLink"
                class="text-purple text-mg"
                >
                    Add New
                </a>
            </div>
            <div class="max-link-screen" id="link_container">            
                <div>
                    <div class="flex flex-col w-10/13 px-2 mb-5" v-for="(dlink, index) in document_links" :key="index">
                        <div class="relative h-12 w-9/12 my-2">
                            <base-input
                                v-model="dlink.name"
                                name="link_name[]"
                                class="w-full px-2"
                                placeholder="Name"
                                :custom-classes="['border', 'border-purple']"
                            />
                        </div>
                        <div class="relative h-12 w-10/13 my-2">
                            <div class="input-delete-link">
                                <base-input
                                    v-model="dlink.url"
                                    name="link_url[]"
                                    class="w-full px-2 w-9/12 cus-input"
                                    placeholder="URL"
                                    :custom-classes="['border', 'border-purple']"
                            />     
                            <img
                                src="/images/icons/icon3.png"
                                alt="Icon"
                                class="h-8"
                                @click="removeLink(index)"
                                v-if="index>0"
                            />   
                            </div>                    
                        </div>
                        
                    </div>
                </div>
            </div>

            <div class="actions cus-action-btn">            
                <a
                href="#"
                role="button"
                @click.prevent="linkManageCancel"
                >
                Cancel
                </a>
                <a
                href="#"
                role="button"
                @click.prevent="linkManageDone"
                >
                Done
                </a>                
            </div>
            
        </modal>
        <modal class="flex flex-col w-full items-center" :width="450" :height="200" name="rename_file_name" :clickToClose="false">
            <div class="flex flex-col items-center text-purple text-lg mt-5 mb-2">
                  <h1>Document Rename</h1>
            </div>
            <div class="content my-info-content" >              
              <section class="image-preview-area">                
                  <div class="flex justify-center mb-4 items-center px-3 w-full">
                    <div class="w-full  ml-4 text-purple px-2">
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
                  <a
                    href="#"
                    role="button"
                    @click.prevent="fileRenameDone"
                  >
                    Done
                  </a>
                </div>
            </div>
          </section>
        </div>
      </modal>
            
    </form>
</template>

<script>
import Vue from "vue";
import uuid from "uuid/v1";
import firebase from "firebase/app";
import axios from "axios";
import AppointmentsModal from "./AppointmentsModal.vue";
import RolesModal from "./RolesModal.vue";
import ContributorItem from "./ContributorItem.vue";
import DocumentItem from "./DocumentItem.vue";
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
import DEFINE from "../../utils/const.js";
Vue.use(VueGoogleMaps, {
  load: {
    key: DEFINE.google.key,
    libraries: DEFINE.google.libraries
  }
});

import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

import moment from "moment";

import customTimePicker from "../custom/custom-clock-picker/components/customTimePicker.vue";
import ThumbService from '@/services/ThumbService';

import _ from "lodash";

export default {
  name: "AuditionForm",
  components: {
    AppointmentsModal,
    RolesModal,
    ContributorItem,
    DocumentItem,
    Loading,
    customTimePicker,
    VueCropper
  },
  data() {
    return {
      clock_mode: 12,
      defaultHour: "0",
      defaultMinute: "0",
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
      document_links: [
        {
          name: "",
          url: "",
          type: 5,
          share: "yes"
        }
      ],
      union_status: [
        // {
        //     value: "any",
        //     name: "Any",
        //     selected: false
        // },
        {
          value: "UNION",
          name: "Union",
          selected: true
        },
        {
          value: "NONUNION",
          name: "Non Union",
          selected: false
        }
      ],
      contract_types: [
        // {
        //     key: "any",
        //     name: "Any",
        //     selected: false
        // },
        {
          key: "PAID",
          name: "Paid",
          selected: true
        },
        {
          key: "UNPAID",
          name: "Unpaid",
          selected: false
        }
      ],
      production_types: [
        {
          key: "THEATER",
          name: "Theater",
          selected: true
        },
        {
          key: "FILM",
          name: "Film",
          selected: false
        },
        {
          key: "VOICEOVER",
          name: "VoiceOver",
          selected: false
        },
        {
          key: "COMMERCIALS",
          name: "Commercials",
          selected: false
        },
        {
          key: "PERFORMING ARTS",
          name: "Performing Arts",
          selected: false
        },
        {
          key: "MODELING",
          name: "Modeling",
          selected: false
        },
        {
          key: "TV & VIDEO",
          name: "TV & Video",
          selected: false
        }
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
      rounds: [
        {
          name: "Round 1",
          round: 1,
          index: 0,
          manageAppointments: false,
          defaultHour: 0,
          defaultMinute: 0,
          selectedLocation: null,
          isSelected: false
        }
      ],
      selected_round: {
        name: "Round 1",
        round: 1,
        index: 0
      },
      set_selected_round : {
        name: "Round 1",
        round: 1,
        index: 0
      },
      coverThumbnail : {},
      coverFileName :  null,
      coveNameObject : {},
      currentDoc : {},
    };
  },
  watch: {
    manageRoles(value) {
      if (!value) {
        this.selectedRole = null;
      }
    }
  },
  created() {
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    handleRenameDoc(media){      
      const index = this.form.media.indexOf(media);
      Vue.set(this.currentDoc, 'index', index);
      this.$modal.show('rename_file_name');
    },
    fileRenameDone(){
      this.$modal.hide('rename_file_name');
    },
    onResize() {
      this.innerWidth = window.innerWidth;
    },

    openLocationModel() {
      this.$modal.show("location_model");
      this.geolocate();
    },

    closeLocationModelOld(type) {
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

    closeLocationModel(type) {
      if (type == "save") {
        this.changeLocationBtnTxt = true;
        this.rounds[
          this.selected_round.index
        ].selectedLocation = this.selectedLocation;
        
        this.rounds[this.selected_round.index].isSelected = true;
        this.$modal.hide("location_model");
      } else {
        this.changeLocationBtnTxt = false;
        this.$modal.hide("location_model");
        this.currentPlace = null;
      }
      this.selectedLocation = null;
    },

    async handleInvitation() {
      if (
        !this.invitation.email ||
        this.form.contributors.find(
          x => x.email === this.invitation.email.toLowerCase()
        ) ||
        !await this.$validator.validateAll("invitation")
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
    openDocumentOptionModal() {
      this.$modal.show("modal_document_options");
    },
    closeDocumentOptionModal() {
      this.$modal.hide("modal_document_options");
    },
    showLinkManageModal() {
      this.$modal.show("modal_document_link_manage");
      this.closeDocumentOptionModal();
    },
    closeLinkManageModal() {
      this.$modal.hide("modal_document_link_manage");
    },
    showDocFileManageModal() {
      this.$modal.show("modal_document_file_manage");
      this.closeDocumentOptionModal();
    },
    closeDocFileManageModal() {
      this.$modal.hide("modal_document_file_manage");
    },
    defaultLinkData() {
      return {
        name: "",
        url: "",
        type: 5,
        share: "yes"
      };
    },
    async addNewLink() {
      this.$toasted.clear();
      let lastRecord = this.document_links[this.document_links.length - 1]
        ? this.document_links[this.document_links.length - 1]
        : {};
      if (lastRecord.name == "" || lastRecord.url == "") {
        this.$toasted.error("Please enter url details!");
      } else {
        await this.document_links.push(this.defaultLinkData());
      }
      let container = this.$el.querySelector("#link_container");
      container.scrollTop = container.scrollHeight;
    },
    removeLink(index) {
      this.document_links.splice(index, 1);
    },
    linkManageCancel() {
      this.document_links = [this.defaultLinkData()];
      this.closeLinkManageModal();
    },
    documentFileManageDone() {
      this.$toasted.clear();
      let documentHasError = false;
      let documentHasErrorMsg = 'Any documents should not be without a filename!';      
      for (var di = 0; di < this.form.media.length; di++) {
        if(!this.form.media[di].name || this.form.media[di].name == '' || this.form.media[di].name == ''){
          documentHasErrorMsg = 'Any documents should not be without a filename!';
          documentHasError = true;
          break;
        } else if(this.form.media[di].name && this.form.media[di].name.length > 150){
          documentHasErrorMsg = 'Any document filename is too long, it should not be more than 150 characters!';
          documentHasError = true;
          break;
        }
      }
      if(documentHasError){
          this.$toasted.error(documentHasErrorMsg);
          return;
      }
      
      this.closeDocFileManageModal();
    },    
    linkManageDone() {
      this.$toasted.clear();
      let lastRecord = this.document_links[this.document_links.length - 1]
        ? this.document_links[this.document_links.length - 1]
        : {};
      if (lastRecord.name == "" || lastRecord.url == "") {
        this.$toasted.error("Please enter url details!");
        let container = this.$el.querySelector("#link_container");
        container.scrollTop = container.scrollHeight;
      } else {
        this.document_links
          // .filter(file => !this.form.media.some(x => x.name === file.name))
          .forEach(link => {
            this.form.media.push({
              name: link.name,
              type: link.type,
              url: link.url,
              file: null,
              share: "yes"
            });
          });
        this.closeLinkManageModal();
        this.document_links = [this.defaultLinkData()];
      }
    },
    async handleFile(e) {
      const files = Array.from(e.target.files);

      await files
        .filter((file) => !this.form.media.some(x => x.name === file.name))
        .forEach(async (file) => {
          const extension = file.name.split(".").pop();

          const file_type = this.getFileType(file);

          if (file_type > 0) {
            let currentMedia = {
              name: file.name,
              org_name: file.name,
              type: file_type,
              url: file,
              file: file,
              share: "yes"
            };

            if (file.type.match('image')) {
              await ThumbService.imageThumbnail(file, DEFINE.thumbSize.docImageThumbWidth).then((thumb_data) => {              
                currentMedia.thumb_file = thumb_data.file;
                currentMedia.preview = thumb_data.preview;
              });
            } else if(file.type.match('video')) {
              await ThumbService.videoThumbnail(file, DEFINE.thumbSize.videoThumbWidth).then((thumb_data) => {
                currentMedia.thumb_file = thumb_data.file;
                currentMedia.preview = thumb_data.preview;
              });
            }
            await this.form.media.push(currentMedia);
          }
        });
      this.$refs.inputFile.value = "";    
      this.showDocFileManageModal();  
    },
    getFileType(file) {
      if (file.type.match("audio.*")) return 1;
      else if (file.type.match("video.*")) return 2;
      else if (file.type.match("pdf.*")) return 3;
      else if (file.type.match("image.*")) return 4;
      else return 0;
    },
    handleCoverFile(e) {
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
        this.coverFileName = JSON.parse(JSON.stringify(this.updatedImageFile.name));
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
          moment(this.form.dates[0].from).isAfter(this.form.dates[0].to, "day")
        ) {
          this.form.dates[0].to = "";
        }
      } else if (type == "rehearsal") {
        if (
          moment(this.form.dates[1].from).isAfter(this.form.dates[1].to, "day")
        ) {
          this.form.dates[1].to = "";
        }
      }
    },

    async handleCreate() {
      // console.log("TCL: handleCreate -> this.form", this.form)
      let coverSnapshot = null,
        rolesSnapshots = [],
        rolesThumbailSnapshots = [],
        filesThumbailSnaphosts = [],
        filesSnaphosts = [];
      this.$toasted.clear();
      try {
        if (this.isLoading) {
          return;
        }

        if (
          moment.isDate(this.form.dates[0].from) &&
          !moment.isDate(this.form.dates[0].to)
        ) {
          this.$toasted.error("The contract end date field is required.");
          return;
        }

        if (
          moment.isDate(this.form.dates[1].from) &&
          !moment.isDate(this.form.dates[1].to)
        ) {
          this.$toasted.error("The rehearsal end date field is required.");
          return;
        }

        if (
          !moment.isDate(this.form.dates[0].from) &&
          moment.isDate(this.form.dates[0].to)
        ) {
          this.$toasted.error("The contract from date field is required.");
          return;
        }

        if (
          !moment.isDate(this.form.dates[1].from) &&
          moment.isDate(this.form.dates[1].to)
        ) {
          this.$toasted.error("The rehearsal from date field is required.");
          return;
        }
        if (this.form.roles.length == 0) {
          this.$toasted.error("Please add at least one role.");
          return;
        }

        if (this.updatedImageBlob && this.updatedImageFile) {
          this.updatedImageBlob.name = this.coveNameObject.name;
          this.form.cover_file = this.updatedImageBlob;
          this.form.cover_name = this.coveNameObject.name;
          this.form.cover_org_name = this.coveNameObject.org_name;
        } else {
          this.form.cover_file = null;
          this.form.cover_name = null;
          this.form.cover_org_name = null;
        }

        if (!this.form.cover_file) {
          this.$toasted.error("The cover field is required.");
          return;
        }

        let data = Object.assign({}, this.form);
        if (data.online) {
          data.rounds = [
            {
              location: null,
              appointment: {
                spaces: 10,
                type: 1,
                length: "20",
                start: "10:00",
                end: "18:00",
                slots: null
              }
            }
          ];
        } else {
            data.online = false;
            let roundHasError = false;
            let rounErrorMsg = "Please enter valid details of rounds."
            data.rounds = this.rounds;            
            if(!data.rounds || data.rounds.length == 0){
                this.$toasted.error(rounErrorMsg);
                return;
            }
            
            for (var i = 0; i < data.rounds.length; i++) {

                if(!data.rounds[i].date || data.rounds[i].date == ''){
                    roundHasError = true;
                    rounErrorMsg = `Please enter date of round ${(i+1)}.`;
                    break;
                } else if(!data.rounds[i].time || data.rounds[i].time == ''){
                    roundHasError = true;
                    rounErrorMsg = `Please enter time of round ${(i+1)}.`;
                    break;
                } else if(!data.rounds[i].appointment || data.rounds[i].appointment == '' || _.isEmpty(data.rounds[i].appointment)){
                    roundHasError = true;
                    rounErrorMsg = `Please enter appointments of round ${(i+1)}.`;
                    break;
                } else if(!data.rounds[i].selectedLocation || data.rounds[i].selectedLocation == '' || _.isEmpty(data.rounds[i].selectedLocation)){
                    roundHasError = true;
                    rounErrorMsg = `Please enter location of round ${(i+1)}.`;
                    break;
                } else {
                    data.rounds[i].location = {
                        latitude: data.rounds[i].selectedLocation.geometry.location.lat(),
                        longitude: data.rounds[i].selectedLocation.geometry.location.lng(),
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0043
                    };
                    delete data.rounds[i].selectedLocation;
                }
            }

            if(roundHasError){
                this.$toasted.error(rounErrorMsg);
                return;    
            }
        }

        this.isLoading = true;
        data.union = this.union_status.find(x => x.selected).value;
        data.contract = this.contract_types.find(x => x.selected).key;
        data.production = this.production_types
          .filter((x) => x.selected)
          .map((x) => x.key)
          .join(",");

        // upload cover thumbnail file
        let coverThumbnailUrl;
        if(this.coverThumbnail.file){
          const thumbnailFileSnapshot = await firebase.storage()
          .ref(`audition_cover/thumbnail/${uuid()}.png`)
          .put(this.coverThumbnail.file);        
          coverThumbnailUrl = await thumbnailFileSnapshot.ref.getDownloadURL();          
        }
        // Upload cover
        const coverRxtension = this.form.cover_org_name.substring(this.form.cover_org_name.lastIndexOf('.')+1);
        const coverFilePath = data.cover_name.includes(`${coverRxtension}`) ? `audition_cover/${uuid()}_${data.cover_name}` : `audition_cover/${uuid()}_${data.cover_name}.${coverRxtension}`;
        coverSnapshot = await firebase
          .storage()
          .ref(coverFilePath)
          .put(data.cover_file);

        data.cover = await coverSnapshot.ref.getDownloadURL();        
        console.log("handleCreate -> data.cover", data.cover)
        data.cover_thumbnail = coverThumbnailUrl ? coverThumbnailUrl : null;
        console.log("handleCreate -> data.cover_thumbnail", data.cover_thumbnail)
        data.cover_name = data.cover_name;
        return
        // Upload roles
        await Promise.all(
          data.roles.map(async (role) => {
            if (role.cover_file != undefined) {
              delete role.preview;
              // Upload role cover thumbnail
              let roleThumbnailUrl = null;
              if(role.thumb_file && role.thumb_file != undefined){
                const thumbnailFileSnapshot = await firebase.storage()
                .ref(`audition_role_cover/thumbnail/${uuid()}.png`)
                .put(role.thumb_file);        
                roleThumbnailUrl = await thumbnailFileSnapshot.ref.getDownloadURL();                
                rolesThumbailSnapshots.push(thumbnailFileSnapshot);
              }

              // Upload role cover
              const roleCoverExtension = role.cover_file.name.substring(role.cover_file.name.lastIndexOf('.')+1);
              const roleCoverFilePath = role.name_cover.includes(`${roleCoverExtension}`) ? `audition_role_cover/${uuid()}_${role.name_cover}` : `audition_role_cover/${uuid()}_${role.name_cover}.${roleCoverExtension}`;
              const snapshot = await firebase
                .storage()
                .ref(roleCoverFilePath)
                .put(role.cover_file);

              role.cover = await snapshot.ref.getDownloadURL();
              role.cover_thumbnail = roleThumbnailUrl ? roleThumbnailUrl : null;
              rolesSnapshots.push(snapshot);
            }
          })
        );

        // Upload files
        await Promise.all(
          data.media.map(async (Media) => {
            if (Media.type != 5) {
              if(Media.preview){
                delete Media.preview;
              }
              // Upload doc thumbnail if image or video file
              let fileThumbnailUrl = null;              
              if(Media.thumb_file && Media.thumb_file != undefined){
                const thumbnailFileSnapshot = await firebase.storage()
                .ref(`audition_doc/thumbnail/${uuid()}.png`)
                .put(Media.thumb_file);        
                fileThumbnailUrl = await thumbnailFileSnapshot.ref.getDownloadURL();
                filesThumbailSnaphosts.push(thumbnailFileSnapshot);
              }

              // uplaod doc file
              const docExtension = Media.file.name.substring(Media.file.name.lastIndexOf('.')+1);
              const docFilePath = Media.name.includes(`${docExtension}`) ? `audition_doc/${uuid()}_${Media.name}` : `audition_doc/${uuid()}_${Media.name}.${docExtension}`;
              const snapshot = await firebase
                .storage()
                .ref(docFilePath)
                .put(Media.file);

              Media.url = await snapshot.ref.getDownloadURL();
              Media.thumbnail = fileThumbnailUrl ? fileThumbnailUrl : null;
              filesSnaphosts.push(snapshot);
            }
          })
        );
        
        let action = await axios.post("/t/auditions/create", data);
        
        this.isLoading = false;
        this.$toasted.success("The audition has created successfully.");
        this.$router.push({
          name: "auditions/detail",
          params: { id: action.data.data.data.id }
        });
      } catch (e) {
        console.log(e);
        this.isLoading = false;
        let errorMsg =
          e.response && e.response.data && e.response.data.errors
            ? this.$options.filters.getErrorMsg(e.response.data.errors)
            : null;
        this.$toasted.error(
          errorMsg ? errorMsg : "Audition not created, try later."
        );
        coverSnapshot && coverSnapshot.ref.delete();
        if(thumbnailFileSnapshot){
          thumbnailFileSnapshot.ref.delete();
        }
        await Promise.all(rolesSnapshots.map(role => role.ref.delete()));
        await Promise.all(rolesThumbailSnapshots.map(role => role.ref.delete()));        
        await Promise.all(filesSnaphosts.map(file => file.ref.delete()));
        await Promise.all(filesThumbailSnaphosts.map(role => role.ref.delete()));        
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
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    timeChangeHandler: function(event) {      
      this.selected_round.defaultHour = event.hour ? event.hour : 0;
      this.selected_round.defaultMinute = event.minute ? event.minute : 0;
      this.selected_round.time = event.hour > 0 || event.minute > 0 ? `${event.hour}:${event.minute}` : "";
      this.rounds[this.selected_round.index].time = this.selected_round.time;
      this.rounds[this.selected_round.index].defaultHour = this.selected_round.defaultHour;
      this.rounds[this.selected_round.index].defaultMinute = this.selected_round.defaultMinute;
    },
    imgUrlAlt(event) {
      event.target.src = DEFINE.role_placeholder;
    },
    async cropSaveImage() {
      this.$toasted.clear();
      if(!this.coverFileName || this.coverFileName == '' || this.coverFileName.trim() == ''){
        this.$toasted.error('Please enter cover filename!');
        return;
      } else if(this.coverFileName && this.coverFileName.length > 150){
        this.$toasted.error('Cover filename is too long, it should not be more than 150 characters!');
        return;
      }
      
      this.coverThumbnail = {};
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      await this.$refs.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.updatedImageBlob = blob;
        await ThumbService.imageThumbnail(this.updatedImageBlob, DEFINE.thumbSize.coverImageThumbWidth).then((thumb_data) => {
          Vue.set(this.coverThumbnail, 'preview', thumb_data.preview);
          Vue.set(this.coverThumbnail, 'file', thumb_data.file);
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
        await ThumbService.imageThumbnail(this.updatedImageBlob, DEFINE.thumbSize.imageThumbWidth).then((thumb_data) => {
          Vue.set(this.coverThumbnail, 'preview', thumb_data.preview);
          Vue.set(this.coverThumbnail, 'file', thumb_data.file);
        });
      });
    },
    resetCropImage() {
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
      if(!this.coverFileName || this.coverFileName == '' || this.coverFileName.trim() == ''){
        this.$toasted.error('Please enter cover filename!');
        return;
      } else if(this.coverFileName && this.coverFileName.length > 150){
        this.$toasted.error('Cover filename is too long, it should not be more than 150 characters!');
        return;
      }
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
      this.coveNameObject = {};
      this.coverFileName = null;
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
      this.$refs.coverFile.value = "";
      this.setUserData();
    },
    async methodToRunOnSelect(payload) {      
      if (payload == "create") {
        // if select create new round then add new one in option list
        let newRound = {
          name: "Round " + (this.rounds.length + 1),
          round: this.rounds.length + 1,
          index: this.rounds.length,
          manageAppointments: false,
          defaultHour: 0,
          defaultMinute: 0,
          selectedLocation: null,
          isSelected: false
        };
        this.rounds.push(newRound);
        this.selected_round = newRound;
        this.set_selected_round = this.selected_round;
      } else {
        //manage selected round details
        this.selected_round = payload;
      }      
      
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

/* .time-picker-preview.active {
        border-color: #782541 !important;
        background-color: #782541 !important;
    } */
.box-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
}
.cml-6 {
  margin-left: 2px !important;
}
.VueCarousel-navigation-button {
  color: #592543 !important;
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
  width: 614px;
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
  margin-bottom: 1rem;
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
.max-link-screen {
  /* max-height: 450px !important; */
  height: calc(100% - 110px);
  overflow-y: auto !important;
}
.input-delete-link {
  display: flex;
  align-items: center;
}
.input-delete-link .cus-input {
  max-width: 75% !important;
}
.top-add-btn {
  padding: 10px 15px 0px 0px !important;
}

.cus-action-btn {
  display: flex;
  justify-content: center;
}
</style>


