<template>
  <section class=" bg-gray-100 flex flex-col items-center h-full w-4/12 -mt-16">
    <div class="flex w-full mt-10 ">
      <div class="w-1/2 text-center border-b-4 border-gray-600 border-purple">
        <h4 class="font-bold" @click="changeInfo()">Info</h4>
      </div>
      <div class="w-1/2 container text-center border-b-2 border-gray-400 text-gray-500">
        <h4 class="font-bold" @click="changeManage()" >Manage</h4>
      </div>
    </div>
  <transition name="fade">
    <div v-if="info">
      <div class="container flex w-full mt-3">
        <div class="w-full text-center ">
          <h1 class="font-bold text-2xl text-left ml-20 tracking-wide">{{audition.title}}</h1>
        </div>
      </div>
      <div class="container flex w-full">
        <div class="w-1/3 text-center ml-4">
          <h4 class="text-right text-sm">{{$dayjs(audition.date).format('MMMM Do YYYY')}}</h4>
        </div>
        <div class="w-1/4 text-center ml-4 ">
          <h4 class="text-right text-sm">{{audition.time}}</h4>
        </div>
      </div>
      <div class="container flex w-full mb-5 mt-2">
        <div class="w-full text-center ">
          <h1 class="font-bold text-sm text-left ml-20 tracking-wide purple-light">{{audition.agency}}</h1>
        </div>
      </div>
      <div class="w-11/12 border border-gray-300">
      </div>
      <div class="container flex w-full mt-3">
        <div class="w-full text-center ">
          <h1 class="font-bold text-m text-left ml-20 tracking-wide purple-light">{{audition.apointment.slots.length}} Apointments</h1>
        </div>
      </div>

      <div class="w-11/12 border border-gray-300 mt-3"></div>

        <div class="container flex w-full mt-3">
          <div class="flex w-full text-center justify-center flex-wrap">
            <div class="m-3 content-center rounded-full purple-back w-24 h-10 flex items-center">
                <p class="text-white text-xs font-bold content-center tracking-tighter flex-1">UNION</p>
            </div>
            <div class="m-3 content-center rounded-full yellow-light w-24 h-10 flex items-center">
                <p class="text-white text-xs font-bold content-center tracking-tighter flex-1">PAID</p>
            </div>
            <div v-for="data in audition.production" :key="data.id" class="m-3 content-center rounded-full red-light w-24 h-10 flex items-center">
                <p class="text-white text-xs font-bold content-center tracking-tighter flex-1">{{data.toUpperCase()}}</p>
            </div>
          </div>
        </div>

      <div class="w-11/12 border border-gray-300 mt-3"></div>

      <div class="container flex w-full mt-3 justify-center flex-wrap">
        <div class="flex w-9/12 text-justify">
          <p class="text-purple-500">{{audition.description}}</p>
        </div>
      </div>

      <div class="w-11/12 border border-gray-300 mt-3"></div>

      <div class="container flex w-full mt-3 justify-center flex-wrap">
          <a class="text-purple font-bold text-xs" :href="audition.url" target="_blank">{{audition.url}}</a>
      </div>

      <div class="w-11/12 border border-gray-300 mt-3"></div>
      <div class="container flex w-full mt-3">
          <div class="flex w-full text-center justify-center flex-wrap ">
            <carousel
              class="flex"
              :per-page="4"
              :pagination-enabled="false"
            >
            <slide v-for="data in audition.roles" :key="data.id" class="text-center">
              <div class="m-3 rounded-full red-light flex items-center w-12 h-12 button-detail">
                <figure class="flex w-full justify-center">
                  <img
                    :src="`/images/icons/person.png`"
                    alt="Icon"
                    class="content-center h-4"
                  >
                </figure>
              </div>
              <p class="text-purple text-xs justify-center w-16 font-bold tracking-tighter flex-1 ">{{data.name}}</p>
            </slide>
            </carousel>
          </div>
        </div>
        <div class="w-11/12 border border-gray-300 mt-3"></div>
        <div class="container flex w-full mt-3">
          <div class="container flex w-full mt-3">
          <div class="flex w-full text-center justify-center flex-wrap">
            <div v-for="data in audition.media" :key="data.id" class="flex m-3 content-center rounded-lg w-64 h-16 flex justify-center">
              <div class="flex justify-center mr-4 w-1/4 red-light">
                <img
                  :src="`/images/icons/person.png`"
                  alt="Icon"
                  class="h-6"
                >
              </div>
              <div class="w-1/2 bg-gray-700">
                <span class="text-white">{{ data.name }}</span>
              </div>
            </div>
          </div> 
        </div>
        </div>
        <div class="w-11/12 border border-gray-300 mt-3"></div>
        <div class="container flex w-full mt-3">
          <div v-for="data in audition.contributors" :key="data.id" class="flex justify-center w-full ">
            <figure class="flex justify-center mr-4 w-6">
              <img
                :src="`/images/icons/person.png`"
                alt="Icon"
                class="h-6"
              >
            </figure>
            <span class="font-bold text-lg">{{ data.contributor_info.details.first_name }} {{ data.contributor_info.details.last_name }}</span>
          </div>
        </div>
        <div class="w-11/12 border border-gray-300 mt-3"></div>
        <div class="container flex w-full mt-3">
          <div class="flex w-full text-center justify-center flex-wrap">
            <div class="m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail">
                <p class="text-white text-sm font-bold content-center tracking-tighter flex-1">Edit</p>
            </div>
          </div>
        </div>
    </div>
  </transition>
  <transition name="fade">
    <div v-if="manage">
      <div class="flex w-full content-center text-center justify-center flex-wrap">
        <dropdown 
            class="text-red-600 bg-white"
            :options="rounds" 
            :selected="object" 
            @setOption="methodToRunOnSelect"
            v-on:updateOption="methodToRunOnSelect" 
            :placeholder="'Select an Item'">
        </dropdown>
      </div>
      <router-link :to="{ name: 'auditions/checkin', params: {id: roundActive.id } }">
        <div class="flex w-full content-center text-center justify-center flex-wrap">
            <button disabled class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-gray-600 w-48 h-10">
                <p class="flex-1 text-gray-600 text-sm font-semibold content-center tracking-tighter flex-1">Enter Check-In Mode</p>
            </button>
        </div>
      </router-link>
      <div class="w-full border border-gray-300 mt-6 mb-6"></div>
      <div class="flex w-full content-center text-center justify-center flex-wrap">
          <div class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10">
              <p class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1">Enter Monitor Mode</p>
          </div>
      </div>
      <div class="w-full border border-gray-300 mt-6 mb-6"></div>
      <div class="flex w-full content-center text-center justify-center flex-wrap">
          <div class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10">
              <p class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1">Close Auditions</p>
          </div>
      </div>
      <div class="w-full border border-gray-300 mt-6 mb-6"></div>
      <div class="flex w-full content-center text-center justify-center flex-wrap">
          <div class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10">
              <p class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1">Auditions video</p>
          </div>
      </div>
      <div class="w-full border border-gray-300 mt-6 mb-6"></div>
      <div class="flex w-full content-center text-center justify-center flex-wrap">
          <div class="m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10">
              <p class="flex-1 light-purple text-sm font-semibold content-center tracking-tighter flex-1">Final Cast List</p>
          </div>
      </div>
    </div>
  </transition>
</section>

</template>

<script>
import dropdown from 'vue-dropdowns';
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  props: [],
  data() {
    return {
      info: true,
      manage:false,
      roundActive: false,
      arrayOfObjects: [
        {"name": 'Round 1'},
        {"name": 'Round 2'},
        {"name": 'Round 3'},
        {"name": 'Round 4'},
        ],
      object: {
        name: 'Select a Round',
      },
    };
  },
  components: {
      'dropdown': dropdown,
  },
  computed:{
    ...mapState("audition", ["audition"]),
    ...mapState("round", ["rounds"])
  },
  async created() {
    this.fetchAuditionData(this.$route.params.id);
    this.fetch(this.$route.params.id);
  },
  methods:{
    ...mapActions("audition", ["fetchAuditionData"]),
    ...mapActions("round", ["fetch"]),
    changeInfo(){
      this.info = true;
      this.manage = false;
    },
    changeManage(){
      this.info = false;
      this.manage = true;
    },
    methodToRunOnSelect(payload) {
      this.roundActive = payload;
    }
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
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>