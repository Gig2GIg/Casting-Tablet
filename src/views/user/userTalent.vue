<template>
<div>
  <nav class="flex items-center h-12">
    <div class="w-full flex flex-col">
      <div class=" w-1/2 z-40">
          <div v-show="invitation.adding" class="mt-16 mr-32 shadow-lg bg-white absolute right-0 top-0 z-40">
            <base-input
              v-model="invitation.email"
              v-validate="'required|email'"
              name="email"
              placeholder="Email"
              :custom-classes="['border', 'border-purple']"
              :message="errors.first('invitation.email')"
              expanded
            />

            <base-button
              class="pt-2 pb-2"
              type="submit"
              expanded
              @click.native="sendData"
            >
              Send
            </base-button>
          </div>
      </div>
      <img :src="'/images/icons/12-layers@3x.png'" class="h-10  ml-auto mr-5" alt="star" @click="invitation.adding =invitation.adding == true?false:true">
      </div>
    <div class="flex items-center border-l border-white text-white float-right cursor-pointer">
      <span class="mx-4">
        {{profile.details.first_name}} {{profile.details.last_name}}
      </span>
      <!-- <i class="material-icons mr-4">
        keyboard_arrow_down
      </i> -->
      <div >
      <img
        :src="profile.image.url"
        class="h-10"
        alt="Avatar"
      >
      </div>

    </div>
  </nav>
  <div class="flex p-5">
  <div class="flex flex-wrap justify-center content-start w-1/2 shadow-2xl rounded-lg">
      <div class="h-56 w-full bg-cover rounded-t-lg" :style="{ backgroundImage: 'url(' + image + ')' }">
      </div>
      <p class="text-purple text-xl font-bold mt-4 text-center w-full">{{tuser.details.first_name}} {{tuser.details.last_name}}</p>
      <p class="text-purple text-m font-bold mt-2 text-center w-full">{{tuser.details.city}}</p>
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
          <v-date-picker class="border-none" :select-attribute='selectAttribute' :attributes="attrs" locale="en" mode='range' v-model="dates" show-caps is-inline  :rows="2" />
        </div>
      </div>
      <div class="w-full ml-5 shadow-lg">
        <p class="text-center text-2xl text-purple font-bold">Contract Information</p>
        <div class="flex flex-wrap justify-center">
          <div class="container flex w-full mt-3">
          <div class="flex w-full text-center justify-center flex-wrap">
            <div class="container flex w-full mt-3">
              <div class="container flex w-full mt-3">
                <div class="flex w-full text-center justify-center flex-wrap">
                  <div
                    v-for="data in contract"
                    :key="data.id"
                    class="flex m-3 content-center w-full h-16 flex justify-center"
                  >
                    <div class="flex justify-center w-9/12 button-detail rounded-lg shadow-lg">
                      <div class="flex justify-center content-center flex-wrap w-1/2 h-full">
                        <img
                          v-if="data.type == 'audio'"
                          src="/images/icons/mp4Icon@3x.png"
                          alt="Icon"
                          class="h-10"
                        >
                        <img
                          v-else-if="data.type == 'video'"
                          src="/images/icons/mp3-icon@3x.png"
                          alt="Icon"
                          class="h-10"
                        >
                        <img
                          v-else-if="data.type == 'doc'"
                          src="/images/icons/pdf-icon@3x.png"
                          alt="Icon"
                          class="h-10"
                        >
                      </div>
                      <div class="flex content-center relative flex-wrap w-full h-full bg-white">
                        <span class="text-center text-purple font-bold w-full">{{ data.name }}</span>
                        <img
                          src="/images/icons/more-icon@3x.png"
                          alt="Icon"
                          class="h-6 absolute right-0 bottom-0"
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <p v-if="contract==''" class="text-purple font-bold">No informaton added yet.</p>
        </div>
      </div>
    </div>
    <div class="flex w-full h-96 mt-16">
      <div class="w-1/2 shadow-lg ml-5 border border-gray-300 overflow-auto">
        <p class="text-center text-2xl text-purple font-bold">Tags</p>
        <div class="m-4">
          <div v-for="data in tags" :key="data.id" class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
            <p class="text-purple w-1/2">{{data.title}}</p>
            <div class="flex flex-wrap justify-end w-1/2">
              <!-- <img src="/images/icons/garbage@3x.png" alt="Icon" class="h-6" @click="deleteTag(data)"> -->
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 shadow-lg ml-5 border border-gray-300 overflow-auto">
        <p class="text-center text-2xl text-purple font-bold">Comments</p>
        <div class="m-4">
          <!-- <div v-for="data in recommendations" :key="data.id" class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4">
            <p class="text-purple w-1/2">{{data.markeplace.title}}</p>
            <div class="flex flex-wrap justify-end w-1/2">
              <img src="/images/icons/garbage@3x.png" alt="Icon" class="h-6" @click="deleteRecommended(data)">
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="custom-video-wrap ml-5 shadow-lg border border-gray-300">
      <h2>Audition Videos</h2>
        <ul class="custom-video-list">
          <li   v-for="data in auditionList"
                :key="data.id"
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
</div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex';
import { Multipane, MultipaneResizer } from 'vue-multipane';
import { Calendar } from 'vue-sweet-calendar'
import axios from 'axios';
import moment from "moment";
import 'vue-sweet-calendar/dist/SweetCalendar.css'

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
      emoji:3,
      attrs: [],
      callback: 1,
      favorite:0,
      slot:'',
      dates:[],
      selectAttribute: {
        bar: true,
        color: 'red'
      },
      workon:1,
      tags:[],
      currentUser:[],
      form:{},
      invitation: {
        adding: false,
        email: '',
      },
      auditionList:[]
    };
  },
  computed: {
    ...mapState('audition', ['audition', 'userList', 'teamFeedback']),
    ...mapState('user', ['user']),
    ...mapState('profile', {profile:'user', tuser:'tuser', calendar:'calendar', contract:'contract'}),
  },
  async mounted() {
    this.image;
    let { data: { data } } = await axios.get(`/t/performers/tags?user=${this.$route.params.id}`);
    this.tags = data;
    let getAuditionList = await axios.get(`/t/auditions/list/${this.$route.params.id}`);
    if(getAuditionList.data.data.length){
      this.auditionList = getAuditionList.data.data;
    }
    await this.fetchContract(this.$route.params.id);
    await this.fetchData(this.$route.params.id);
    await this.fetchProfile();
    await this.myCalendar(this.$route.params.id);
    this.asignEvents();
    // debugger;
  },
  methods: {
    ...mapActions('user', ['fetch']),
    ...mapActions('audition', ['fetchAuditionData', 'fetchUserList', 'fetchTeamFeedback']),
    ...mapActions('profile', {fetchProfile: "fetch", fetchData:"fetchData", myCalendar:'myCalendar', fetchContract:'fetchContract'}),
    goToday() {
      this.$refs.calendar.goToday()
    },
    asignEvents(){
        var finalList = new Array();
        this.calendar.map(function(value) {
          let splitInitDate = value.start_date.split("-");
          let splitFinalDate = value.end_date.split("-");
          finalList.push({
              start: new Date(splitInitDate[0], splitInitDate[1] - 1, splitInitDate[2]),
              end: new Date(splitFinalDate[0], splitFinalDate[1] - 1, splitFinalDate[2])
          });
      });
      finalList;
      // debugger;
      this.attrs = [
        {
          bar: {
            color: 'yellow',
            class: 'my-dot-class',
          },
          key: 'today',
          dates: finalList,
        },
      ];
    },
    async sendData(){
      // debugger;

      let data={
        "code": this.code,
        "email": this.invitation.email,
      }

      await axios.post(`/t/performers/code`, data);
      this.$toasted.success('The user code has been shared successfully');
      this.invitation.email = "";

    },
    async saveFeedback(){
      this.form.callback = this.callback == 1 ?true:false;
      this.form.data = this.$route.params.audition;
      this.form.appointment_id = this.$route.params.round;
      this.form.user = this.$route.params.id;
      this.form.work = this.workon == 1 ? 'vocals' :this.workon == 2 ? 'acting' : 'dancing';
      this.form.favorite = this.favorite
      this.form.evaluation = this.emoji;
      this.form.slot_id = this.slot;
      this.form.evaluator = this.profile.details.id;
      let status = await axios.post('/t/feedbacks/add', this.form);
      this.$toasted.success('Feedback Created');

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
</style>
