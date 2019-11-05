<template>
<div>
  <nav class="flex items-center h-12">
      <img :src="'/images/icons/8-layers.png'" class="h-10  ml-auto" alt="star">
      <img v-if="favorite==0" :src="'/images/icons/4-layers.png'" class="w-6 m-6" alt="star" @click="favorite=1">
      <img v-else :src="'/images/icons/Path_56@2x.png'" class="w-6 m-6" alt="star" @click="favorite=0">
    <div class="flex items-center border-l border-white text-white float-right cursor-pointer">
      <span class="mx-4">
        {{profile.details.first_name}} {{profile.details.last_name}}
      </span>
      <!-- <i class="material-icons mr-4">
        keyboard_arrow_down
      </i> -->
      <!-- <img
        src="https://randomuser.me/api/portraits/women/17.jpg"
        class="w-12"
        alt="Avatar"
      > -->
    </div>
  </nav>
 <multipane class="custom-resizer h-full " layout="vertical">
  <div class="pane bg-white overflow-scroll" :style="{ minWidth: '80%', width: '100%', maxWidth: '100%' }">
  <div class="flex flex-wrap  h-full">
    <div class="flex w-full">
      <div class="w-1/4 flex flex-wrap content-center justify-center calendar shadow-lg">
        <p class="text-center text-2xl text-purple font-bold">Availability</p>
          <v-calendar :rows="2"/>
      </div>
      <div class="w-1/12"></div>
      <div class="w-1/4 shadow-lg">
        <p class="text-center text-2xl text-purple font-bold">Roles</p>
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
        </div>
      </div>
      <div class="w-1/12"></div>
      <div class="w-1/3 shadow-lg">
        <p class="text-center text-2xl text-purple font-bold">Team Feedback</p>
        <div class="flex flex-wrap justify-center">
            <div v-if="teamFeedback.length  == 0" class="text-purple font-bold h-full"> Not records created yet</div>
            <div
              v-for="data in teamFeedback"
              :key="data.id"
              class="text-center w-full flex justify-center"
            >
            <div>
              <div class="m-3 rounded-full flex items-center w-full h-12 ">
                <figure class="flex justify-center flex-wrap content-center w-8 h-8 border-2 border-purple rounded-sm">
                  <img
                    :src="'/images/icons/'+data.evaluation+'.png'"
                    alt="Icon"
                    class="content-center h-4"
                  >
                </figure>
                <p class="text-purple text-xs justify-center w-16 font-bold tracking-tighter flex-1 w-full">
                  Call Back
                </p>
                <div
                  class="py-1 px-5 border text-xs border-purple button-detail text-white font-bold uppercase mr-2 rounded-full cursor-pointer"
                >
                  {{ data.callback == 1? 'Yes' :  'No' }}
                </div>
                <p class="text-purple text-xs justify-center w-16 font-bold tracking-tighter flex-1 w-full">
                  Work On
                </p>
                <div
                  class="py-1 px-5 border text-xs border-purple button-detail text-white font-bold uppercase mr-2 rounded-full cursor-pointer"
                >
                  {{ data.work }}
                </div>
              </div>
            </div>
            </div>
          </div>
      </div>
    </div>
    <div class="flex w-full h-96 mt-16">
      <div class="w-1/3 shadow-lg border border-gray-300">
        <p class="text-center text-2xl text-purple font-bold">Instant Feedback</p>
        <div class="flex flex-wrap justify-center w-full">
            <div class="text-center w-full flex flex-wrap justify-center">
            <div>
              <div class="rounded-full flex flex-wrap justify-center content-center w-full h-12 mt-40">
                <div class="flex flex-wrap justify-center w-full">
                  <figure :class="{'border-2 border-purple': emoji==5}" class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg m-3" @click="emoji=5">
                    <img
                      :src="'/images/icons/5.png'"
                      alt="Icon"
                      class="content-center h-8"
                    >
                  </figure>
                  <figure :class="{'border-2 border-purple': emoji==4}" class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg m-3" @click="emoji=4">
                    <img
                      :src="'/images/icons/4.png'"
                      alt="Icon"
                      class="content-center h-8"
                    >
                  </figure>

                  <figure :class="{'border-2 border-purple': emoji==3}" class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg m-3" @click="emoji=3">
                    <img
                      :src="'/images/icons/3.png'"
                      alt="Icon"
                      class="content-center h-8"
                    >
                  </figure>
                  
                  <figure :class="{'border-2 border-purple': emoji==2}" class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg m-3" @click="emoji=2">
                    <img
                      :src="'/images/icons/2.png'"
                      alt="Icon"
                      class="content-center h-8"
                    >
                  </figure>
                  
                  <figure :class="{'border-2 border-purple': emoji==1}" class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg m-3" @click="emoji=1">
                    <img
                      :src="'/images/icons/1.png'"
                      alt="Icon"
                      class="content-center h-8"
                    >
                  </figure>
                  
                </div>
                <div class="flex flex-wrap justify-center content-center w-full">
                  <p class="text-purple justify-center w-16 font-bold tracking-tighter flex-1 w-full text-xl font-bold tracking-wider">
                    Call Back
                  </p>
                  <div class="flex flex-wrap justify-center content-center w-full">
                    <div class="container flex w-1/2 mt-3" @click="callback = 1">
                      <div class="flex w-full text-center justify-center flex-wrap">
                        <div :class="{'button-detail': callback == 1}" class="m-3 bg-white content-center border border-purple rounded-full w-32 h-10 flex items-center">
                          <p :class="{'text-white': callback == 1, 'text-purple': callback != 1}" class="text-white text-sm font-bold content-center tracking-tighter flex-1">
                            Yes
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="container flex w-1/2 mt-3">
                      <div class="flex w-full text-center justify-center flex-wrap" @click="callback = 2">
                        <div :class="{'button-detail': callback == 2}" class="m-3 content-center rounded-full border border-purple bg-white w-32 h-10 flex items-center">
                          <p :class="{'text-white': callback == 2, 'text-purple': callback != 2}" class=" text-sm font-bold content-center tracking-tighter flex-1">
                            No
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-wrap justify-center content-center w-full">
                  <p class="text-purple justify-center w-16 font-bold tracking-tighter flex-1 w-full text-xl font-bold tracking-wider">
                    Work On
                  </p>
                  <div class="flex flex-wrap justify-center content-center w-full">
                    <div class="container flex w-1/4 mt-3">
                      <div class="flex w-full text-center justify-center flex-wrap">
                        <div :class="{'button-detail': workon == 1}" class="m-3 content-center rounded-full border border-purple red-light w-20 h-10 flex items-center bg-white"  @click="workon = 1">
                          <p :class="{'text-white': workon == 1 , 'text-purple': workon != 1}" class="text-sm font-bold content-center tracking-tighter flex-1">
                            Vocals
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="container flex w-1/4 mt-3">
                      <div class="flexw-full text-center justify-center flex-wrap">
                        <div :class="{'button-detail': workon == 2}" class="m-3 content-center rounded-full border border-purple bg-white w-20 h-10 flex items-center"  @click="workon = 2">
                          <p :class="{'text-white': workon == 2 , 'text-purple': workon != 2}" class="text-sm font-bold content-center tracking-tighter flex-1">
                            Acting
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="container flex w-1/4 mt-3">
                      <div class="flexw-full text-center justify-center flex-wrap">
                        <div :class="{'button-detail': workon == 3}" class="m-3 content-center rounded-full border border-purple bg-white w-20 h-10 flex items-center"  @click="workon = 3">
                          <p :class="{'text-white': workon == 3 , 'text-purple': workon != 3}" class="text-sm font-bold content-center tracking-tighter flex-1">
                            Dancing
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-wrap justify-center content-center w-full">
                  <base-input
                  v-model="form.comment"
                    name="tag"
                    class="w-full px-2 mb-10"
                    type="add"
                    placeholder="Add Comment"
                    :custom-classes="['border-2', 'border-purple']"
                  />
                </div>
              </div>
            </div>
            </div>
          </div>
      </div>
      <div class="w-1/12"></div>
      <div class="w-1/4 shadow-lg border border-gray-300">
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
      <div class="w-1/4 shadow-lg border border-gray-300">
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
  <multipane-resizer class="mt-96"></multipane-resizer>
  <div class="pane relative" :style="{ flexGrow: 1 }">
    <div class="absolute" v-for="data in currentUser" :key="data.id">
      <div class="flex flex-wrap content-center justify-center text-center">
      <img
        :src="data.image"
        alt="Icon"
        class="-ml-3"
      >
      <p class="text-purple text-xl font-bold mt-4 w-full">{{data.name}}</p>
      <p class="text-purple text-m font-bold mt-2 w-full">Test City</p>
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
      <div class="flex flex-wrap justify-center mt-12 w-full">
        <div class="flex w-1/2" @click="saveFeedback">
          <div class="flex w-full text-center justify-center flex-wrap">
            <div class="m-3 button-detail content-center border border-purple rounded-full w-32 h-10 flex items-center">
              <p class="text-white text-sm font-bold content-center tracking-tighter flex-1">
                Save
              </p>
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
import 'vue-sweet-calendar/dist/SweetCalendar.css'

