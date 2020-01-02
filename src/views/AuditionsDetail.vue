<template>
  <div class="flex text-purple h-full w-full">
    <div class="w-full">
      <div v-if="status == 0" class="flex items-center flex-wrap ml-5 h-full">
        <h4 class="w-full text-center text-purple font-semibold text-2xl">Check-In has not opened for this audition</h4>
      </div>
      <div v-if="(status == 2 && round.length ==0) && (finalCastState == false)" class="flex items-center flex-wrap ml-5 h-full">
        <h4 class="w-full text-center text-purple font-semibold text-2xl">Auditions has been closed for this audition</h4>
      </div>
      <div v-if="status == 1 && userList.length == 0 " class="flex items-center flex-wrap ml-5 h-full">
        <h4 class="w-full text-center text-purple font-semibold text-2xl">Not performers added yet</h4>
      </div>
      <div v-if="isShowPerformer && (status == 1 || finalCastState == true || round.length >0)" class=" flex flex-wrap ml-5">
        <div class="col-6">
          <!-- <draggable
            v-if="!finalCastState && finalUserList && finalUserList.length > 0"
            class="dragArea list-group flex flex-wrap"
            :list="finalUserList"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @change="log"
            :move="checkMove"
          > -->
          <template v-if="!finalCastState && finalUserList && finalUserList.length > 0" class="list-group flex flex-wrap">
            <transition-group  class="flex flex-wrap justify-center content-center" type="transition" :name="!drag ? 'flip-list' : null">
              <div

                class="list-group-item"
                v-for="(data) in finalUserList"
                :key="data.user_id"
              >
                  <router-link :to="{ name: 'auditions/user', params: {id: data.user_id, round: round.id, audition:$route.params.id} }">
                  <card-user
                    :title="data.name"
                    :time="data.time"
                    :image="data.image"
                    class="custom-perfom-list"
                    v-bind:class="{ 'after-clck-new-grp' : isShowCreateGroup}"
                  />
                  </router-link>
                  <div v-if="auditionData.online == 0" class="custom-btn-grp">
                    <!-- <div @click="approveBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full grren-back h-10 flex items-center">
                      <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button"><img src="/images/icons/delete-icon.svg" alt="right-tick" /></button>
                    </div> -->
                    <div @click="approveBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full grren-back h-10 flex items-center">
                      <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button"><img src="/images/icons/right-tick.svg" alt="right-tick" /></button>
                    </div>
                    <div @click="rejectBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full red-back h-10 flex items-center">
                      <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button"><img src="/images/icons/delete-icon.svg" alt="delete-icon" /></button>
                    </div>
                  </div>
                  <div class="check-grp" v-bind:class="{ 'after-check-grp' : isShowCreateGroup}">
                    <input
                            v-if="isShowCreateGroup"
                            type="checkbox"
                            class="flex items-center justify-between text-purple rounded-full overflow-hidden w-full pl-6 cursor-pointer select-none"
                            :id="'user_' + data.user_id"
                            :value="data.user_id"
                            v-model="checkedNames"
                    >
                    <label :for="'user_' + data.user_id"></label>
                  </div>

              </div>
            </transition-group>
          </template>
          <!-- </draggable> -->
          <!-- v-bind="dragOptions" :move="checkMove" -->
          <draggable
                  v-else-if="finalCastState"
                  class="dragArea list-group flex flex-wrap"
                  :list="finalCastListUser"
                  group="people"                  
                  @change="deletePerformer"        
                  :move="checkPerformerMove"
                  @end="endPerformerMove"
                  :emptyInsertThreshold="100"
          >
            <transition-group  class="final-cast-list flex flex-wrap justify-center content-center" type="transition" :name="!drag ? 'flip-list' : null">
              <div
                      class="list-group-item"
                      v-for="(data) in finalCastListUser"
                      :key="data.user_id"
              >
                <router-link :to="{ name: 'auditions/user', params: {id: data.user_id, round: round.id, audition:$route.params.id} }">
                  <card-user
                          :title="data.name"
                          :time="data.time"
                          :image="data.image"
                  />
                </router-link>
              </div>
            </transition-group>
          </draggable>
          <!-- <draggable
            v-else
            class="dragArea list-group flex flex-wrap"
            :list="userList"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @change="log"
            :move="checkMove"
          > -->
          <template v-else class="list-group flex flex-wrap">
            <transition-group  class="flex flex-wrap justify-center content-center" type="transition" :name="!drag ? 'flip-list' : null">
              <div

                class="list-group-item"
                v-for="(data) in userList"
                :key="data.user_id"
              >
                  <!-- <router-link :to="{ name: 'auditions/user', params: {id: data.user_id, round: round.id, audition:$route.params.id} }"> -->
                  <router-link v-bind:class="{ 'pointer-none' : isShowCreateGroup}" :to="!isShowCreateGroup ? { name: 'auditions/user', params: {id: data.user_id, round: round.id, audition:$route.params.id} } : { name: 'auditions/detail', params: {id: $route.params.id} }">
                  <card-user
                    :title="data.name"
                    :time="data.time"
                    :image="data.image"
                    class="custom-perfom-list"
                    v-bind:class="{ 'after-clck-new-grp' : isShowCreateGroup}"
                  />
                  </router-link>
                  <div v-if="auditionData.online == 0" class="custom-btn-grp">
                    <div @click="approveBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full grren-back h-10 flex items-center">
                      <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button"><img src="/images/icons/right-tick.svg" alt="right-tick" /></button>
                    </div>
                    <div @click="rejectBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full red-back h-10 flex items-center">
                      <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button"><img src="/images/icons/delete-icon.svg" alt="delete-icon" /></button>
                    </div>
                  </div>
                  <div class="check-grp" v-bind:class="{ 'after-check-grp' : isShowCreateGroup}">
                    <input
                            v-if="isShowCreateGroup"
                            type="checkbox"
                            class="flex items-center justify-between text-purple rounded-full overflow-hidden w-full pl-6 cursor-pointer select-none"
                            :id="'user_' + data.user_id"
                            :value="data.user_id"
                            v-model="checkedNames"
                    >
                    <label :for="'user_' + data.user_id"></label>
                  </div>
              </div>
            </transition-group>
            </template>
          <!-- </draggable> -->
          <modal :width="500" height="380" :adaptive="true" name="showApproveMdl" class="custom-event-popup">
            <button @click="$modal.hide('showApproveMdl')" class="popup-close-btn">
              <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
            </button>
            <form @submit.prevent="handleApprMdlFrm('approved')">
            <h2 style="text-align: center;" class="text-purple">Instant Feedback</h2>
            <h2 class="text-purple">Send a Message</h2>
            <base-input
                    type="textarea"
                    v-model="comment"
                    placeholder="Add a brief message"
                    class="custom-popup-textarea"
                    :custom-classes="['border', 'border-purple', 'mt-0']"
            />
            <h2>Recommend an Audition</h2>

              <v-select label="title" v-model="selectedAudition" :options="options" @search="fetchOptions"/>
              <base-button type="submit" expanded>Submit</base-button>
            </form>
          </modal>
          <modal :width="500" height="380" :adaptive="true" name="showRejectMdl" class="custom-event-popup">
            <button @click="$modal.hide('showRejectMdl')" class="popup-close-btn">
              <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
            </button>
            <form @submit.prevent="handleApprMdlFrm('rejected')">
              <h2 style="text-align: center;" class="text-purple">Instant Feedback</h2>
              <h2 class="text-purple">Performers who have been hidden will receive the message:</h2>
              <base-input
                type="text"
                v-model="feedbackText"
                readonly
                class="w-full px-2"
                :custom-classes="['border', 'border-purple']"
              />
              <h2>To change feedback go to Instant Feedback in Settings.</h2>
              <base-button type="submit" expanded>Done</base-button>
              <button type="button" @click="dontShowBtn">Don’t show me this again</button>
            </form>
          </modal>
        </div>
      </div>
    </div>
    <sidebar-detail :class="{'hidden': finalCastState}"  @selected="chargeUsers" @statusSet="changeView" @handleFinalCast="activeFinalCast" class="float-right w-1/2 ml-2"/>
    <section :class="{'hidden': !finalCastState}" class="float-right w-1/2 ml-2 bg-sidebar flex flex-col items-center h-full">
      <div class="flex content-center justify-center relative w-1/2 mt-2" @click="finalCastState = false">
        <img src="/images/icons/left_arrow.png" class="absolute left-0 " >
        <h1 class="text-purple text-lg font-bold">Final Cast List</h1>
      </div>
      <div class="w-full border border-gray-300 mt-1 mb-6" />
      <draggable
        class="dragArea list-group flex flex-wrap justify-center content-center w-full"
        :class="{'h-48':mainRoles.length==0}"
        :list="mainRoles?mainRoles:[]"
        group="people"
        :move="checkFinalCastMove"
        @end="endFinalCastMove"
      >
      <!-- @change="verifyRegisters" -->
        <transition-group class="final-role-list flex flex-wrap w-full justify-center content-center w-full " type="transition" :name="!drag ? 'flip-list' : null">
        <div
            class="list-group-item"
            v-for="data in mainRoles"
            :key="data.id"
          >
              <card-user
                :title="data.name"
                :rol="data.rol"
                :image="data.image.url"
              />
        </div>
        </transition-group>
      </draggable>
      <div v-if="mainRoles.length == 0" class="text-center h-full">
          <p class="text-purple font-bold text-xl">Add a performer to <br/>your final cast list</p>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import AuditionService from "@/services/AuditionService";
