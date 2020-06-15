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
    <div v-if="showHiddenPerformer" class=" cursor-pointer flex content-around w-100 items-center relative cmb-10" @click="backHiddenPerformer">
      <img
        src="/images/icons/left_arrow_white.png"
        class="absolute left-0 pl-1"        
      />
      <h1 class="absolute left-0 text-white text-lg back-mrg-l">Back</h1>
    </div>
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
    <div class="flex flex-col custom-top-nav" v-if="!showHiddenPerformer && !isAuditionVideos && isShowManageGroup && performerCount && performerCount > 0">
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
          @change="handleFile"
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
      <div v-lazy-container="{ selector: 'img' }" >
          <img
              
              :data-loading="loading_placeholder" :data-error="user_placeholder"
              :data-src="user.image && user.image.thumbnail ? user.image.thumbnail : (user.image && user.image.url ? user.image.url : '')"
              class="w-12 img-h48 object-cover"
              alt="Avatar"
          />
      </div>
    </div>
    <modal class="flex flex-col w-full items-center" :width="450" :height="200" name="modal_thumbnail_image">
      <div class="content my-info-content" >         
        <section class="image-preview-area">            
            <div class="flex justify-center mb-4 items-center px-3 w-full">
              <div class="w-full  ml-4 text-purple px-2">
                  <base-input
                    v-model="videoFileName"
                    :custom-classes="['border border-b border-gray-300']"
                    name="file_name"
                    placeholder="File Name"
                    data-vv-as="file name"
                  />
              </div>
            </div>
            <div class="container flex w-full mt-3 cursor-pointer">
              <div class="flex w-full text-center justify-center flex-wrap actions">
            <a
              href="#"
              role="button"
              @click.prevent="imageRenameDone"
            >
              Done
            </a>
            <a
              href="#"
              role="button"
              @click.prevent="imageRenameCancel"
            >
              Cancel
            </a>
          </div>
      </div>
        </section>
      </div>
    </modal>

  </nav>
  

</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import axios from "axios";
import { eventBus } from "../main";
import firebase from "firebase/app";
import uuid from 'uuid/v1';
import ThumbService from '@/services/ThumbService';
import DEFINE from "@/utils/const.js";
import Vue from "vue";

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
        name: "Record Group"
      },
      audition_data: null,
      showHiddenPerformer: false,
      isAuditionVideos: false,
      thumbnail : {},
      videoFileName : null,
      user_placeholder : DEFINE.role_placeholder,
      loading_placeholder : DEFINE.loading_placeholder
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
    eventBus.$on("showHiddenPerformer", value => {
      this.showHiddenPerformer = value;
    });
    eventBus.$on("auditionVideoDetails", value => {
      this.isAuditionVideos = value.videoSection;
    });
  },
  methods: {
    ...mapActions("audition", ["fetchUserList", "fetchAuditionDataNew"]),
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
    backHiddenPerformer() {
      this.showHiddenPerformer = false;
      eventBus.$emit("showHiddenPerformer", this.showHiddenPerformer);
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
    async handleFile(e) {
      this.thumbnail = {};
      this.form.file = null;
      let file = e.target.files[0];
      this.form.file = file;
      this.file.name = file.name;
      this.file.org_name = file.name;
      
      if(file.type.match('video')) {
        this.videoFileName = JSON.parse(JSON.stringify(this.file.name));
        await ThumbService.videoThumbnail(file,DEFINE.thumbSize.videoThumbWidth).then((thumb_data) => {          
          Vue.set(this.thumbnail, 'preview', thumb_data.preview);
          Vue.set(this.thumbnail, 'file', thumb_data.file);
        });
        this.$modal.show('modal_thumbnail_image');
      } else{        
        this.$toasted.error('Please upload valid video file!');
        this.$refs.inputFile.value = null;
        this.file.name = 'Record Audition';
        this.videoFileName = null;
      }      
      console.log("snapImage -> final ", this.thumbnail)
    },
    imageRenameDoneOld(){
      this.$toasted.clear();
        if(!this.videoFileName || this.videoFileName == '' || this.videoFileName.trim() == ''){
          this.$toasted.error('Please enter filename!');
          return;
        } else if(this.videoFileName && this.videoFileName.length > 150){
          this.$toasted.error('Filename is too long, it should not be more than 150 characters!');
          return;
        }
        this.file.name = JSON.parse(JSON.stringify(this.videoFileName));
        this.videoFileName = null;
        this.$modal.hide('modal_thumbnail_image');
    },
    imageRenameCancel(){
      this.videoFileName = null;
      this.$modal.hide('modal_thumbnail_image');
    },
    async imageRenameDone() {
      this.$toasted.clear();
      if(!this.videoFileName || this.videoFileName == '' || this.videoFileName.trim() == ''){
        this.$toasted.error('Please enter filename!');
        return;
      } else if(this.videoFileName && this.videoFileName.length > 150){
        this.$toasted.error('Filename is too long, it should not be more than 150 characters!');
        return;
      }
      this.file.name = JSON.parse(JSON.stringify(this.videoFileName));
      this.$modal.hide('modal_thumbnail_image');

      let auditionData = await this.fetchAuditionDataNew(this.$route.params.id);
      eventBus.$emit("clickRecordGroup", this.isClickRecordGroup);      
      try {
        if (this.file.name != "Record Group") {

           // upload thumbnail file
          let thumbnailUrl;
          if(this.thumbnail.file){
            let thumbnailFile = await firebase.storage()
            .ref(`temp/thumbnail/${uuid()}.png`)
            .put(this.thumbnail.file);        
            thumbnailUrl = await thumbnailFile.ref.getDownloadURL();
            console.log("saveFeedback -> thumbnailUrl", thumbnailUrl)
          }
          
          // upload video file
          var extension = this.file.org_name.substring(this.file.org_name.lastIndexOf('.')+1);
          console.log("saveFeedback -> extension", extension)
          let filePath = this.file.name.includes(`${extension}`) ? `temp/${uuid()}_${this.file.name}` : `temp/${uuid()}_${this.file.name}.${extension}`;          
          console.log("saveFeedback -> filePath", filePath)

          let file = await firebase
            .storage()
            .ref(filePath)
            .put(this.form.file);

          let url = await file.ref.getDownloadURL();

          let audition_record = {
            url: url,
            thumbnail: thumbnailUrl ? thumbnailUrl : null,
            appointment_id: auditionData.appointment_id
              ? auditionData.appointment_id
              : "",
            performer: "",
            slot_id: "",
            'name': this.file.name
          };
          let files = await axios.post(
            "/t/auditions/video/save",
            audition_record
          );
          this.$refs.inputFile.value = null;
          this.videoFileName = null;
          this.file.name = 'Record Group';
          this.$toasted.success("Group record saved");
        }
      } catch (error) {
        console.log("imageRenameDone -> error", error)
        this.$toasted.error(error.response.data.data);
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
  color: #4d2545;
}
.custom-btn-record {
  padding: 0 15px;
  margin-right: 15px;
  border: 1px solid #fff;
}
.img-h48 {
  height: 48px;
}
.back-mrg-l {
  padding-left: 30px !important;
}
.image-preview-area {
  width: 400px;
}
.actions {
  margin-top: 1rem;
}
.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #782541;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.v--modal-box.v--modal {
    overflow: auto !important;
    min-height: 200px !important;
}
</style>
