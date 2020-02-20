<!-- eslint-disable max-len -->
<template>
  <section class="bg-sidebar flex flex-col items-center h-full">
    <div class="flex items-center w-full sticky" v-if="!videoSection">
      <div
        :class="{ 'border-b-4 border-gray-600 border-purple': info, 'border-b-2 border-gray-400 text-gray-500':!info }"
        class="flex items-center h-full w-1/2 text-center font-bold"
      >
        <h4 class="font-bold w-full m-2" @click="changeInfo()">Info</h4>
      </div>
      <div
        :class="{ 'border-b-4 border-gray-600 border-purple': manage, 'border-b-2 border-gray-400 text-gray-500':!manage }"
        class="flex items-center h-full w-1/2 text-center"
      >
        <h4 class="font-bold w-full m-2" @click="changeManage()">Manage</h4>
      </div>
    </div>
    <transition name="fade">
      <div
        v-show="info"
        :class="{'hidden': !info}"
        class="flex flex-wrap justify-center overflow-scroll"
      >
        <div class="container flex w-full mt-3">
          <div class="w-full text-center">
            <h1 class="font-bold text-2xl text-left ml-20 tracking-wide">{{ audition.title }}</h1>
          </div>
        </div>
        <div class="container flex w-full px-20">
          <div class="w-1/2 text-left">
            <h4 class="text-left text-sm">{{ $dayjs(audition.date).format('MMMM Do YYYY') }}</h4>
          </div>
          <div class="w-1/4 text-left">
            <h4 class="text-left text-sm">{{ audition.time }}</h4>
          </div>
        </div>
        <div class="container flex w-full mb-5 mt-2">
          <div class="w-full text-center">
            <h1
              class="font-bold text-sm text-left ml-20 tracking-wide purple-light"
            >{{ audition.agency }}</h1>
          </div>
        </div>
        <div class="w-10/12 border border-gray-300" />
        <div class="container flex w-full mt-3">
          <div class="w-full text-center">
            <h1
              class="font-bold text-l text-left ml-20 tracking-wide purple-light"
            >{{ audition.apointment?audition.apointment.slots.length:0 }} Apointments</h1>
          </div>
        </div>

        <div class="w-10/12 border border-gray-300 mt-3" />
        <div class="container flex flex-wrap justify-center w-full mt-3">
          <div class="flex w-10/12 text-center justify-center flex-wrap">
            <div class="m-1 content-center rounded-full purple-back w-16 h-10 flex items-center">
              <p
                class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide"
              >{{audition.union?audition.union.toUpperCase():""}}</p>
            </div>
            <div class="m-1 content-center rounded-full yellow-light w-16 h-10 flex items-center">
              <p
                class="text-white text-xs font-bold content-center tracking-tighter flex-1 wide"
              >{{audition.contract?audition.contract.toUpperCase():""}}</p>
            </div>
            <div
              v-for="data in audition.production"
              :key="data.id"
              class="m-1 content-center rounded-full red-light w-24 h-10 flex items-center"
            >
              <p
                class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide truncate p-2"
              >{{ data.toUpperCase() }}</p>
            </div>
          </div>
        </div>

        <div class="w-10/12 border border-gray-300 mt-3" />

        <div class="container flex w-full mt-3 justify-center flex-wrap">
          <div class="flex w-9/12 text-justify">
            <p class="text-purple text-sm">{{ audition.description }}</p>
          </div>
        </div>

        <div class="w-10/12 border border-gray-300 mt-3" />

        <div class="container flex w-full mt-3 justify-center flex-wrap">
          <a
            class="text-purple font-bold text-xs text-center"
            :href="audition.url"
            target="_blank"
          >{{ audition.url }}</a>
        </div>

        <div class="w-10/12 border border-gray-300 mt-3" />
        <div class="container flex w-full mt-3">
          <div class="flex w-full text-center justify-center flex-wrap">
            <carousel class="flex" :per-page="4" :pagination-enabled="false">
              <slide v-for="data in audition.roles" :key="data.id" class="text-center">
                <div
                  class="m-3 rounded-full red-light flex items-center w-12 h-12 button-detail bg-cover"
                  :style="{ backgroundImage: 'url(' + data.image.url + ')' }"
                ></div>
                <p
                  class="text-purple text-xs justify-center w-16 font-bold tracking-tighter flex-1"
                >{{ data.name }}</p>
              </slide>
            </carousel>
          </div>
        </div>
        <div class="w-10/12 border border-gray-300"></div>
        <div class="container flex w-full mt-3">
          <div class="container flex w-full mt-3">
            <div class="flex w-full text-center justify-center flex-wrap">
              <div
                v-for="data in audition.media"
                :key="data.id"
                class="flex m-3 content-center w-full h-16 flex justify-center truncate"
              >
                <div class="flex justify-center w-9/12 button-detail rounded-lg">
                  <div class="flex flex-col flex-none items-center justify-center text-white flex-wrap w-1/5 h-full">
                  <template v-if="data.type == 'audio'">
                    <img
                      
                      src="/images/icons/music@2x.png"
                      alt="Icon"
                      class="h-8"
                    />
                    <span class="mt-1">MP3</span>
                  </template>
                    <template v-else-if="data.type == 'video'">
                      <img
                        src="/images/icons/video@2x.png"
                        alt="Icon"
                        class="h-8"
                      />
                      <span class="mt-1">MP4</span>
                    </template>
                    <template v-else-if="data.type == 'doc'">
                      <img
                        src="/images/icons/doc-icon3x.png"
                        alt="Icon"
                        class="h-8"
                      />
                      <span class="mt-1">PDF</span>
                    </template>
                    <template v-else-if="data.type == 'image'">
                      <img                        
                        src="/images/icons/pic-icon@2x.png"
                        alt="Icon"
                        class="h-8"
                      />
                      <span class="mt-1">IMAGE</span>
                    </template>
                    <template v-else-if="data.type == 'sheet'">
                      <img                        
                        src="/images/icons/link@2x.png"
                        alt="Icon"
                        class="h-8"
                      />
                      <span class="mt-1">URL</span>
                    </template>
                  </div>
                  <div
                    class="flex content-center relative flex-wrap w-full h-full bg-white truncate"
                  >
                    <span class="text-center text-purple font-bold truncate w-96">{{ data.name }}</span>
                    <a :href="setUrl(data.url)" target="_blank" rel="noopener noreferrer">
                      <img
                        src="/images/icons/more-icon@3x.png"
                        alt="Icon"
                        class="h-6 absolute right-0 bottom-0"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-10/12 border border-gray-300 mt-3"></div>
        <div class="container flex w-full mt-3">
          <div
            v-for="data in audition.contributors"
            :key="data.id"
            class="flex justify-center w-full"
          >
            <figure class="flex justify-center mr-4 w-6">
              <img :src="`/images/icons/person.png`" alt="Icon" class="h-6" />
            </figure>
            <span class="font-bold text-lg">{{ data.contributor_info.details.first_name }} {{data.contributor_info.details.last_name}}</span>
          </div>
        </div>
        <div class="w-10/12 border border-gray-300 mt-3" />
        <router-link
          class="w-full"
          v-if="audition.status == 0 "
          :to="{ name: 'auditions.update', params: {id: audition.id } }"
        >
          <div class="container flex w-full mt-3 cursor-pointer">
            <div class="flex w-full text-center justify-center flex-wrap">
              <div
                class="m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail"
              >
                <p class="text-white text-sm font-bold content-center tracking-tighter flex-1">Edit</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="manage" :class="{'hidden': !manage}">
        <div v-show="manage && (audition.status == 1||audition.status == 2)">
          <div class="flex w-full content-center text-center justify-center flex-wrap">
            <dropdown
              class="text-red-600 bg-white"
              :options="rounds"
              :selected="object"
              @setOption="methodToRunOnSelect"
              v-on:updateOption="methodToRunOnSelect"
              :state.sync="statusChild"
              :online="audition.online"
              :placeholder="'Select an Item'"
              :audition="audition.status"
            ></dropdown>
          </div>
        </div>
        <div
          v-if="roundActive.status != 0 && audition.status == 1 && roundActive.status > 0 && audition.online == 0"
          class="w-full border border-gray-300 mt-6 mb-6"
        />
        <div
          v-if="roundActive.status != 0 && audition.status == 1 && roundActive.status > 0 && audition.online == 0"
          class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer"
        >
          <button
            @click="openConfirmCheckInmodal"
            class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10"
          >
            <p
              class="flex-1 text-purple text-sm font-semibold content-center tracking-tighter flex-1"
            >Enter Check-In Mode</p>
          </button>
        </div>
        <div
          v-if="roundActive.status != 0 && audition.status == 1 && roundActive.status > 0 && audition.online == 0"
          class="w-full border border-gray-300 mt-6 mb-6"
        />
        <div
          v-if="roundActive.status != 0 && audition.status == 1 && roundActive.status > 0 && audition.online == 0"
          class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer"
        >
          <!-- <router-link :to="{ name: 'monitor-update', params: {id: roundActive.id,auditionId:audition.id } }"> -->
            <div
              @click="openConfirmMonitorInmodal"
              class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10"
            >
              <p
                class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1"
              >Enter Monitor Mode</p>
            </div>
          <!-- </router-link> -->
        </div>
        <div v-if="audition.status == 0" class="w-full border border-gray-300 mt-6 mb-6" />
        <div
          v-if="audition.status == 0"
          class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer"
        >
          <div
            class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10"
            @click="changeStatus"
          >
            <p
              class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1"
            >Open Auditions</p>
          </div>
        </div>
        <div
          v-if="audition.status == 1 && roundActive.status > 0"
          class="w-full border border-gray-300 mt-6 mb-6"
        />
        <div
          v-if="audition.status == 1 && roundActive.status > 0"
          class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer"
          @click="closeRounds"
        >
          <div
            class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10"
          >
            <p
              class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1"
            >Close Round</p>
          </div>
        </div>
        <div class="w-full border border-gray-300 mt-6 mb-6" />
        <div
          class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer"
          @click="auditionVideo()"
        >
          <div
            class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10"
          >
            <p
              class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1"
            >Audition Videos</p>
          </div>
        </div>
        <div v-if="audition.status == 2" class="w-full border border-gray-300 mt-6 mb-6" />
        <div
          v-if="audition.status == 2"
          class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer"
          @click="emmitFinalCast()"
        >
          <div
            class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10"
          >
            <p
              class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1"
            >Final Cast List</p>
          </div>
        </div>
        <div v-if="audition.status == 2" class="w-full border border-gray-300 mt-6 mb-6" />
        <div
          v-if="audition.status == 2"
          class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer"
          @click="exportAnalytics()"
        >
          <div
            class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10"
          >
            <p
              class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1"
            >Export Analytics</p>
          </div>
        </div>
        <div v-if="audition.status == 1" class="w-full border border-gray-300 mt-6 mb-6" />
        <div
          v-if="audition.status == 1"
          class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer"
          @click="close"
        >
          <div
            class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10"
          >
            <p
              class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1"
            >Close Auditions</p>
          </div>
        </div>
      </div>
    </transition>
