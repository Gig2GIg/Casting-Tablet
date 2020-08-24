<template>
<div>
  <nav class="flex items-center h-12">    
    
  </nav>
  <multipane class="custom-resizer h-full " layout="vertical">
    <div class="flex p-5" :style="isShowAuditionVideo? { minWidth: '75%', width: '75%', maxWidth: '100%' } : { minWidth: '75%', width: '100%', maxWidth: '100%' }">
      <div class="flex flex-wrap justify-center content-start w-1/2 shadow-2xl rounded-lg">
          <template v-if="tuser && tuser.image && tuser.image.url">
            <div class="w-full bg-cover rounded-t-lg user-profile width-fix" :style="{ backgroundImage: 'url(' + tuser.image.url + ')' }">
            </div>
          </template>
          <div v-else class="w-full bg-cover rounded-t-lg user-profile width-fix" >
          </div>
          
          <p class="text-purple text-xl font-bold mt-4 text-center w-full">{{tuser.details ? `${tuser.details.first_name} ${tuser.details.last_name}` : ''}}</p>
          <p class="text-purple text-m font-bold mt-2 text-center w-full">{{tuser.details ? tuser.details.city : ''}}</p>

          <!-- start : add social links of current performer -->
          <div class="flex w-full mt-5 justify-center">
            <a class="social-a flex items-center justify-center content-center w-12 h-12" v-if="tuser.details && tuser.details.facebook" :href="setUrl(tuser.details.facebook)" target="_blank" rel="noopener noreferrer" >
              <img            
              :src="'/images/icons/fb_link.png'"
              alt="Icon"
              class="h-6"
            >
            </a>
            <a class="social-a flex items-center justify-center content-center w-12 h-12" v-if="tuser.details && tuser.details.instagram" :href="setUrl(tuser.details.instagram)" target="_blank" rel="noopener noreferrer" >
            <img
                v-if="tuser.details && tuser.details.instagram"
              :src="'/images/icons/instagram_link.png'"
              alt="Icon"
              class="h-6"
            >
            </a>
            <a class="social-a flex items-center justify-center content-center w-12 h-12" v-if="tuser.details && tuser.details.twitter" :href="setUrl(tuser.details.twitter)" target="_blank" rel="noopener noreferrer" >
              <img
                  v-if="tuser.details && tuser.details.twitter"
                :src="'/images/icons/twitter_link.png'"
                alt="Icon"
                class="h-6"
              >
            </a>
            <a class="social-a flex items-center justify-center content-center w-12 h-12" v-if="tuser.details && tuser.details.linkedin" :href="setUrl(tuser.details.linkedin)" target="_blank" rel="noopener noreferrer" >
            <img
                v-if="tuser.details && tuser.details.linkedin"
              :src="'/images/icons/linkedin_link.png'"
              alt="Icon"
              class="h-6"
            >
            </a>
          

          </div>
          <!-- end : add social links of current performer -->
          <div class="w-full m-8">
            <div @click="getPerformerDetail('info')" class="flex w-full justify-start mt-2 cursor-pointer">
              <img
                :src="'/images/icons/person.png'"
                alt="Icon"
                class="content-center h-8"
              >
              <p class="text-purple text-m text-left ml-4 tracking-wide w-1/2">Info</p>
            </div>
            <div @click="getPerformerDetail('credit')" class="flex w-full justify-start mt-12 cursor-pointer">
              <img
                :src="'/images/icons/icon.png'"
                alt="Icon"
                class="content-center h-8"
              >
              <p class="text-purple text-m text-left ml-4 tracking-wide w-1/2">Credit</p>
            </div>
            <div @click="getPerformerDetail('eduTra')" class="flex w-full justify-start mt-12 cursor-pointer">
              <img
                :src="'/images/icons/book.png'"
                alt="Icon"
                class="content-center h-8"
              >
              <p class="text-purple text-m text-left ml-4 tracking-wide w-1/2">Education & Training</p>
            </div>
            <div @click="getPerformerDetail('appearance')" class="flex w-full justify-start mt-12 cursor-pointer">
              <img
                :src="'/images/icons/12-layers.png'"
                alt="Icon"
                class="content-center h-8"
              >
              <p class="text-purple text-m text-left ml-4 tracking-wide w-1/2">Appearance</p>
            </div>
          </div>
      </div>
      <div class="flex flex-wrap px-10 w-full h-full">
        <div class="flex w-full">
          <div class="w-1/3 ml-5 flex flex-wrap content-center justify-center calendar shadow-lg">
            <div>
              <p class="text-center text-2xl text-purple">Availability</p>
              <v-date-picker class="border-none calendar-bar-inline"  :select-attribute='selectAttribute' :attributes="attrs" locale="en" mode='range' v-model="dates" show-caps is-inline  :rows="2" />
            </div>
          </div>          
        </div>       
        <div class="custom-video-wrap ml-5 shadow-lg border border-gray-300">
          <h2>Audition Videos</h2>
            <ul class="custom-video-list" :class="{'single-video-list': isShowAuditionVideo}">
              <li   v-for="data in auditionList"
                    :key="data.id"
                    @click="getVideoList(data)"
                    class="">
                <div class="video-info-wrap">
                  <strong>{{ data.title }}</strong>
                  <p>{{ data.videos }} Videos</p>
                  <figure><img :src="data.cover" alt="Icon" class="h-10" /></figure>
                </div>
              </li>
            </ul>
        </div>
      </div>
    </div>
  <multipane-resizer class="mt-96 bg-purple h-20" v-show="isShowAuditionVideo"></multipane-resizer>
  <div v-show="isShowAuditionVideo" class="pane relative" :style="{ flexGrow: 1 }">



     <div
        v-show="isShowAuditionVideo"
        :class="{'hidden': !isShowAuditionVideo}"
        class="absolute flex flex-wrap w-full justify-center align-content-start minh-100vh"
      >

      <div class="container flex w-full mt-2">
          <div class="container flex w-full mt-2">
            <div class="custom-side-back">
              <div class="flex content-around w-100 items-center relative cmb-10">
                <img
                  src="/images/icons/left_arrow.png"
                  class="absolute left-0"
                  @click="resetOptions"
                />
                <h1 class="text-purple text-lg font-bold">Audition Videos</h1>
              </div>

              <div
                v-for="data in videos"
                :key="data.id"
                class="flex m-3 content-center w-full h-16 flex justify-center custom-side-video-list"
              >
                <div :class="[data.thumbnail ? 'flex justify-center custom-video-list-w button-detail rounded-lg my-1' : 'flex justify-center w-full h-80 button-detail rounded-lg']">
                  <div class="flex flex-col flex-none items-center justify-center text-white flex-wrap w-1/5 h-14" v-if="data.thumbnail">
                    <img :src="data.thumbnail" alt="Icon" class="h-full w-full image-border" />
                  </div>
                  <div class="flex justify-center content-center flex-wrap w-1/2 h-full" v-else>
                    <img src="/images/icons/mp4Icon@3x.png" alt="Icon" class="h-10" />
                  </div>
                  <div
                    class="flex content-center items-center relative w-full h-full bg-white mp-box custom-side-video-info"
                  >
                    <span class="text-center cus-spn-cls text-purple font-bold w-full">{{ data.name }}</span>
                    <ul id="navigation">
                      <li>
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
                        <div class="dropdown cus-dropdown submanu" v-bind:class="{ 'isOpen' : openId==data.id}">
                          <ul class="submanu-content">                            
                            <li>
                              <a :href="data.url ? data.url : ''" title="Open in" target="_blank">Open in</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

  </div>
  </div>
  </multipane>
  <modal :width="500" height="200" :adaptive="true" name="infoModal" class="custom-event-popup">
    <button @click="$modal.hide('infoModal')" class="popup-close-btn">
      <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
    </button>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Stage Name</strong>
        <p class="text-purple w-full">{{tuser.details ? tuser.details.stage_name : ""}}</p>
      </div>
    </div>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Professional/ Working Title</strong>
        <p class="text-purple w-full">{{tuser.details ? tuser.details.profesion : ""}}</p>
      </div>
    </div>
  </modal>
  <modal :width="500" height="330" :adaptive="true" name="creditModal">
    <button @click="$modal.hide('creditModal')" class="popup-close-btn">
      <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
    </button>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Production Type</strong>
        <p class="text-purple w-full">{{tuser.credits && tuser.credits[0] ? tuser.credits[0].type : ""}}</p>
      </div>
    </div>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Project Name</strong>
        <p class="text-purple w-full">{{tuser.credits && tuser.credits[0] ? tuser.credits[0].name : ""}}</p>
      </div>
    </div>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Role</strong>
        <p class="text-purple w-full">{{tuser.credits && tuser.credits[0] ? tuser.credits[0].rol : ""}}</p>
      </div>
    </div>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Director/Production Company</strong>
        <p class="text-purple w-full">{{tuser.credits && tuser.credits[0] ? tuser.credits[0].production : ""}}</p>
      </div>
    </div>
  </modal>
  <modal :width="500" height="390" :adaptive="true" name="eduTraModal">
    <button @click="$modal.hide('eduTraModal')" class="popup-close-btn">
      <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
    </button>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">School</strong>
        <p class="text-purple w-full">{{tuser.education && tuser.education[0] ? tuser.education[0].school : ""}}</p>
      </div>
    </div>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Degree/Cource</strong>
        <p class="text-purple w-full">{{tuser.education && tuser.education[0] ? tuser.education[0].degree : ""}}</p>
      </div>
    </div>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Instructor</strong>
        <p class="text-purple w-full">{{tuser.education && tuser.education[0] ? tuser.education[0].instructor : ""}}</p>
      </div>
    </div>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Location</strong>
        <p class="text-purple w-full">{{tuser.education && tuser.education[0] ? tuser.education[0].location : ""}}</p>
      </div>
    </div>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Year</strong>
        <p class="text-purple w-full">{{tuser.education && tuser.education[0] ? tuser.education[0].year : ""}}</p>
      </div>
    </div>
  </modal>
  <modal :width="500" height="390" :adaptive="true" name="appearance">
    <button @click="$modal.hide('appearance')" class="popup-close-btn">
      <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
    </button>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Height</strong>
        <p class="text-purple w-full">{{tuser.aparence ? tuser.aparence.height : ""}}</p>
      </div>
    </div>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Weight</strong>
        <p class="text-purple w-full">{{tuser.aparence ? tuser.aparence.weight : ""}}</p>
      </div>
    </div>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Hair Color</strong>
        <p class="text-purple w-full">{{tuser.aparence ? tuser.aparence.hair : ""}}</p>
      </div>
    </div>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Eye Color</strong>
        <p class="text-purple w-full">{{tuser.aparence ? tuser.aparence.eyes : ""}}</p>
      </div>
    </div>
    <div class="m-4">
      <div class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
        <strong class="text-purple w-full">Race</strong>
        <p class="text-purple w-full">{{tuser.aparence ? tuser.aparence.race : ""}}</p>
      </div>
    </div>
  </modal>
