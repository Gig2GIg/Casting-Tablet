<template>
<div>
  <nav class="flex items-center h-12">
      <img :src="'/images/icons/12-layers@3x.png'" class="h-10  ml-auto" alt="star" @click="invitation.adding = true">
      <div v-show="invitation.adding" class="mt-64">
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
          @click.native="sendCode"
        >
          Send
        </base-button>
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
        :src="image"
        class="h-10"
        alt="Avatar"
      >
      </div>
      
    </div>
  </nav>
  <div class="flex" :style="{ minWidth: '80%', width: '100%', maxWidth: '100%' }">
  <div class="flex flex-wrap  w-1/3">
      <img
        :src="image"
        alt="Icon"
      >
      <p class="text-purple text-xl font-bold mt-4 w-full">{{profile.details.first_name}} {{profile.details.last_name}}</p>
      <p class="text-purple text-m font-bold mt-2 w-full">{{profile.details.city}}</p>
      <div class="flex w-full justify-start mt-12">
        <img
          :src="'/images/icons/person.png'"
          alt="Icon"
          class="content-center h-8"
        >
        <p class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2">Test City</p>
      </div>
      <div class="flex w-full justify-start mt-12">
        <img
          :src="'/images/icons/icon.png'"
          alt="Icon"
          class="content-center h-8"
        >
        <p class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2">Credit</p>
      </div>
      <div class="flex w-full justify-start mt-12">
        <img
          :src="'/images/icons/book.png'"
          alt="Icon"
          class="content-center h-8"
        >
        <p class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2">Education & Training</p>
      </div>
      <div class="flex w-full justify-start mt-12">
        <img
          :src="'/images/icons/12-layers.png'"
          alt="Icon"
          class="content-center h-8"
        >
        <p class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2">Appearance</p>
      </div>
    </div>
  <div class="flex flex-wrap w-full  h-full">
    <div class="flex w-full">
      <div class="w-1/43flex flex-wrap content-center justify-center calendar shadow-lg">
        <p class="text-center text-2xl text-purple font-bold">Availability</p>
          <v-calendar :rows="2"/>
      </div>
      <div class="w-1/12"></div>
      <div class="w-full shadow-lg">
        <p class="text-center text-2xl text-purple font-bold">Contract Information</p>
        <div class="flex flex-wrap justify-center">
            <div v-for="data in audition.roles" :key="data.id" class="text-center w-1/2 flex justify-center">
              <div>
                <div class="m-3 rounded-full flex items-center w-12 h-12 " :class="{'button-detail': data.id == rol, 'bg-gray-400': data.id != rol}">
                  <figure class="flex w-full justify-center">
                    <img
                      :src="`/images/icons/user.png`"
                      alt="Icon"
                      class="content-center h-4"
                    >
                  </figure>
                </div>
                <p class="text-purple text-xs justify-center w-16 font-bold tracking-tighter flex-1 ">
                  {{ data.name }}
                </p>
              </div>
            </div>
            <div v-for="data in audition.roles" :key="data.id" class="text-center w-1/2 flex justify-center">
              <div>
                <div class="m-3 rounded-full flex items-center w-12 h-12 " :class="{'button-detail': data.id == rol, 'bg-gray-400': data.id != rol}">
                  <figure class="flex w-full justify-center">
                    <img
                      :src="`/images/icons/user.png`"
                      alt="Icon"
                      class="content-center h-4"
                    >
                  </figure>
                </div>
                <p class="text-purple text-xs justify-center w-16 font-bold tracking-tighter flex-1 ">
                  {{ data.name }}
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="flex w-full h-96 mt-16">
      <div class="w-1/2 shadow-lg border border-gray-300">
        <p class="text-center text-2xl text-purple font-bold">Tags</p>
        <div class="flex flex-wrap justify-center w-full">
            <base-input
                name="tag"
                class="w-full px-2"
                type="add"
                placeholder="Add Tags"
                :custom-classes="['border-2', 'border-purple']"
              />
        </div>
      </div>
      <div class="w-1/12"></div>
      <div class="w-1/2 shadow-lg border border-gray-300">
        <p class="text-center text-2xl text-purple font-bold">Recommendation</p>
        <div class="flex flex-wrap justify-center w-full">
            <div class="flex flex-wrap justify-center w-full">
              <base-input
                name="recommendation"
                class="w-full px-2"
                type="add"
                placeholder="Add Recommendations"
                :custom-classes="['border-2', 'border-purple']"
              />
          </div>    
        </div>
      </div>
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
      callback: 1,
      favorite:0,
      slot:'',
      workon:1,
      currentUser:[],
      form:{},
      invitation: {
        adding: false,
        email: '',
      },
    };
  },
  computed: {
    ...mapState('audition', ['audition', 'userList', 'teamFeedback']),
    ...mapState('user', ['user']),
    ...mapState('profile', {profile:'user'}),
  },
  async mounted() {
    this.image;
    
    this.fetchData(this.$route.params.id);
  },
  methods: {
    ...mapActions('user', ['fetch']),
    ...mapActions('audition', ['fetchAuditionData', 'fetchUserList', 'fetchTeamFeedback']),
    ...mapActions('profile', ["fetchData"]),
    goToday() {
      this.$refs.calendar.goToday()
    },
    async sendCode(){
      debugger;

      let data={
        "code": this.code,
        "email": this.invitation.email,
      }

      debugger;
      await axios.post(`/t/performers/code`, data);
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
</style>
