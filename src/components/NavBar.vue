<template>
  <nav class="flex items-center h-12">    
    <div class="flex items-center border-l border-white text-white ml-auto cursor-pointer">
      <span class="mx-4">
        {{ user.details?user.details.first_name + ' ' + user.details.last_name:"" }}
      </span>
      <!-- <i class="material-icons mr-4">
        keyboard_arrow_down
      </i> -->
      <img
        :src="user.image?user.image.url:''"
        class="w-12 img-h48 object-cover"
        alt="Avatar"
      >
    </div>
  </nav>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import TokenService from '../services/core/TokenService';
import store from '@/store';

export default {
  data() {
    return {
      isLoading: true,
      userId: '',
    };
  },
  computed: {
    ...mapState('audition', ['auditions', 'upcoming', 'passed']),
    ...mapState('profile', ['user']),
  },
  async created() {
    let isLogin = store.getters['auth/isAuthenticated'];
    if(isLogin){
      this.fetch();
    }
    
  },
  async mounted() {
    this.userId = TokenService.getUserId();
  },
  methods: {
    ...mapActions('audition', ['fetchUpcoming', 'fetchPassed']),
    ...mapActions('profile', ['fetch'])    
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
