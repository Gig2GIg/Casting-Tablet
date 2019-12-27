<template>
  <nav class="flex justify-center items-center h-12 text-white">
      <!-- <div
        v-if="!isShowCreateGroup && isShowCloseGroup"
        class="w-1/5 flex flex-wrap justify-center content-center h-10 border-2 ml-auto border-white rounded-sm cursor-pointer"
        @click="$refs.inputFile.click()">
        <div class="w-full flex">
          <div class="w-1/4 flex justify-center"><img :src="'/images/icons/camera.png'" class="h-6 ml-auto" alt="star">
          </div>
            <p class="w-full text-white tracking-wide text-lg ml-5 tracking-tight truncate">{{file.name}}</p>
        </div>
      </div> -->

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
    <div class="flex flex-col custom-top-nav" v-if="isShowManageGroup && performerCount && performerCount > 0">             
        <div 
          v-if="isShowNewGroup"
          class="text-white h-6 ml-auto mr-5" >
          <button @click="showCreateGroup(true)" class="custom-btn-group"><img src="/images/icons/group-icon.svg" alt="group-icon"/>New Group</button>
        </div>   
        <div class="text-white h-6 ml-auto mr-5" 
          v-if="!isShowNewGroup && isShowCreateGroup" >
          <button @click="cancelGroup()" class="custom-btn btn-empty">Cancel Group</button>
          <button @click="createGroup()" class="custom-btn ml-5 btn-fill">Create Group</button>
        </div>   
        <!-- <div class="text-white h-6 ml-auto mr-5" 
          v-if="!isShowCreateGroup && isShowCloseGroup"
          >
          <button
          @click="recordGroup()" >Record Group</button>
          <button
          class="ml-5"
          @click="closeGroup()" >Close Group</button>
        </div>    -->

      <div class="text-white h-6 ml-auto mr-5 flex"
          v-if="!isShowCreateGroup && isShowCloseGroup"
          >
          <div
        v-if="!isShowCreateGroup && isShowCloseGroup"
        class="flex flex-wrap justify-center content-center h-10 ml-auto border-white rounded-sm cursor-pointer custom-btn-record"
        @click="$refs.inputFile.click()">
        <div class="w-full flex">
          <div class="flex justify-center"><img :src="'/images/icons/camera.png'" class="h-6 ml-auto" alt="star">
          </div>
            <p class="w-full text-white tracking-wide text-lg ml-5 tracking-tight truncate">{{file.name}}</p>
        </div>
      </div>

        <input
          ref="inputFile"
          accept=".mp4"
          type="file"
          @change="recordGroup"
          hidden
          >
          
          <button
          class="custom-btn btn-empty"
          @click="closeGroup()">Close Group
          </button>
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
import firebase from "firebase/app";
import uuid from "uuid/v1";

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
      isShowManageGroup: false,
      isShowNewGroup: true,
      isClickCancelGroup: false,
      isShowCreateGroup: false,
      isClickCreateGroup: false,
      isShowRecordGroup: false,
      isClickRecordGroup: false,
      isShowCloseGroup: false,
      isClickCloseGroup: false,
      performerCount: 0,
      form: {},
      file: {
        name: 'Record Group',
      },
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
    eventBus.$on("showCreateGroup", value => {
      this.isShowNewGroup = !value;
      this.isShowCreateGroup = value;
    });
    eventBus.$on("showNewGroup", value => {
      this.isShowNewGroup = value;
      this.isShowCreateGroup = !value;
      this.isShowCloseGroup = !value;
    });

    eventBus.$on("performerCount", value => {
      this.performerCount = value;
    });
    eventBus.$on("showCloseGroup", value => {
      this.isShowCloseGroup = value;
      this.isShowNewGroup = this.isShowCreateGroup = !this.isShowCloseGroup;
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
      eventBus.$emit("showCloseGroup", this.isShowCloseGroup);
    },
    createGroup() {
      this.isClickCreateGroup = true;
      eventBus.$emit("clickCreateGroup", this.isClickCreateGroup);
    },
    async recordGroup(e) {
      eventBus.$emit("clickRecordGroup", this.isClickRecordGroup);
      const file = e.target.files[0];
      this.form.file = file;
      this.file.name = file.name;
      try {
        if (this.file.name != "Record Group") {
          let file = await firebase
            .storage()
            .ref(`temp/${uuid()}.${this.file.name.split(".").pop()}`)
            .put(this.form.file);

          let url = await file.ref.getDownloadURL();
          let audition_record = {
            url: url,
            appointment_id: this.$route.params.round,
            performer: "",
            slot_id: "",
            name: this.file.name || time() + ".mp4"
          };
          let files = await axios.post(
            "/t/auditions/video/save",
            audition_record
          );
          this.$toasted.success("Group record saved");
        }
      } catch (e) {
        this.$toasted.error(e.response.data.data);
      }
    },
    closeGroup() {
      this.isClickCloseGroup = true;
      eventBus.$emit("clickCloseGroup", this.isClickCloseGroup);
    }
  }
};
</script>
<style scoped>
nav {
  background-image: linear-gradient(#4d2545, #782541);
}
.custom-top-nav {
    width: 100%;
}
.custom-btn-group {
    display: flex;
    border: 1px solid #fff;
    padding: 5px 18px;
    align-items: center;
    font-size: 16px;
}
.custom-btn-group img {
    width: 32px;
    margin-right: 5px;
}
.custom-top-nav .text-white.h-6 {
    height: auto !important;
}
.custom-btn {
    border: 1px solid #fff;
    padding: 5px 18px;
    font-size: 16px;
    display: inline-block;
    border-radius: 4px;
}
.custom-btn.btn-fill {
    background-color: #fff;
    color: #4D2545;
}
.custom-btn-record {padding: 0 15px;margin-right: 15px;border: 1px solid #fff;}
</style>
