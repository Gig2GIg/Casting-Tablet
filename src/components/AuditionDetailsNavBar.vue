<template>
  <nav class="flex justify-center items-center h-12 text-white">
    <div class="flex flex-col" v-if="isSearchEnable">
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
    <div class="w-2/12 text-center ml-72 -mr-72">Audition Details</div>
    <div class="w-1/2 flex flex-col" v-if="isShowManageGroup && performerCount && performerCount > 0">             
        <div 
          v-if="isShowNewGroup"
          class="text-white h-6 ml-auto mr-5" >
          <button @click="showCreateGroup(true)">New Group</button>
        </div>   
        <div class="text-white h-6 ml-auto mr-5" 
          v-if="!isShowNewGroup && isShowCreateGroup" >
          <button 
          @click="cancelGroup()" >Cancel Group</button>
          <button 
          class="ml-5"
          @click="createGroup()" >Create Group</button>
        </div>   
        <div class="text-white h-6 ml-auto mr-5" 
          v-if="!isShowCreateGroup && isShowCloseGroup"
          >
          <button 
          @click="recordGroup()" >Record Group</button>
          <button 
          class="ml-5"
          @click="closeGroup()" >Close Group</button>
        </div>   

      </div>
    <div class="flex items-center border-l border-white text-white ml-auto cursor-pointer">
      <span class="mx-4">
        {{user.details && user.details.first_name ? user.details.first_name : ''}} {{user.details && user.details.last_name ? user.details.last_name : '' }}
      </span>
      <!-- <i class="material-icons mr-4">
        keyboard_arrow_down
      </i>-->
      <img
        v-if="user.image && user.image.url"
        :src="user.image.url"
        class="w-12"
        alt="Avatar"
      >
    </div>
  </nav>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import axios from "axios";
import { eventBus } from "../main";

export default {
  data() {
    return {
      search: "",
      counter: 0,
      invitation: {
        adding: false,
        code: ""
      },
      enableNewGrpBtn: "",
      isSearchEnable: false,
      isShowManageGroup : false,
      isShowNewGroup: true,
      isClickCancelGroup: false,
      isShowCreateGroup: false,
      isClickCreateGroup: false,
      isShowRecordGroup: false,
      isClickRecordGroup: false,
      isShowCloseGroup: false,
      isClickCloseGroup: false,
      performerCount : 0
    };
  },
  computed: {
    ...mapState("audition", ["userList"]),
    ...mapState("profile", ["user"])
  },
  mounted() {
    // this.fetchUserList()
    this.fetch();
  },
  created() {
    eventBus.$on("showManageGroup", value => {
      this.isShowManageGroup = value;
    });
    eventBus.$on("performerCount", value => {
      this.performerCount = value;
    });
  },
  methods: {
    ...mapActions("audition", ["fetchUserList"]),
    ...mapActions("profile", ["fetch"]),
    async sendData() {
      let data = {
        code: this.invitation.code
      };
      try {
        let code = await axios.post(`/t/performers/add`, data);
        if (code.data.data == "This user exits in your data base") {
          this.$toasted.error(code.data.data);
        } else {
          this.$toasted.success("Performer added successfully");
        }
      } catch (e) {
        this.$toasted.error(e);
      }
      this.$emit("onAdd", this.counter++);
      // this.fetchUserList();
    },
    newGroup() {
      eventBus.$emit("newGroup", this.isShowNewGroup);
    },
    cancelGroup() {
      this.isShowNewGroup = true;
      this.isShowCreateGroup = !this.isShowNewGroup;
      eventBus.$emit("clickCancelGroup", this.isClickCancelGroup);
    },
    showCreateGroup(value) {
      this.isShowCreateGroup = value;
      this.isShowNewGroup = !this.isShowCreateGroup;
      eventBus.$emit("createGroup", this.isShowCreateGroup);
    },
    showRecordGroup() {
      eventBus.$emit("recordGroup", this.isShowRecordGroup);
    },
    showCloseGroup() {
      eventBus.$emit("closeGroup", this.isShowCloseGroup);
    },
    createGroup() {
      this.isClickCreateGroup = true;
      eventBus.$emit("clickCreateGroup", this.isClickCreateGroup);
    },
    recordGroup() {
      eventBus.$emit("clickRecordGroup", this.isClickRecordGroup);
    },
    closeGroup() {
      eventBus.$emit("clickCloseGroup", this.isClickCloseGroup);
    }
  }
};
</script>
<style scoped>
nav {
  background-image: linear-gradient(#4d2545, #782541);
}
</style>