export default {
  // ...
  components: {
    Multipane,
    MultipaneResizer,
    Calendar
  },
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
      form:{}
    };
  },
  computed: {
    ...mapState('audition', ['audition', 'userList', 'teamFeedback']),
    ...mapState('user', ['user']),
    ...mapState('profile', {profile:'user'}),
    ...mapState('feedback', ['feedback']),
  },
  async mounted() {
    await this.fetchAuditionData(this.$route.params.audition);
    await this.fetchUserList(this.$route.params.round);
    let feedback = { 
      user:this.$route.params.id,
      round:this.$route.params.round
    };
    await this.fetchUserFeedback(feedback);
    if(this.feedback != ''){
       this.workon = this.feedback.work == 'vocals' ? 1 :this.feedback.work == 'acting' ? 2 : 3;
       this.favorite = this.feedback.favorite;
       this.emoji = this.feedback.evaluation
       this.callback = this.feedback.callback == 1 ?true:false;
       this.form.comment = this.feedback.comment;
    }

    this.currentUser = this.userList.filter(userList => userList.user_id == this.$route.params.id);
    if(this.currentUser != ""){
      this.slot = this.currentUser[0].slot_id;
      this.rol = this.currentUser[0].rol;
    }
    let data = {"appointment_id": this.$route.params.round, "performer": this.$route.params.id}
    await this.fetchTeamFeedback(data);
  },
  methods: {
    ...mapActions('user', ['fetch']),
    ...mapActions('audition', ['fetchAuditionData', 'fetchUserList', 'fetchTeamFeedback']),
    ...mapActions('profile', {fetchProfile: "fetch"}),
    ...mapActions('feedback', ['fetchUserFeedback']),
    goToday() {
      this.$refs.calendar.goToday()
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
      debugger;
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
</style>
