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
    <div class="w-2/12 text-center ml-72 -mr-72">Talent Database</div>
    <div class="w-1/2 flex flex-col">
      <div class="w-1/2 z-40">
          <div v-show="invitation.adding" class="mt-16 mr-32 shadow-lg bg-white absolute right-0 top-0 z-40">
            <base-input
              v-model="invitation.code"
              v-validate="'required'"
              name="code"
              placeholder="code"
              :custom-classes="['border', 'border-purple']"
              :message="errors.first('invitation.code')"
              expanded
            />

            <base-button
              class="pt-2 pb-2"
              type="submit"
              expanded
              @click.native="sendData"
            >
              Add Performer
            </base-button>
          </div>
      </div>
      <img :src="'/images/icons/Path_31@3x_1.png'" class="h-6  ml-auto mr-5" alt="star" @click="invitation.adding = invitation.adding == true?false:true">
      </div>
    <div class="flex items-center border-l border-white text-white ml-auto cursor-pointer login-user-details">
      <span class="mx-4">
        {{user.details && user.details.first_name ? user.details.first_name : ''}} {{user.details && user.details.last_name ? user.details.last_name : ''}}
      </span>
      <!-- <i class="material-icons mr-4">
        keyboard_arrow_down
      </i>-->
      <img
        :src="user.image && user.image.url ? user.image.url  : ''"
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
      counter: 0,
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
      try{
        let code = await axios.post(`/t/performers/add`, data);
        if(code.data.data == "This user exits in your data base"){
          this.$toasted.error(code.data.data);
        }
        else{
          this.$toasted.success('Performer added successfully');
        }
      }
      catch(e){
        this.$toasted.error(e);
      }
      this.$emit('onAdd', this.counter++);
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
