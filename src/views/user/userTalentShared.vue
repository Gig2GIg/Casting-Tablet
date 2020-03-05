<template>
<div>
  <nav class="flex items-center h-12">    

  </nav>
  <multipane class="custom-resizer h-full " layout="vertical">
    <div class="flex p-5" :style="isShowAuditionVideo? { minWidth: '75%', width: '75%', maxWidth: '100%' } : { minWidth: '75%', width: '100%', maxWidth: '100%' }">
      <div class="flex flex-wrap justify-center content-start w-1/2 shadow-2xl rounded-lg">
          <div class="h-56 w-full bg-cover rounded-t-lg" :style="{ backgroundImage: 'url(' + image + ')' }">
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
            <div class="flex w-full justify-start mt-2">
              <img
                :src="'/images/icons/person.png'"
                alt="Icon"
                class="content-center h-8"
              >
              <p class="text-purple text-m text-left ml-4 tracking-wide w-1/2">Info</p>
            </div>
            <div class="flex w-full justify-start mt-12">
              <img
                :src="'/images/icons/icon.png'"
                alt="Icon"
                class="content-center h-8"
              >
              <p class="text-purple text-m text-left ml-4 tracking-wide w-1/2">Credit</p>
            </div>
            <div class="flex w-full justify-start mt-12">
              <img
                :src="'/images/icons/book.png'"
                alt="Icon"
                class="content-center h-8"
              >
              <p class="text-purple text-m text-left ml-4 tracking-wide w-1/2">Education & Training</p>
            </div>
            <div class="flex w-full justify-start mt-12">
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
                <div class="flex justify-center w-full h-80 button-detail rounded-lg">
                  <div class="flex justify-center content-center flex-wrap w-1/2 h-full">
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
                              <a :href="data.url" title="Share" target="_blank">Share</a>
                            </li>
                            <li>
                              <a :href="data.url" title="Open in" target="_blank">Open in</a>
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
      encCode : ''
    };
  },
  computed: {
    ...mapState('audition', ['audition', 'userList', 'teamFeedback']),
    ...mapState('user', ['user']),
    ...mapState('profile', { tuser:'tuser', calendar:'calendar'}),
  },
  async mounted() {
    this.image;
    
    let getAuditionList = await axios.get(`/t/auditions/list/${this.$route.params.id}`);
    if(getAuditionList.data.data.length){
      this.auditionList = getAuditionList.data.data;
    }
    
    await this.fetchData(this.$route.params.id);
    await this.myCalendar(this.$route.params.id);
    this.asignEvents();
    // debugger;
  },
  created(){
    this.base_url = window.location.origin;
    this.encCode = this.$route.params.code;

  },
  methods: {
    ...mapActions('user', ['fetch']),
    ...mapActions('audition', ['fetchAuditionData', 'fetchUserList', 'fetchTeamFeedback','deleteVideo']),
    ...mapActions('profile', { fetchData:"fetchData", myCalendar:'myCalendar'}),
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
          `/t/auditions/video/list/${data.id}/performer/${this.$route.params.id}`
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
    }
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
// social link css
.social-a{
  margin-right: 5px;
  background: #cacaca;
  border-radius: 10040px !important;
}

</style>
