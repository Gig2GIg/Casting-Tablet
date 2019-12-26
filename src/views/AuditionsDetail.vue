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
          <draggable
            v-if="finalUserList && finalUserList.length > 0"
            class="dragArea list-group flex flex-wrap"
            :list="finalUserList"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @change="log"
            :move="checkMove"
          >
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
                  />
                  </router-link>
                <div @click="approveBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full grren-back h-10 flex items-center">
                  <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button">1</button>
                </div>
                <div @click="rejectBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full red-back h-10 flex items-center">
                  <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button">2</button>
                </div>
                <div>
                  <input
                          v-if="isShowCreateGroup"
                          type="checkbox"
                          class="flex items-center justify-between text-purple rounded-full overflow-hidden w-full pl-6 cursor-pointer select-none"
                          :id="'user_' + data.user_id"
                          :value="data.user_id"
                          v-model="checkedNames"
                  >
                </div>
              </div>
            </transition-group>
          </draggable>
          <draggable
                  v-else-if="finalCastListUser && finalCastListUser.length > 0"
                  class="dragArea list-group flex flex-wrap"
                  :list="finalCastListUser"
                  :group="{ name: 'people', pull: 'clone', put: false }"
                  @change="log"
                  :move="checkMove"
          >
            <transition-group  class="flex flex-wrap justify-center content-center" type="transition" :name="!drag ? 'flip-list' : null">
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
                <div @click="approveBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full grren-back h-10 flex items-center">
                  <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button">1</button>
                </div>
                <div @click="rejectBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full red-back h-10 flex items-center">
                  <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button">2</button>
                </div>
                <div>
                  <input
                          v-if="isShowCreateGroup"
                          type="checkbox"
                          class="flex items-center justify-between text-purple rounded-full overflow-hidden w-full pl-6 cursor-pointer select-none"
                          :id="'user_' + data.user_id"
                          :value="data.user_id"
                          v-model="checkedNames"
                  >
                </div>
              </div>
            </transition-group>
          </draggable>
          <draggable
            v-else
            class="dragArea list-group flex flex-wrap"
            :list="userList"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @change="log"
            :move="checkMove"
          >
            <transition-group  class="flex flex-wrap justify-center content-center" type="transition" :name="!drag ? 'flip-list' : null">
              <div

                class="list-group-item"
                v-for="(data) in userList"
                :key="data.user_id"
              >
                  <router-link :to="{ name: 'auditions/user', params: {id: data.user_id, round: round.id, audition:$route.params.id} }">
                  <card-user
                    :title="data.name"
                    :time="data.time"
                    :image="data.image"
                  />
                  </router-link>
                <div @click="approveBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full grren-back h-10 flex items-center">
                  <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button">1</button>
                </div>
                <div @click="rejectBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full red-back h-10 flex items-center">
                  <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button">2</button>
                </div>
                <div>
                  <input
                          v-if="isShowCreateGroup"
                          type="checkbox"
                          class="flex items-center justify-between text-purple rounded-full overflow-hidden w-full pl-6 cursor-pointer select-none"
                          :id="'user_' + data.user_id"
                          :value="data.user_id"
                          v-model="checkedNames"
                  >
                </div>
              </div>
            </transition-group>
          </draggable>
          <modal :width="500" height="380" :adaptive="true" name="showApproveMdl">
            <button @click="$modal.hide('showApproveMdl')">
              <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
            </button>
            <form @submit.prevent="handleApprMdlFrm('approved')">
            <h2 style="text-align: center;" class="text-purple">Instant Feedback</h2>
            <h2 class="text-purple">Send a Message</h2>
            <base-input
                    type="textarea"
                    v-model="comment"
                    placeholder="Add a brief message"
                    class="px-2 py-2 w-2/3"
                    :custom-classes="['border', 'border-purple', 'mt-0']"
            />
            <h2>Recommend an Audition</h2>

              <v-select label="title" v-model="selectedAudition" :options="options" @search="fetchOptions"/>
              <base-button type="submit" expanded>Submit</base-button>
            </form>
          </modal>
          <modal :width="500" height="380" :adaptive="true" name="showRejectMdl">
            <button @click="$modal.hide('showRejectMdl')">
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
        @change="verifyRegisters"
      >
        <transition-group class="flex flex-wrap w-full justify-center content-center w-full " type="transition" :name="!drag ? 'flip-list' : null">
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
      finalCastListUser: []
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
  },
  methods: {
    ...mapActions("audition", [
      "fetchUserList",
      "fetchFinalCastList",
      "removePerformer",
      "addPerformer"
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
        this.isShowCloseGroup = this.openGroupMember.length > 0 || false;
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
          this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }
      if (this.finalCast.length > 0) {
        this.finalCastFilter = this.finalCast;
      }
    },
    async chargeFinalCast() {
      await this.fetchFinalCastList(this.$route.params.id);
      for (let data in this.finalCast) {
        let filtered_data = this.userList.filter(
          user => user.user_id == this.finalCast[data].user_id
        );
        for (let j in filtered_data) {
          this.finalCast[data].image = filtered_data[j].image;
          this.finalCast[data].name = filtered_data[j].name;
          this.finalCast[data].time = filtered_data[j].time;
          this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }
      this.mainRoles = this.roles;
      this.mainRoles.map(role => {
        this.finalCast.map(user => {
          if (user.rol_id == role.id) {
            role.name = user.name;
            role.image.url = user.image;
            role.rol = user.rol_name;
          }
        });
      });
      if (this.finalCast.length > 0) {
        this.finalCastFilter = this.finalCast;
      }
    },
    async verifyRegisters(item) {
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
        this.toggleFinalCastListUser(item.added.element.user_id);
      } catch (e) {
        console.log(e);
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
        let filtered_data = this.userList.filter(
          user => user.user_id == this.finalCast[data].user_id
        );
        for (let j in filtered_data) {
          this.finalCast[data].image = filtered_data[j].image;
          this.finalCast[data].name = filtered_data[j].name;
          this.finalCast[data].time = filtered_data[j].time;
          this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }
      this.mainRoles = this.roles;
      this.mainRoles.map(role => {
        if (this.finalCast.length > 0) {
          this.finalCast.map(user => {
            this.toggleFinalCastListUser(user.user_id)
            if (user.rol_id == role.id) {
              role.name = user.name;
              role.image.url = user.image;
              role.rol = user.rol_name;
            }
          });
        }
      });
      if (this.finalCast.length > 0) {
        this.finalCastFilter = this.finalCast;
      }
      this.finalCastState = true;
    },
    checkMove: function(evt) {
      evt.draggedContext.element.name !== "apple";
    },
    toggleFinalCastListUser(performer_id){
      this.finalCastListUser = [];
      this.finalUserList = [];
      let entry = _.each(this.userList, user => {
        if(user.user_id != performer_id){
          this.finalCastListUser.push(user);
        }
      });
      // if (entry) this.finalCastListUser.push(entry);
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
</style>
