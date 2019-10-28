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
    <div class="w-7/12 text-center">Talent Database</div>
    <div class="flex items-center border-l border-white text-white ml-auto cursor-pointer">
      <span class="mx-4">
        John Cruz
      </span>
      <i class="material-icons mr-4">
        keyboard_arrow_down
      </i>
      <img
        src="https://randomuser.me/api/portraits/women/17.jpg"
        class="w-12"
        alt="Avatar"
      >
    </div>
  </nav>
</template> 
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      search: '',
    };
  },
  computed:{
    ...mapState('audition', ['userList']),
  },
  mounted(){
    this.fetchUserList()
  },
  methods: {
    ...mapActions('audition', ['fetchUserList']),
  },
};
</script>
<style scoped>
nav {
  background-image: linear-gradient(#4D2545, #782541);
}
</style>