</div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex';
import { Multipane, MultipaneResizer } from 'vue-multipane';
import { Calendar } from 'vue-sweet-calendar'
import axios from 'axios';
import moment from "moment";
import 'vue-sweet-calendar/dist/SweetCalendar.css'
import { async } from 'q';
import TokenService from "../../services/core/TokenService";

export default {
  // ...
  components: {
    Multipane,
    MultipaneResizer,
    Calendar
  },
  props: ["image", "code"],
  data() {
    return {
      isLoading: true,
      rol:'',
      attrs: [],
      slot:'',
      dates:[],
      selectAttribute: {
        bar: true,
        color: 'red'
      },
      currentUser:[],
      auditionList:[],
      isShowAuditionVideo : false,
      active: false,
      videos : [],
      openId: "",      
      base_url : '',
      encCode : '',
      userId : this.$route.params.id ? window.atob(this.$route.params.id) : ''
    };
  },
  computed: {
    // ...mapState('audition', ['audition', 'userList']),
    ...mapState('profile', { tuser:'tuser', calendar:'calendar'}),
  },
  async mounted() {
    this.userId = this.$route.params.id ? window.atob(this.$route.params.id) : '';
    this.image;    
    await this.sharedCalendar(this.userId);
    this.asignEvents();
    
    let getAuditionList = await axios.get(`/talentDatabase/auditions/list/${this.userId}`);
    if(getAuditionList.data.data.length){
      this.auditionList = getAuditionList.data.data;
    }
  },
  async created(){
    await this.fetchSharedData(this.userId);
    this.base_url = window.location.origin;
    this.encCode = this.$route.params.code;

  },
  methods: {
    // ...mapActions('audition', ['fetchAuditionData', 'fetchUserList']),
    ...mapActions('profile', { fetchSharedData:"fetchSharedData", sharedCalendar:'sharedCalendar'}),
    goToday() {
      this.$refs.calendar.goToday()
    },
    asignEvents(){
        var finalList = new Array();
        if(this.calendar && this.calendar.length > 0){
          this.calendar.map(function(value) {
          let splitInitDate = value.start_date.split("-");
          let splitFinalDate = value.end_date.split("-");
          finalList.push({
              start: new Date(splitInitDate[0], splitInitDate[1] - 1, splitInitDate[2]),
              end: new Date(splitFinalDate[0], splitFinalDate[1] - 1, splitFinalDate[2])
            });
          });
        }
        
      finalList;
      // debugger;
      this.attrs = [
        {
          bar: {
            color: 'yellow',
            class: 'calender-bar-inside-line',
          },
          key: 'today',
          dates: finalList,
        },
      ];
    },  
    async getVideoList(data){
      if(!data.videos || data.videos == 0){
        this.isShowAuditionVideo = false;
        return;
      }
      try {
        let VideoRes = await axios.get(
          `/talentDatabase/auditions/video/list/${data.id}/performer/${this.userId}`
        );

        this.videos = VideoRes.data.data ? VideoRes.data.data : [];
        this.isShowAuditionVideo = true;
        this.scrollToTop();
      } catch (ex) {
        this.isShowAuditionVideo = false;
        console.log(ex);
        this.$toasted.error(ex.response.data.message);
      }
    },
    openMenu: function(id) {
      this.isOpen = false;

      if (this.openId == id) {
        this.openId = "";
      } else {
        this.openId = id;
      }
    },
    resetOptions() {
        this.isShowAuditionVideo = false;
    },
    scrollToTop() {
      window.scrollTo(0,0);
    },
    setUrl(url){      
      var pattern = /^((http|https|ftp):\/\/)/;
      if(!pattern.test(url)) {
          url = "http://" + url;
      }
      return url;
    },
    getPerformerDetail(type){
      if(type == 'info'){
        this.$modal.show('infoModal');
      }
      if(type == 'credit'){
        this.$modal.show('creditModal');
      }
      if(type == 'eduTra'){
        this.$modal.show('eduTraModal');
      }
      if(type == 'appearance'){
        this.$modal.show('appearance');
      }
    },
  },
};
</script>
<style lang="scss">
  .custom-resizer {
  width: 100%;
  height: 400px;
}
.custom-resizer > .pane {
  text-align: left;
  padding: 15px;
  overflow: hidden;
  background: #eee;
  border: 1px solid #ccc;
}
.custom-resizer > .pane ~ .pane {
}
.custom-resizer > .multipane-resizer {
  margin: 0; left: 0;
  position: relative;
  &:before {
    display: block;
    content: "";
    width: 3px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -1.5px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  &:hover {
    &:before {
      border-color: #999;
    }
  }
}
nav {
  background-image: linear-gradient(#4D2545, #782541);
}
.bubble {
	background: #fff;
  border-radius: .4em;
  box-shadow: 0px 0px 6px #B2B2B2;
}
.custom-video-wrap {
    padding: 30px;
    width: 100%;
    margin-top: 30px;
}
.custom-video-wrap h2 {
    font-size: 20px;
    color: #4D2545;
    text-align: center;
    font-weight: 600;
    margin-bottom: 27px;
}
.custom-video-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 273px;
    overflow-y: auto;
    overflow-x: hidden;
}
.custom-video-list li {
    width: 48%;
    margin: 0;
    margin-bottom: 27px;
    cursor: pointer;
}
.video-info-wrap {
    padding: 15px;
    display: flex;
    position: relative;
    text-align: left;
    flex-wrap: wrap;
    border: 1px solid #D6D6D6;
    border-radius: 4px;
}
.video-info-wrap strong {
    font-size: 15px;
    font-weight: 600;
    color: #4D2545;
    width: calc(100% - 90px);
}
.video-info-wrap p {
    font-size: 13px;
    color: #aaa;
    width: calc(100% - 90px);
}
.video-info-wrap figure {
    position: absolute;
    right: -5px;
    width: 100px;
    height: 70px;
    border-radius: 4px 4px 4px 19px;
    overflow: hidden;
    top: -5px;
}
.video-info-wrap figure img {
    height: 100% !important;
    width: 100%;
}
.button-detail {
  background-image: linear-gradient(#4d2545, #782541);
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
.cus-spn-cls{
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
.custom-video-list.single-video-list li {
    width: 100%;
}
.custom-side-video-list {
    margin-left: 0 !important;
    margin-right: 0 !important;
}
.custom-side-video-info {
    width: calc(100% - 50px) !important;
    font-size: 14px;
}
.img-h48{
  height: 48px;
}
.calender-bar-inside-line {
  margin-bottom: 15px !important;
  background-color: #D8893A !important;
}
.calendar-bar-inline .vc-day-layer[data-v-47ef1cd6] {
    left: -6px !important;
    right: -6px !important;
}
/* social link css */
.social-a{
  margin-right: 5px;
  background: #cacaca;
  border-radius: 10040px !important;
}
.custom-video-list-w {
  width: 319px !important;
}
.image-border {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.user-profile {
   background-position: center;
}

.user-profile.width-fix{
  padding-top:100%;
}
</style>
