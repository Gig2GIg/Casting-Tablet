<template>
  <nav class="flex justify-center items-center h-12 text-white">
    <div class="flex flex-col">
      <div
        class="relative h-12 my-2 ml-5 w-11/12"
      >
      <img class="absolute top-0 left-0 bottom-0 my-auto ml-1 h-5" src="/images/icons/search.png" alt="search Gig 2 Gig">
      <input
          v-model="search"
          placeholder="Search"
          ref="inputTag"
          class="text-black rounded-full overflow-hidden w-full h-8 mt-2 py-3 px-6 placeholder-purple focus:outline-none"
          v-bind="$attrs"
          @change="$emit('onSearch', $event.target.value)"
      >
      </div>
    </div>
    <div class="w-7/12 text-center">News & Updates</div>
    <div class="flex items-center border-l border-white text-white ml-auto cursor-pointer">
      <span class="mx-4">
        {{user.details.first_name}} {{user.details.last_name}}
      </span>
      <!-- <i class="material-icons mr-4">
        keyboard_arrow_down
      </i>-->
      <img        
        :src="user.image.thumbnail ? user.image.thumbnail : user.image.url"
        class="w-12 img-h48 object-cover"
        alt="Avatar"
      >
    </div>
  </nav>
</template> 
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      search: '',
      invitation:{
        adding:false,
        code:'',
      }
    };
  },
  computed:{
    ...mapState('audition', ['userList']),
    ...mapState('profile', ['user']),
  },
  mounted(){
    // this.fetchUserList()
    this.fetch();
  },
  methods: {
    ...mapActions('audition', ['fetchUserList']),
    ...mapActions('profile', ['fetch']),
    async sendData(){
      let data = {
        "code": this.invitation.code,
      }
      await axios.post(`/t/performers/add`, data);
      $emit('onAdd', '1')
      // this.fetchUserList();
    },
  },
};
</script>
<style scoped>
nav {
  background-image: linear-gradient(#4D2545, #782541);
}
.img-h48{
  height: 48px;
}
</style>