<!-- {{audition}} -->
    <transition name="fade">
      <div
        v-show="videoSection"
        :class="{'hidden': !videoSection}"
        class="flex flex-wrap w-full justify-center align-content-start minh-100vh overflow-scroll"
      >
        <!-- <div class="w-10/12 border border-gray-300"></div> -->
        <div class="container flex w-full mt-2">
          <div class="container flex w-full mt-2">
            <div class="flex w-full text-center justify-center flex-wrap">
              <div class="flex content-around w-100 items-center relative cmb-10">
                <img
                  src="/images/icons/left_arrow.png"
                  class="absolute left-0"
                  @click="resetOptions"
                />
                <h1 class="text-purple text-lg font-bold">Audition Videos</h1>
              </div>
              <!-- <div class="w-full border border-gray-300 mt-1 mb-6" /> -->
              <div
                v-for="data in videos"
                :key="data.id"
                class="flex m-3 content-center w-full h-16 flex justify-center"
              >
                <div class="flex justify-center w-90 h-80 button-detail rounded-lg">
                  <div class="flex justify-center h-100 content-center flex-wrap w-1/2 h-full">
                    <img src="/images/icons/mp4Icon@3x.png" alt="Icon" class="h-10" />
                  </div>
                  <div
                    class="flex h-100 content-center items-center relative w-full h-full bg-white mp-box"
                  >
                    <span class="text-center cus-spn-cls text-purple font-bold w-full">{{ data.name }}</span>
                    <ul id="navigation">
                      <li>
                        <!-- <a href="#" :class="{ active }" @click="isOpen = !isOpen, active = !active"> -->
                        <a
                          href="javascript:void(0);"
                          :class="{ active }"
                          @click="openMenu(data.id)"
                        >
                          <img
                            src="/images/icons/more-icon@3x.png"
                            alt="Icon"
                            class="h-6 absolute right-0 bottom-0"
                          />
                        </a>
                        <!-- <div class="dropdown submanu" :class="{ isOpen }"> -->
                        <div class="dropdown cus-dropdown submanu" v-bind:class="{ 'isOpen' : openId==data.id}">
                          <ul class="submanu-content">
                            <li>
                              <a :href="data.url" title="Share" target="_blank">Share</a>
                            </li>
                            <li>
                              <a :href="data.url" title="Open in" target="_blank">Open in</a>
                            </li>
                            <li>
                              <a
                                href="javascript:void(0);"
                                @click="auditionDeleteVideo(data.id)"
                                title="Delete"
                              >Delete</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                    <!-- <a :href="data.url" target="_blank">
                      <img
                        src="/images/icons/more-icon@3x.png"
                        alt="Icon"
                        class="h-6 absolute right-0 bottom-0"
                      />
                    </a>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--start: enter Check in model modal-->
    <modal class="flex flex-col w-full items-center" :width="540" height="175" name="modal_confirm_check_in_mode">
        <div class="py-8 px-3">
              <h1 class="text-lg text-purple font-bold text-center">Open Check In?</h1>
              <p class="text-lg text-purple text-center">Are you sure you want to open Check In for audition?</p>
            <div class="w-full flex flex-wrap justify-center overflow-hidden mt-3">
                <div class="w-1/4">
                  <base-button type="submit" expanded @click="confirmCheckInmode(false)">
                      No
                  </base-button>
                </div>
                <div class="w-1/4 ml-3">
                  <base-button type="submit" expanded @click="confirmCheckInmode(true)">
                      Yes
                  </base-button>
                </div>

            </div>
        </div>
    </modal>

    <modal class="flex flex-col w-full items-center" :width="600" height="490" name="modal_passcode_check_in_mode">
        <div class="py-8 px-3">
            <p class="text-lg text-purple font-bold text-center mb-2">Set Passcode</p>
            <div class="flex w-full pass-code-input">
              <form class="w-full max-w-xs">
                <input class="text-black rounded-full overflow-hidden w-full h-full py-3 pl-6 pr-10 placeholder-purple focus:outline-none border border-purple" type="password" :value="checkInPassCode"   @input="onInputChange" placeholder="Passcode" autocomplete="off"    />
              </form>
            </div>
            <div class="flex w-full mt-3">
              <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="checkInPassCode" :layout="layout" :theme="theme"/>
            </div>
            <div class="w-full flex flex-wrap justify-center overflow-hidden mt-3">
                <div class="w-1/4">
                  <base-button type="button" expanded @click="cancelSetPassCodeCheckIn()">
                      Cancel
                  </base-button>
                </div>
                <div class="w-1/4 ml-3">
                  <base-button type="button" expanded @click="saveSetPassCodeCheckIn()">
                      Set
                  </base-button>
                </div>
            </div>
        </div>
    </modal>
    <!--end: enter Check in model modal-->

    <!--start: enter monitor mode in model modal-->
    <modal class="flex flex-col w-full items-center" :width="540" height="175" name="modal_confirm_monitor_in_mode">
        <div class="py-8 px-3">
            <h1 class="text-lg text-purple font-bold text-center">Enter Monitor Mode?</h1>
            <p class="text-lg text-purple text-center">Are you sure you want to open Monitor Mode?</p>
            <div class="w-full flex flex-wrap justify-center overflow-hidden mt-3">
                <div class="w-1/4">
                  <base-button type="submit" expanded @click="confirmMonitorInmode(false)">
                      No
                  </base-button>
                </div>
                <div class="w-1/4 ml-3">
                  <base-button type="submit" expanded @click="confirmMonitorInmode(true)">
                      Yes
                  </base-button>
                </div>
            </div>
        </div>
    </modal>

    <modal class="flex flex-col w-full items-center" :width="600" height="490" name="modal_passcode_monitor_in_mode">
        <div class="py-8 px-3">
            <p class="text-lg text-purple font-bold text-center mb-2">Set Passcode</p>
            <div class="flex w-full pass-code-input">
              <form class="w-full max-w-xs">
                <input class="text-black rounded-full overflow-hidden w-full h-full py-3 pl-6 pr-10 placeholder-purple focus:outline-none border border-purple" type="password" :value="monitorInPassCode"   @input="onInputChangeMonitor" placeholder="Passcode" autocomplete="off"    />
              </form>
            </div>
            <div class="flex w-full mt-3">
              <SimpleKeyboard @onChange="onChangeMonitor" @onKeyPress="onKeyPressMonitor" :input="monitorInPassCode" :layout="layout" :theme="theme"/>
            </div>
            <div class="w-full flex flex-wrap justify-center overflow-hidden mt-3">
                <div class="w-1/4">
                    <base-button type="button" expanded @click="cancelSetPassCodeMonitorIn()">
                        Cancel
                    </base-button>
                    </div>
                    <div class="w-1/4 ml-3">
                    <base-button type="button" expanded @click="saveSetPassCodeMonitorIn()">
                        Set
                    </base-button>
                </div>

            </div>
        </div>
    </modal>
    <!--end: enter monitor mode in model modal-->



  </section>

