<!-- eslint-disable max-len -->
<template>
  <section class="bg-sidebar flex flex-col items-center h-full">
    <div class="flex items-center w-full sticky" v-if="!videoSection">
      <div :class="{ 'border-b-4 border-gray-600 border-purple': info, 'border-b-2 border-gray-400 text-gray-500':!info }" class="flex items-center h-full w-1/2  text-center font-bold">
        <h4
          class="font-bold w-full m-2"
          @click="changeInfo()"
        >
          Info
        </h4>
      </div>
      <div :class="{ 'border-b-4 border-gray-600 border-purple': manage, 'border-b-2 border-gray-400 text-gray-500':!manage }" class="flex items-center h-full w-1/2 text-center">
        <h4
          class="font-bold w-full m-2"
          @click="changeManage()"
        >
          Manage
        </h4>
      </div>
    </div>
  <transition name="fade">
      <div v-show="info" :class="{'hidden': !info}" class="flex flex-wrap justify-center overflow-scroll">
        <div class="container flex w-full mt-3">
          <div class="w-full text-center ">
            <h1 class="font-bold text-2xl text-left ml-20 tracking-wide">
              {{ audition.title }}
            </h1>
          </div>
        </div>
        <div class="container flex w-full px-20">
          <div class="w-1/2 text-left">
            <h4 class="text-left text-sm">
              {{ $dayjs(audition.date).format('MMMM Do YYYY') }}
            </h4>
          </div>
          <div class="w-1/4 text-left">
            <h4 class="text-left text-sm">
              {{ audition.time }}
            </h4>
          </div>
        </div>
        <div class="container flex w-full mb-5 mt-2">
          <div class="w-full text-center ">
            <h1 class="font-bold text-sm text-left ml-20 tracking-wide purple-light">
              {{ audition.agency }}
            </h1>
          </div>
        </div>
        <div class="w-10/12 border border-gray-300" />
        <div class="container flex w-full mt-3">
          <div class="w-full text-center ">
            <h1 class="font-bold text-l text-left ml-20 tracking-wide purple-light">
              {{ audition.apointment.slots.length }} Apointments
            </h1>
          </div>
        </div>

        <div class="w-10/12 border border-gray-300 mt-3" />

        <div class="container flex flex-wrap justify-center w-full mt-3">
          <div class="flex w-10/12 text-center justify-center flex-wrap">
            <div class="m-1 content-center rounded-full purple-back w-16 h-10 flex items-center">
              <p class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide">
                UNION
              </p>
            </div>
            <div class="m-1 content-center rounded-full yellow-light w-16 h-10 flex items-center">
              <p class="text-white text-xs font-bold content-center tracking-tighter flex-1 wide">
                PAID
              </p>
            </div>
            <div
              v-for="data in audition.production"
              :key="data.id"
              class="m-1 content-center rounded-full red-light w-24 h-10 flex items-center"
            >
              <p class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide">
                {{ data.toUpperCase() }}
              </p>
            </div>
          </div>
        </div>

        <div class="w-10/12 border border-gray-300 mt-3" />

        <div class="container flex w-full mt-3 justify-center flex-wrap">
          <div class="flex w-9/12 text-justify">
            <p class="text-purple text-sm">
              {{ audition.description }}
            </p>
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
          <div class="flex w-full text-center justify-center flex-wrap ">
            <carousel
              class="flex"
              :per-page="4"
              :pagination-enabled="false"
            >
              <slide
                v-for="data in audition.roles"
                :key="data.id"
                class="text-center"
              >
                <div class="m-3 rounded-full red-light flex items-center w-12 h-12 button-detail bg-cover" :style="{ backgroundImage: 'url(' + data.image.url + ')' }">
                  <figure class="flex w-full justify-center">
                    <img
                      v-if="data.image.url == ''"
                      :src="`/images/icons/person.png`"
                      alt="Icon"
                      class="content-center h-4"
                    >
                    <img
                      v-else
                      :src="data.image.url"
                      alt="Icon"
                      class="content-center h-4"
                    >
                  </figure>
                </div>
                <p class="text-purple text-xs justify-center w-16 font-bold tracking-tighter flex-1 ">
                  {{ data.name }}
                </p>
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
                class="flex m-3 content-center w-full h-16 flex justify-center"
              >
                <div class="flex justify-center w-9/12 button-detail rounded-lg">
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
        <div class="w-10/12 border border-gray-300 mt-3"></div>
        <div class="container flex w-full mt-3">
          <div
            v-for="data in audition.contributors"
            :key="data.id"
            class="flex justify-center w-full "
          >
            <figure class="flex justify-center mr-4 w-6">
              <img
                :src="`/images/icons/person.png`"
                alt="Icon"
                class="h-6"
              >
            </figure>
            <span class="font-bold text-lg">{{ data.contributor_info.details.first_name }}</span>
          </div>
        </div>
        <div class="w-10/12 border border-gray-300 mt-3" />
        <div class="container flex w-full mt-3">
          <div class="flex w-full text-center justify-center flex-wrap">
            <div class="m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail">
              <p class="text-white text-sm font-bold content-center tracking-tighter flex-1">
                Edit
              </p>
            </div>
          </div>
        </div>
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
                :placeholder="'Select an Item'">
            </dropdown>
          </div>
        </div>
        <div v-if="roundActive.status != 0 && audition.status == 1 && roundActive.status > 0" class="w-full border border-gray-300 mt-6 mb-6" /> 
        <router-link v-if="roundActive.status != 0 && audition.status == 1 && roundActive.status > 0" :to="{ name: 'auditions/checkin', params: {id: roundActive.id } }">
          <div class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer">
            <button
              class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10"
            >
              <p class="flex-1 text-purple text-sm font-semibold content-center tracking-tighter flex-1">
                Enter Check-In Mode
              </p>
            </button>
          </div>
        </router-link>
        <div v-if="roundActive.status != 0 && audition.status == 1 && roundActive.status > 0" class="w-full border border-gray-300 mt-6 mb-6" />
        <div v-if="roundActive.status != 0 && audition.status == 1 && roundActive.status > 0" class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer">
          <router-link :to="{ name: 'monitor-update', params: {id: roundActive.id } }">
          <div class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10">
            <p class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1">
              Enter Monitor Mode
            </p>
          </div>
          </router-link>
        </div>
        <div v-if="audition.status == 0" class="w-full border border-gray-300 mt-6 mb-6" />
        <div v-if="audition.status == 0" class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer">
          <div class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10" @click="changeStatus">
            <p class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1">
              Open Auditions
            </p>
          </div>
        </div>
        <div v-if="audition.status == 1 && roundActive.status > 0" class="w-full border border-gray-300 mt-6 mb-6" />
        <div v-if="audition.status == 1 && roundActive.status > 0" class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer" @click="closeRounds">
          <div class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10">
            <p class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1">
              Close Round
            </p>
          </div>
        </div>
        <div class="w-full border border-gray-300 mt-6 mb-6" />
        <div class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer" @click="auditionVideo()">
          <div class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10">
            <p class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1">
              Auditions video
            </p>
          </div>
        </div>
        <div v-if="audition.status == 2" class="w-full border border-gray-300 mt-6 mb-6" />
        <div v-if="audition.status == 2" class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer" @click="emmitFinalCast()">
          <div class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10">
            <p class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1">
              Final Cast List
            </p>
          </div>
        </div>
        <div v-if="audition.status == 1" class="w-full border border-gray-300 mt-6 mb-6" />
        <div v-if="audition.status == 1" class="flex w-full content-center text-center justify-center flex-wrap cursor-pointer" @click="close">
          <div class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10">
            <p class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1">
              Close Auditions
            </p>
          </div>
        </div>
      </div>
  </transition>

  <transition name="fade">
      <div v-show="videoSection" :class="{'hidden': !videoSection}" class="flex flex-wrap w-full justify-center overflow-scroll">
        <div class="w-10/12 border border-gray-300"></div>
        <div class="container flex w-full mt-2">
          <div class="container flex w-full mt-2">
            <div class="flex w-full text-center justify-center flex-wrap">
              <div class="flex content-center justify-center relative w-1/2">
                <img src="/images/icons/left_arrow.png" class="absolute left-0 " @click="resetOptions">
                <h1 class="text-purple text-lg font-bold">Audition Videos</h1>
              </div>
              <div class="w-full border border-gray-300 mt-1 mb-6" />
              <div
                v-for="data in videos"
                :key="data.id"
                class="flex m-3 content-center w-full h-16 flex justify-center"
              >
                <div class="flex justify-center w-9/12 button-detail rounded-lg">
                  <div class="flex justify-center content-center flex-wrap w-1/2 h-full">
                    <img
                      src="/images/icons/mp4Icon@3x.png"
                      alt="Icon"
                      class="h-10"
                    >
                  </div>
                  <div class="flex content-center relative flex-wrap w-full h-full bg-white">
                    <span class="text-center text-purple font-bold w-full">{{ data.name }}</span>
                    <a :href="data.url" target="_blank"><img
                      src="/images/icons/more-icon@3x.png"
                      alt="Icon"
                      class="h-6 absolute right-0 bottom-0"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
    </div>
  </transition>


  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  props: [],
  data() {
    return {
      info: true,
      manage: false,
      statusChild:1,
      roundActive: false,
      videoSection: false,
      arrayOfObjects: [
        { name: 'Round 1' },
        { name: 'Round 2' },
        { name: 'Round 3' },
        { name: 'Round 4' },
      ],
      object: {
        name: 'Select a Round',
      },
    };
  },
  computed: {
    ...mapState('audition', ['audition', 'videos']),
    ...mapState('round', ['rounds']),
  },
  async beforeMount() {
      await this.fetchAuditionData(this.$route.params.id);
      this.$emit('statusSet', this.audition.status);
  },
  methods: {
    ...mapActions('audition', ['fetchAuditionData', 'openAudition', 'closeAudition', 'listVideos']),
    ...mapActions('round', ['fetch', 'closeRound']),
    changeInfo() {
      this.manage = false;
      this.info = true;
    },
    
    changeManage() {
        this.info = false;
        this.manage = true;
    },
    async emmitFinalCast(){
      await this.$emit('handleFinalCast', 'true');
    },
    async auditionVideo(){
        await this.listVideos(this.roundActive.id);
        this.info = false;
        this.manage = false;
        this.videoSection = true;
    },
    sendDataToChild(data){
      this.statusChild = data;
    },
    async closeRounds(){
      await this.closeRound(this.roundActive.id);
      this.roundActive.status = 0;
      this.sendDataToChild(0)
    },
    resetOptions(){
      this.info = true;
      this.manage = false;
      this.videoSection = false;
    },
    async changeStatus(){
      await this.openAudition(this.audition.id);
      await this.$emit('statusSet', this.audition.status);
    },
    async close(){
      await this.closeAudition(this.audition.id);
      await this.$emit('statusSet', this.audition.status);
    },
    async methodToRunOnSelect(payload) {
      if(payload == "create"){
        this.$router.push({
            name: 'auditions.round', 
            params: { id: this.$route.params.id }
        });
      }
      else{
        await this.$emit('selected', payload)
      }
        this.roundActive = payload;
    },
  },
};
</script>
<style>
.purple-light{
    color: #4d2545!important;
}
.red-light{
    background-color: #93183e;
}
.yellow-light{
  background-color:#d8893a;
}
.purple-back{
  background-color:#4d2545;
}
.button-detail{
  background-image: linear-gradient(#4D2545, #782541);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.bg-sidebar{
  background-color: #f0f0f0;
}

</style>
