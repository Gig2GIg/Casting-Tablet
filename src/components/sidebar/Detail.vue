<template>
  <section class="container bg-gray-200 flex flex-col items-center h-full w-4/12 -mt-16">
    <div class="flex w-full mt-10 ">
      <div class="w-1/2 text-center border-b-4 border-gray-600 border-purple">
        <h4 class="font-bold">Info</h4>
      </div>
      <div class="w-1/2 container text-center border-b-2 border-gray-400 text-gray-500">
        <h4 class="font-bold">Manage</h4>
      </div>
    </div>
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
        <p class="text-purple font-bold text-xs">{{audition.url}}</p>
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
            <div class="m-3 rounded-full red-light flex items-center w-12 h-12">
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
          <div v-for="data in audition.media" :key="data.id" class="m-3 content-center rounded-lg red-light w-64 h-16 flex justify-center">
              <figure class="flex justify-center mr-4 w-6">
            <img
              :src="`/images/icons/person.png`"
              alt="Icon"
              class="h-6"
            >
          </figure>
          <span class="text-white">{{ data.name }}</span>
          </div>
        </div>
      </div>
      </div>
      <div class="w-11/12 border border-gray-300 mt-3"></div>      
      <div class="container flex w-full mt-3">
        <div v-for="data in audition.contributors" :key="data.id" class="flex justify-center w-full">
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
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  props: [],
  data() {
    return {};
  },
  computed:{
    ...mapState("audition", ["audition"])
  },
  async created() {
    this.fetchAuditionData(this.$route.params.id);
  },
  methods:{
    ...mapActions("audition", ["fetchAuditionData"])
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
</style>