</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { eventBus } from "../../main";
import axios from "axios";

import SimpleKeyboard from "../shared/SimpleKeyboard";
import DEFINE from "../../utils/const.js";

import ExcelService from '@/services/ExcelService';

export default {
  components: {
    SimpleKeyboard
  },
  props: [],
  data() {
    return {
      info: true,
      manage: false,
      statusChild: 1,
      roundActive: false,
      videoSection: false,
      arrayOfObjects: [
        { name: "Round 1" },
        { name: "Round 2" },
        { name: "Round 3" },
        { name: "Round 4" }
      ],
      object: {
        name: "Select a Round"
      },
      isOpen: false,
      openId: "",
      active: false,
      isShowManageGroup: false,
      isOpenGroup: false,
      isLastRoundGroupOpen: false,
      lastRound: "",
      checkInPassCode: "",
      monitorInPassCode: "",
      layout: {
        default: ["1 2 3", "4 5 6", "7 8 9", "0"],
        // default: ["1 2 3", "4 5 6", "7 8 9", "{shift} 0 _", "{bksp}"],
        shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp}"]
      },
      theme: "hg-theme-default hg-layout-numeric numeric-theme",
      options: {
        useKbEvents: false,
        preventClickEvent: false
      },
      current_round: {}
    };
  },
  watch: {
    rounds: function() {
      if (this.rounds && this.rounds.length > 0) {
        this.lastRound = this.rounds[this.rounds.length - 1];
        this.getGroupdetails();
      }
    },
    audition: function() {
      let currentAudition = this.audition ? this.audition : null;
      eventBus.$emit("currentAudition", currentAudition);
      this.handleNewGroup(
        this.current_round.status ? this.current_round.status : null
      );
    }
  },
  computed: {
    ...mapState("audition", ["audition", "videos"]),
    ...mapState("round", ["rounds"])
  },
  async beforeMount() {
    await this.fetchAuditionData(this.$route.params.id);
    this.$emit("statusSet", this.audition.status);
  },
  created() {
    eventBus.$on("isCurrentOpenGroup", value => {
      this.isOpenGroup = value;
      if (!value) {
        this.getGroupdetails();
      }
    });
  },
  methods: {
    handleNewGroup(round_status) {
      if (
        this.audition.status == 1 &&
        this.audition.online == 0 &&
        round_status == 1
      ) {
        this.isShowManageGroup = true;
      } else {
        this.isShowManageGroup = false;
      }
      eventBus.$emit("showManageGroup", this.isShowManageGroup);
    },
    openMenu: function(id) {
      this.isOpen = false;

      if (this.openId == id) {
        this.openId = "";
      } else {
        this.openId = id;
      }
    },
    ...mapActions("audition", [
      "fetchAuditionData",
      "openAudition",
      "closeAudition",
      "listVideos",
      "getVideosListByRound",
      "deleteVideo"
    ]),
    ...mapActions("round", ["fetch", "closeRound"]),
    changeInfo() {
      this.manage = false;
      this.info = true;
    },

    changeManage() {
      this.info = false;
      this.manage = true;
    },
    async emmitFinalCast() {
      await this.$emit("handleFinalCast", this.audition.roles);
    },
    async exportAnalytics(){
      try {
          this.isLoading =  true;
          const { data: { data } } = await axios.get(`/t/auditions/analytics/${this.$route.params.id}`);

          let json = [];
          
          await this.getexportAnalyticsData(data).then(res=>{
            json = res;
          });
          await ExcelService.exportAsExcelFile(json,'analytics_data');          
          this.isLoading =  false;
        } catch (e) {
          this.isLoading =  false;
          this.$toasted.error("Something went to wrong!");
          console.log(e);
        }
    },
    async getexportAnalyticsData(analyticsData ){
      let exportData = [];            
    _.each(analyticsData, value => {           
          let newExprtObj = {
            'Round': value[0],
            'Total Auditioners': value[1],
            'Gender breakdown':	value[2],
            'Starred Performers': value[3],
            };
          exportData.push(newExprtObj);
      });
      if(exportData.length == 0){
        let newExprtObj = {
          'Round': '',
          'Total Auditioners': '',
          'Gender breakdown':	'',
          'Starred Performers': '',
        };
          exportData.push(newExprtObj);
      }
      return exportData;
    },
    async auditionVideo() {
      this.audition.round = this.roundActive.round;
      await this.getVideosListByRound(this.audition);
      this.info = false;
      this.manage = false;
      this.videoSection = true;
      let videosDetails = {
        videos: this.videos,
        videoSection: this.videoSection
      };
      eventBus.$emit("auditionVideoDetails", videosDetails);
      // await this.listVideos(this.roundActive.id);
      // this.info = false;
      // this.manage = false;
      // this.videoSection = true;
    },
    async auditionDeleteVideo(id) {
      let sendDataToAPI = {
        id: id,
        audition_id: this.audition.id
      };
      await this.deleteVideo(sendDataToAPI);
      await this.getVideosListByRound(this.audition);
      this.info = false;
      this.manage = false;
      this.videoSection = true;
    },

    sendDataToChild(data) {
      this.statusChild = data;
    },
    async closeRounds() {
      this.$toasted.clear();
      if (this.isOpenGroup) {
        this.$toasted.error("Please close group first.");
        return;
      }
      await this.closeRound(this.roundActive.id);
      this.handleNewGroup(0);
      this.roundActive.status = 0;
      this.sendDataToChild(0);
    },
    resetOptions() {
      this.info = true;
      this.manage = false;
      this.videoSection = false;
      let videosDetails = {
        videos: [],
        videoSection: this.videoSection
      };
      eventBus.$emit("auditionVideoDetails", videosDetails);
    },
    async changeStatus() {
      await this.openAudition(this.audition.id);
      await this.$emit("statusSet", this.audition.status);
    },
    async close() {
      if (this.isOpenGroup || this.isLastRoundGroupOpen) {
        this.$toasted.error("Please close group first.");
        return;
      }
      await this.closeAudition(this.audition.id);
      this.handleNewGroup(0);
      await this.$emit("statusSet", this.audition.status);
    },
    async methodToRunOnSelect(payload) {
      this.handleNewGroup(payload.status);
      if (payload == "create") {
        this.$router.push({
          name: "auditions.round",
          params: { id: this.$route.params.id }
        });
      } else {
        await this.$emit("selected", payload);
      }
      this.roundActive = payload;
      this.current_round = payload;
    },
    async getGroupdetails() {
      try {
        let groupStatusRes = await axios.get(
          `/t/group/status/${this.lastRound.id}`
        );
        let openGroupMember = groupStatusRes.data.data
          ? groupStatusRes.data.data
          : [];
        this.isLastRoundGroupOpen = openGroupMember.length > 0 || false;
      } catch (ex) {
        console.log(ex);
      }
    },
    openConfirmCheckInmodal() {
      this.$modal.show("modal_confirm_check_in_mode");
    },
    confirmCheckInmode(mode) {
      this.$modal.hide("modal_confirm_check_in_mode");
      if (mode) {
        this.$modal.show("modal_passcode_check_in_mode");
      }
    },
    onChange(input) {
      this.checkInPassCode = input;
    },
    onKeyPress(button) {
      // console.log("button", button);
    },
    onInputChange(input) {
      this.checkInPassCode = input.target.value;
    },
    cancelSetPassCodeCheckIn() {
      this.$modal.hide("modal_passcode_check_in_mode");
      this.checkInPassCode = "";
      localStorage.removeItem(DEFINE.set_pass_code_key);
    },
    saveSetPassCodeCheckIn() {
      this.$toasted.clear();
      if (!this.checkInPassCode || this.checkInPassCode == "") {
        this.$toasted.error("Please enter passcode.");
        return;
      }
      localStorage.setItem(
        DEFINE.set_pass_code_key,
        window.btoa(this.checkInPassCode)
      );
      this.$modal.hide("modal_passcode_check_in_mode");
      this.checkInPassCode = "";
      this.$router.push({
        name: "auditions/checkin",
        params: {
          id: this.roundActive.id,
          title: this.audition.title,
          date: this.audition.date,
          auditionId: this.audition.id
        }
      });
    },
    openConfirmMonitorInmodal() {
      this.$modal.show("modal_confirm_monitor_in_mode");
    },
    confirmMonitorInmode(mode) {
      this.$modal.hide("modal_confirm_monitor_in_mode");
      if (mode) {
        this.$modal.show("modal_passcode_monitor_in_mode");
      }
    },
    onChangeMonitor(input) {
      this.monitorInPassCode = input;
    },
    onKeyPressMonitor(button) {
      // console.log("button", button);
    },
    onInputChangeMonitor(input) {
      this.monitorInPassCode = input.target.value;
    },
    cancelSetPassCodeMonitorIn() {
      this.$modal.hide("modal_passcode_monitor_in_mode");
      this.monitorInPassCode = "";
      localStorage.removeItem(DEFINE.set_monitor_pass_code_key);
    },
    saveSetPassCodeMonitorIn() {
      this.$toasted.clear();
      if (!this.monitorInPassCode || this.monitorInPassCode == "") {
        this.$toasted.error("Please enter passcode.");
        return;
      }
      localStorage.setItem(
        DEFINE.set_monitor_pass_code_key,
        window.btoa(this.monitorInPassCode)
      );
      this.$modal.hide("modal_passcode_monitor_in_mode");
      this.checkInPassCode = "";
      this.$router.push({
        name: "monitor-update",
        params: { id: this.roundActive.id, auditionId: this.audition.id }
      });
    },
    setUrl(url){      
      var pattern = /^((http|https|ftp):\/\/)/;
      if(!pattern.test(url)) {
          url = "http://" + url;
      }
      return url;
    }
  }
};
</script>
<style>
.purple-light {
  color: #4d2545 !important;
}
.red-light {
  background-color: #93183e;
}
.yellow-light {
  background-color: #d8893a;
}
.purple-back {
  background-color: #4d2545;
}
.button-detail {
  background-image: linear-gradient(#4d2545, #782541);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.bg-sidebar {
  background-color: #f0f0f0;
}

@import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");
*,
::before,
::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
ul li {
  position: relative;
  margin: 0.25em;
  text-align: center;
}
ul#navigation {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
.dropdown {
  position: absolute;
  left: 50%;
  margin-top: 0.55em;
  border-radius: 0.35em;
  background-color: rgba(33, 37, 41, 0.15);
  /*visibility: hidden;
  opacity: 0;*/
}

.cus-dropdown {
  position: absolute;
  left: 50%;
  margin-top: 0.55em;
  border-radius: 0.35em;
  background-color: rgba(33, 37, 41, 0.15);
  visibility: hidden;
  opacity: 0;
}

.cus-spn-cls {
  margin-left: 10px;
}

.dropdown.isOpen {
  visibility: visible;
  opacity: 1;
}
.dropdown.submanu {
  position: absolute;
  left: -130px;
  top: 2px;
  width: 130px;
  background-color: #f7f7f7;
  z-index: 111;
}
.dropdown.submanu ul {
  width: 100%;
}
ul#navigation li:first-child {
  position: relative;
}
.sidebar .sidebar-content {
  min-height: calc(100vh - 48px);
}
ul#navigation > li > a {
  padding: 0.55em 1em;
  transition: all 200ms ease;
}
ul#navigation {
  align-self: flex-end;
}
.submanu-content li a[title="Share"]::after,
.submanu-content li a[title="Open in"]::after,
.submanu-content li a[title="Delete"]::after {
  content: "";
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 10px;
  top: 3px;
  background-size: 18px 18px;
}
.submanu-content li a[title="Share"]::after {
  background-image: url(/images/icons/icon1.png);
}
.submanu-content li a[title="Open in"]::after {
  background-image: url(/images/icons/icon2.png);
}
.submanu-content li a[title="Delete"]::after {
  background-image: url(/images/icons/icon3.png);
}
ul.submanu-content > li > a {
  display: block;
  padding: 0;
  position: relative;
  padding-left: 48px;
  text-align: left;
  margin-bottom: 8px;
  cursor: pointer;
}
.minh-100vh {
  min-height: calc(100vh - 50px);
}
.align-content-start {
  display: flex;
  align-content: flex-start;
}
.w-100 {
  width: calc(100% - 30px) !important;
}
.content-around {
  justify-content: space-around !important;
}
.mp-box {
  border-bottom-right-radius: 7px !important;
  border-top-right-radius: 7px !important;
}
.w-90 {
  width: 90% !important;
}
.h-80 {
  height: 85% !important;
}
.h-100 {
  height: 80% !important;
}
.cmb-10 {
  margin-bottom: 10px !important;
}
.mp-box > span {
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  overflow: hidden;
  width: 170px !important;
}

.touchpad-width {
  width: 578px !important;
}

.pass-code-input {
  margin-left: 10.5rem !important;
}
</style>