import draggable from "vuedraggable";
import BaseButton from "../components/BaseButton";
import axios from "axios";
import TokenService from "../services/core/TokenService";
let idGlobal = 8;
import vSelect from "vue-select";
Vue.component("v-select", vSelect);
import _ from "lodash";
import BaseInput from "../components/BaseInput";
import { eventBus } from "../main";
import { close } from "fs";

export default {
  components: {
    BaseInput,
    BaseButton,
    draggable
  },
  data() {
    return {
      isLoading: true,
      status: 0,
      roles: [],
      mainRoles: [],
      round: "",
      drag: false,
      finalCastState: false,
      finalCastFilter: [],
      checkedNames: [],
      openGroupMember: [],
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ],
      userId: "",
      performer_id: "",
      comment: "",
      options: [],
      selectedAudition: null,
      feedbackText: "",
      isShowNewGroup: false,
      isClickCancelGroup: false,
      isShowCreateGroup: false,
      isClickCreateGroup: false,
      isShowRecordGroup: false,
      isClickRecordGroup: false,
      isShowCloseGroup: false,
      isClickCloseGroup: false,
      finalUserList: [],
      isShowPerformer : false,
      isOpenGroup:false,
      finalCastListUser: [],
      auditionData:null,
      fromElementPerformer : null,
      toElementPerformer : null,
      fromElementFinalCast : null,
      toElementFinalCast : null
    };
  },
  destroyed:()=>{
    eventBus.$off();
  },
  watch: {
    userList: function() {
      eventBus.$emit("performerCount", this.userList.length);
      this.manageSelectedPerformer();
    },
    round: function() {
      this.getGroupdetails();
    }
  },
  created() {
    eventBus.$on("newGroup", value => {
      this.isShowNewGroup = value;
    });
    eventBus.$on("clickCancelGroup", value => {
      this.isShowNewGroup = true;
      this.isShowCreateGroup = !this.isShowNewGroup;
      this.checkedNames = [];
    });
    eventBus.$on("createGroup", value => {
      this.isShowCreateGroup = value;
    });
    eventBus.$on("recordGroup", value => {});
    eventBus.$on("closeGroup", value => {});
    eventBus.$on("clickCreateGroup", value => {
      this.createGroupAPI();
    });
    eventBus.$on("clickRecordGroup", value => {});
    eventBus.$on("clickCloseGroup", value => {
      this.closeGroupAPI();
    });
  },
  computed: {
    ...mapState("audition", ["userList", "finalCast"]),
    ...mapState("round", ["rounds"]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  async mounted() {
    this.userId = TokenService.getUserId();
    this.auditionData = await this.fetchAuditionDataNew(this.$route.params.id);
  },
  methods: {
    ...mapActions("audition", [
      "fetchUserList",
      "fetchFinalCastList",
      "removePerformer",
      "addPerformer",
      "fetchAuditionDataNew"
    ]),
    ...mapActions("round", ["fetch"]),
    dontShowBtn(){
      localStorage.setItem("reject_popup_dont_show", "1");
      this.handleApprMdlFrm('rejected');
      this.$modal.hide("showRejectMdl");
    },
    async rejectBtn(performer_id, is_feedback_sent) {
      this.performer_id = performer_id;
      if(is_feedback_sent == 1){
        this.$toasted.error("Feedback already send");
      }else {
        let {data: {data}} = await axios.get(
                `t/instantfeedbacks/defaultFeedback/${this.userId}`
        );
        this.feedbackText = data.comment ? data.comment : "Default Feedback Text";
        if (localStorage.getItem("reject_popup_dont_show") && localStorage.getItem("reject_popup_dont_show") == "1") {
          this.handleApprMdlFrm('rejected');
        } else {
          this.$modal.show("showRejectMdl");
        }
      }
    },
    approveBtn(performer_id, is_feedback_sent) {
      this.performer_id = performer_id;
      if(is_feedback_sent == 1){
        this.$toasted.error("Feedback already send");
      }else{
        this.$modal.show("showApproveMdl");
      }
    },
    fetchOptions(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: _.debounce(async (loading, search, vm) => {
      loading(false);
      if (search.trim().length == 3) {
        let { data: { data } } = await axios.get(
          `t/auditions/find_by_title?value=${search}`
        );
        vm.options = data;
      }
    }),
    destroyedBusevent(){
      eventBus.$off();
    },
    async createGroupAPI() {
      this.$toasted.clear();

      if (!this.checkedNames || this.checkedNames.length == 0) {
        this.$toasted.error("Please select at least one performer.");
        return false;
      }
      try {
        let data = {
          appointment_id: this.round.id,
          user_ids: this.checkedNames
        };
        if (this.selectedAudition) {
          data.suggested_appointment_id = this.selectedAudition.id;
        }
        let res = await axios.post(`/t/group`, data);
        this.$toasted.success(res.data.message);
        this.showCloseGroup(true);
        this.getGroupdetails();
        this.checkedNames = [];
      } catch (ex) {
        console.log(ex);
        this.$toasted.error(ex.response.data.message);
      }
    },
    async closeGroupAPI() {
      this.$toasted.clear();
      try {
        let groupCloseStatusRes = await axios.get(
          `/t/group/close/${this.round.id}`
        );
        this.$toasted.success(groupCloseStatusRes.data.message);
        this.showNewGroup(true);
        this.openGroupMember = [];
        this.finalUserList = [];
        this.getUserlist();
      } catch (ex) {
        console.log(ex);
        this.$toasted.error(ex.response.data.message);
      }
    },
    async getUserlist() {
      this.fetchUserList(this.round.id);
    },
    async getGroupdetails() {
      try {
        let groupStatusRes = await axios.get(
          `/t/group/status/${this.round.id}`
        );
        this.openGroupMember = groupStatusRes.data.data
          ? groupStatusRes.data.data
          : [];
        this.isOpenGroup = this.isShowCloseGroup = this.openGroupMember.length > 0 || false;

        // emit for side bar audition details view for handle close current round first check group is open or not
        eventBus.$emit("isCurrentOpenGroup", this.isOpenGroup);

        this.showCloseGroup(this.isShowCloseGroup);
        await this.manageSelectedPerformer();
        this.isShowPerformer = true;
      } catch (ex) {
        this.isShowPerformer = true;
        console.log(ex);
        this.$toasted.error(ex.response.data.message);
      }
    },
    showCloseGroup(value) {
      this.isShowCreateGroup = false;
      eventBus.$emit("showCloseGroup", value);
    },
    showCreateGroup(value) {
      eventBus.$emit("showCreateGroup", value);
    },
    showNewGroup(value) {
      eventBus.$emit("showNewGroup", value);
    },
    showCreateGroup(value) {
      eventBus.$emit("showCreateGroup", value);
    },
    manageSelectedPerformer() {
      this.finalUserList = [];
      _.each(this.openGroupMember, member => {
        let entry = _.find(this.userList, user => {
          return user.user_id == member.user_id;
        });
        if (entry) this.finalUserList.push(entry);
      });
    },
    async handleApprMdlFrm(type) {
      if(!this.comment){
        this.$toasted.clear();
        this.$toasted.error("Please enter feedback message");
        return false;
      }
      try {
        let data = {
          appointment_id: this.round.id,
          user: this.performer_id,
          evaluator: this.userId,
          comment: type === "approved" ? this.comment : this.feedbackText,
          accepted: type === "approved" ? 1 : 0
        };
        if (this.selectedAudition) {
          data.suggested_appointment_id = this.selectedAudition.id;
        }
        let res = await axios.post(`/t/instantfeedbacks/add`, data);
        this.$toasted.success(res.data.data);
        this.getUserlist();
        this.getGroupdetails();
        this.$modal.hide("showApproveMdl");
        this.$modal.hide("showRejectMdl");
        this.comment = "";
        this.selectedAudition = null;
        this.options = [];
      } catch (ex) {
        console.log(ex);
        this.$toasted.error(ex.response.data.data);
        this.$modal.hide("showApproveMdl");
        this.$modal.hide("showRejectMdl");
        this.comment = "";
        this.selectedAudition = null;
        this.options = [];
      }
    },
    async chargeUsers(value) {
      this.round = value;
      await this.fetchUserList(value.id);
      await this.fetchFinalCastList(this.$route.params.id);
      for (let data in this.finalCast) {
        let filtered_data = this.userList.filter(
          user => user.user_id == this.finalCast[data].user_id
        );
        for (let j in filtered_data) {
          this.finalCast[data].image = filtered_data[j].image;
          this.finalCast[data].name = filtered_data[j].name;
          this.finalCast[data].time = filtered_data[j].time;
          // this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }
      if (this.finalCast.length > 0) {
        this.finalCastFilter = this.finalCast;
      }
    },
    async chargeFinalCast() {
      await this.fetchFinalCastList(this.$route.params.id);
      for (let data in this.finalCast) {
        let filtered_data = _.cloneDeep(this.userList.filter(
          user => user.user_id == this.finalCast[data].user_id
        ));
        for (let j in filtered_data) {
          this.finalCast[data].image = filtered_data[j].image;
          this.finalCast[data].name = filtered_data[j].name;
          this.finalCast[data].time = filtered_data[j].time;
          // this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }
      this.mainRoles = _.cloneDeep(this.roles);
      this.mainRoles.map(async role => {
        if (this.finalCast.length > 0) {

          let filtered_data = await this.finalCast.filter(
                user => user.rol_id === role.id
            );        
          if (filtered_data && filtered_data.length > 0) {
            role.name = filtered_data[0].name;
            role.image.url = filtered_data[0].image;
            role.rol = filtered_data[0].rol_name;
            role.is_peformer = true;
            role.finalcast_id = filtered_data[0].id;
            role.user_id = filtered_data[0].user_id;
          } else {
            role.is_peformer = false;
            role.finalcast_id = null;
            role.user_id = null;
          }
          return role;
        }
        });
      this.toggleFinalCastListUser();
      if (this.finalCast.length > 0) {
        this.finalCastFilter = this.finalCast;
      }
    },
    async verifyRegisters(item) {
      if(item && item.added && item.added.element){
      item.added.element.rol_id = item.added.element.rol;
      let data = {
        audition_id: this.$route.params.id,
        performer_id: item.added.element.user_id,
        rol_id: item.added.element.rol_id
      };
      await this.addPerformer(data);
      try {
        let filtered_data = this.finalCastFilter.filter(
          user =>
            user.rol_id == item.added.element.rol &&
            user.user_id != item.added.element.user_id
        );
        if (filtered_data.length > 0) {
          this.finalCastFilter = this.finalCastFilter.filter(
            user => user.user_id != filtered_data[0].user_id
          );
          await this.removePerformer(filtered_data[0].id);
        }
        await this.chargeFinalCast();
        } catch (e) {
          console.log(e);
        }
      }      
    },
    checkFinalCastMove: function(evt) {
      let returnVal = false;
      this.fromElementFinalCast = evt.draggedContext.element ? evt.draggedContext.element : null;
      this.toElementFinalCast = evt.relatedContext.element ? evt.relatedContext.element : null;

      if(evt.draggedContext && evt.draggedContext.element && evt.draggedContext.element.is_peformer && typeof evt.draggedContext.element.is_peformer !== "undefined"){        
        returnVal = evt.draggedContext.element.is_peformer
      } else {
        let checkClassList = evt.to && evt.to.classList ? Object.values(evt.to.classList) : [];
        returnVal = checkClassList.indexOf('final-role-list') > -1 ? true : false;
      }
      return returnVal;
    },
    async endFinalCastMove(evt){
      // console.log("TCL: endFinalCastMove -> evt", evt)
      // console.log("TCL: endFinalCastMove -> this.fromElementFinalCast", this.fromElementFinalCast)
      // console.log("TCL: endFinalCastMove -> this.toElementFinalCast", this.toElementFinalCast)
      // if(this.fromElementFinalCast.is_peformer && !this.toElementFinalCast.is_peformer && this.fromElementPerformer.user_id){
      //   await this.removePerformer(this.fromElementFinalCast.finalcast_id);
      //   let data = {
      //       audition_id: this.$route.params.id,
      //       performer_id: this.fromElementPerformer.user_id,
      //       rol_id: this.toElementPerformer.id
      //     };
      //   await this.addPerformer(data);

      //   await this.chargeFinalCast();

      // }
    },
    checkPerformerMove: function(evt){
      this.fromElementPerformer = evt.draggedContext.element ? evt.draggedContext.element : null;
      this.toElementPerformer = evt.relatedContext.element ? evt.relatedContext.element : null;
      let returnVal = this.toElementPerformer && this.toElementPerformer.is_peformer ? false : true;
      return returnVal;
    },
    async endPerformerMove(evt){
      let isPerfomer = this.toElementPerformer && this.toElementPerformer.is_peformer && this.toElementPerformer.finalcast_id ? true : false;
        if(!isPerfomer){
          if(this.fromElementPerformer && this.toElementPerformer){
              let data = {
                audition_id: this.$route.params.id,
                performer_id: this.fromElementPerformer.user_id,
                rol_id: this.toElementPerformer.id
              };
              await this.addPerformer(data);
          try {
                // if(isPerfomer){
                //   await this.removePerformer(this.toElementPerformer.finalcast_id);
                // }
                await this.chargeFinalCast();
          } catch (e) {
            console.log(e);
          }
        } 
      } else {
        await this.chargeFinalCast();
      }      
      return !isPerfomer;      
    },
    async deletePerformer(item) {      
      let roleData = item.added && item.added.element ? item.added.element : null;
      if(roleData && roleData.is_peformer && roleData.finalcast_id){
        await this.removePerformer(roleData.finalcast_id);
        this.auditionData = await this.fetchAuditionDataNew(this.$route.params.id);
        this.roles = this.auditionData.roles;
        await this.chargeFinalCast();
      }      
    },
    async activeFinalCast(item) {
      this.roles = item;
      await this.fetch(this.$route.params.id);
      let lastRound = this.rounds.slice(-1);
      if (lastRound.length > 0) {
        await this.fetchUserList(lastRound[0].id);
        this.round = lastRound[0];
      }
      for (let data in this.finalCast) {
        let filtered_data = _.cloneDeep(this.userList.filter(        
          user => user.user_id == this.finalCast[data].user_id
        ));
        
        for (let j in filtered_data) {
          this.finalCast[data].image = filtered_data[j].image;
          this.finalCast[data].name = filtered_data[j].name;
          this.finalCast[data].time = filtered_data[j].time;
          // this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }

      this.mainRoles = _.cloneDeep(this.roles);
      this.mainRoles.map(async role => {
        if (this.finalCast.length > 0) {
          let filtered_data = await this.finalCast.filter(
                user => user.rol_id === role.id
            );        
          if (filtered_data && filtered_data.length > 0) {
            role.name = filtered_data[0].name;
            role.image.url = filtered_data[0].image;
            role.rol = filtered_data[0].rol_name;
            role.is_peformer = true;
            role.finalcast_id = filtered_data[0].id;
            role.user_id = filtered_data[0].user_id;
          } else {
            role.is_peformer = false;
            role.finalcast_id = null;
            role.user_id = null;
          }
          return role;
        }
      });

      this.toggleFinalCastListUser();
      if (this.finalCast.length > 0) {
        this.finalCastFilter = this.finalCast;
      }
      this.finalCastState = true;
    },
    checkMove: function(evt) {
      evt.draggedContext.element.name !== "apple";
    },
    toggleFinalCastListUser(){
      this.finalCastListUser = [];
      this.finalUserList = [];
      let finalCastUserIds = this.finalCast && this.finalCast.length > 0 ? this.finalCast.map(cast=>cast.user_id) : [];
    _.each(this.userList, member => {        
    
        if(finalCastUserIds.indexOf(member.user_id) == -1){
          this.finalCastListUser.push(member);
        }
      });
    },
    async changeView(status) {
      this.status = status;
    },
    cloneDog({ id }) {
      // return {
      //   id: idGlobal++,
      //   name: `cat ${id}`
      // };
    },
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>
<style>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
  position: relative;
}
.list-group-item i {
  cursor: pointer;
}
.grren-back {
  background-color: #159359;
}
.red-back {
  background-color: #93163e;
}
.custom-btn-grp {
    display: flex;
    justify-content: center;
    width: 158px;
}
.custom-btn-grp .rounded-full {
    height: 35px !important;
    width: 35px;
    border-radius: 6px !important;
    cursor: pointer;
    margin-right: 30px !important;
}
.custom-btn-grp .content-center:last-child {
    margin-right: 0 !important;
}
.custom-btn-grp button {
    display: inline-block;
}
.custom-btn-grp button img {
    margin: 0 auto;
}
/* ----- pop up ----- */
.custom-event-popup .v--modal-box.v--modal {
    padding: 60px;
    height: auto !important;
    top: auto !important;
    left: auto !important;
}
.popup-close-btn {
    position: absolute;
    top: 18px;
    left: 18px;
}
.custom-event-popup h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
}
.custom-event-popup p {
    text-align: center;
    margin-bottom: 10px;
}
.custom-small-btn {
    font-size: 13px;
}
.custom-event-popup .relative.h-12.my-2 {
    height: 70px !important;
    margin-bottom: 15px !important;
}
.custom-event-popup .relative input {
    background-color: #f5f5f5;
    border: 0;
    border-radius: 13px !important;
    color: #4D2545;
}
.custom-event-popup .v--modal-background-click {
    display: flex;
    align-items: center;
    justify-content: center;
}
.custom-popup-textarea textarea {
    height: 120px !important;
}
.custom-event-popup input.vs__search {
    border: 1px solid #4D2545;
    border-radius: 30px;
    height: 40px;
    width: 100%;
    outline: none;
    box-shadow: none;
    padding: 0 20px 0 40px;
    background-image: url(/images/icons/search-icon-popup.svg);
    background-repeat: no-repeat;
    background-position: 15px center;
    margin-bottom: 15px;
}
.right-submit-btn {
    width: 70% !important;
    margin: 0 auto;
}
.custom-popup-textarea > div {
    margin-bottom: 30px !important;
}
.custom-event-popup .vs__actions {
    display: none;
}
.check-grp input[type="checkbox"] {
   -webkit-appearance: none;
   -moz-appearance: none;
   appearance: none;
}
.check-grp {
    position: absolute;
    top: 50px;
    left: 3px;
    right: 24px;
    margin: 0 auto;
    width: 40px;
    opacity: 0;
    visibility: hidden;
}
/* .check-grp{position: relative;padding-left: 38px;} */
.check-grp label::before {
    content: "";
    width: 18px;
    height: 9px;
    position: absolute;
    left: 11px;
    top: 13px;
    border-left: 2px solid #D6D6D6;
    border-bottom: 2px solid #D6D6D6;
    -webkit-ransform: rotate(-50deg);
    -ms-transform: rotate(-50deg);
    -moz-transform: rotate(-50deg);
    -o-transform: rotate(-50deg);
    transform: rotate(-50deg);
    z-index: 1;
}
.check-grp label::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    position: absolute;
    left: 0px;
    top: 0px;
    border-radius: 50%;
}
.check-grp input[type="checkbox"]:checked + label::before {
    opacity: 1;
    border-left-color: #fff;
    border-bottom-color: #fff;
}
.check-grp input[type="checkbox"]:checked + label::after {
    border-color: #782541;
    background-color: #782541;
    border-radius: 50%;
}
.check-grp label {
    width: 40px;
    height: 40px;
    display: inline-block;
    cursor: pointer;
}
.custom-perfom-list {
    position: relative !important;
}
.custom-perfom-list .check-grp {opacity: 0;
    visibility: hidden;}
.custom-perfom-list::after {
    position: absolute;
    content: "";
    left: 0;
    right: 7px;
    top: 7px;
    bottom: -47px;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
    visibility: hidden;
}
.custom-perfom-list.after-clck-new-grp::after {
  opacity: 1;
  visibility: visible;
}
.check-grp.after-check-grp {
  opacity: 1;
  visibility: visible
}
.pointer-none {
  cursor: default;
}
.vs__selected-options {
  position: relative;
}
.vs__selected-options .vs__selected {
  position: absolute;
  left: 40px;
  top: 8px;
}
</style>
