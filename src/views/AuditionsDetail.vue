<template>
  <div class="text-purple pl-6 py-8">
    <sidebar-detail class="float-right"></sidebar-detail>
    <div class="container flex flex-wrap w-full ml-5">
      <div v-for="data in userList" :key="data.id">
        <card-user
          :title="data.name"
          :time="data.time"
          :image="data.image"
        />
      </div>
      <div v-for="data in userList" :key="data.id">
        <card-user
          :title="data.name"
          :time="data.time"
          :image="data.image"
        />
      </div>
      <div v-for="data in userList" :key="data.id">
        <card-user
          :title="data.name"
          :time="data.time"
          :image="data.image"
        />
      </div>
      <div v-for="data in userList" :key="data.id">
        <card-user
          :title="data.name"
          :time="data.time"
          :image="data.image"
        />
      </div>
      <div v-for="data in userList" :key="data.id">
        <card-user
          :title="data.name"
          :time="data.time"
          :image="data.image"
        />
      </div>
      <div v-for="data in userList" :key="data.id">
        <card-user
          :title="data.name"
          :time="data.time"
          :image="data.image"
        />
      </div>
      <div v-for="data in userList" :key="data.id">
        <card-user
          :title="data.name"
          :time="data.time"
          :image="data.image"
        />
      </div>
      <div v-for="data in userList" :key="data.id">
        <card-user
          :title="data.name"
          :time="data.time"
          :image="data.image"
        />
      </div>
      <div v-for="data in userList" :key="data.id">
        <card-user
          :title="data.name"
          :time="data.time"
          :image="data.image"
        />
      </div>
      <div v-for="data in userList" :key="data.id">
        <card-user
          :title="data.name"
          :time="data.time"
          :image="data.image"
        />
      </div>
      <div v-for="data in userList" :key="data.id">
        <card-user
          :title="data.name"
          :time="data.time"
          :image="data.image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AuditionService from '@/services/AuditionService';
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  computed:{
    ...mapState("audition", ["userList"])
  },
  async created() {
    this.fetchUserList(this.$route.params.id);
  },
  methods:{
    ...mapActions("audition", ["fetchUserList"])
  },
};
</script>
<style scoped>
@media (min-width: 1280px){
  .container {
      max-width: 900px;
  }
}
</style>