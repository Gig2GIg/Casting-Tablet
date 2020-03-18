<template>
  <div class="flex text-purple h-full w-full container-overflow-hiden" id="container">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <div class="w-full" :class="{'w-calc': finalCastState}">
      <div v-if="status == 0" class="flex items-center flex-wrap ml-5 h-full">
        <h4
          class="w-full text-center text-purple font-semibold text-2xl"
        >Check-In has not opened for this audition</h4>
      </div>
      <div
        v-if="(status == 2 && round.length ==0) && (finalCastState == false)"
        class="flex items-center flex-wrap ml-5 h-full"
      >
        <!-- <h4 class="w-full text-center text-purple font-semibold text-2xl">Auditions has been closed for this audition</h4> -->
      </div>
      <div
        v-if="!showHiddenPerformer && status == 1 && userList.length == 0 "
        class="flex items-center flex-wrap ml-5 h-full"
      >
        <h4 class="w-full text-center text-purple font-semibold text-2xl">No performers added yet</h4>
      </div>
      <div
        v-else-if="showHiddenPerformer && (!hiddenPerformerList || hiddenPerformerList.length == 0)"
        class="flex items-center flex-wrap ml-5 h-full"
      >
        <h4 class="w-full text-center text-purple font-semibold text-2xl">There are no performances</h4>
      </div>
      <div
        v-else-if="isAuditionVideos && (!finalUserList || finalUserList.length == 0)"
        class="flex items-center flex-wrap ml-5 h-full"
      >
        <h4 class="w-full text-center text-purple font-semibold text-2xl">There are no performances</h4>
      </div>
      <div
        v-else-if="isShowPerformer && !showHiddenPerformer && (status == 1 || round.length >0) && (currentAudition && currentAudition.status == 1) && (round && round.status == 1) && !isAuditionVideos && !finalCastState"
        class="flex flex-wrap mt-10 mb-5 ml-2 view-btn-design"
      >
        <div
          class="flex content-around w-8 items-center relative cmb-10 cursor-pointer cus-btn"
          v-bind:class="{ 'background-selected': !isCommentView }"
        >
          <a href="javascript:void(0)">
            <img src="/images/icons/grid.png" @click="changeCommentView('grid')" />
          </a>
        </div>
        <div
          class="flex content-around w-8 items-center relative cmb-10 cursor-pointer cus-btn"
          v-bind:class="{ 'background-selected': isCommentView }"
        >
          <a href="javascript:void(0)">
            <!-- class="absolute left-0" -->
            <img src="/images/icons/list.png" @click="changeCommentView('comment')" />
          </a>
        </div>
      </div>


      <div
        v-if="isShowPerformer && (status == 1 || finalCastState == true || round.length >0 || showHiddenPerformer) && currentAudition.status != 0"
        class="flex flex-wrap ml-5"
      >
        <div class="col-6">
          <template v-if="!finalCastState && showHiddenPerformer" class="list-group flex flex-wrap">
            <transition-group
              v-if="hiddenPerformerList && hiddenPerformerList.length > 0"
              class="flex flex-wrap content-center"
              type="transition"
            >
              <div
                class="list-group-item"
                v-for="(data) in hiddenPerformerList"
                :key="data.user_id"
              >
                <card-user
                  :title="data.name"
                  :time="''"
                  :image="data.image"
                  class="custom-perfom-list relative"
                />
                <div class="custom-btn-grp">
                  <div
                    @click="confirmRestorePerformer(data)"
                    class="content-center rounded-full gray-back h-10 flex items-center w-8/12"
                  >
                    <img src="/images/icons/refresh.png" class="h-5 ml-3" alt="restore-icon" />
                    <button
                      class="text-black text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide"
                      type="button"
                    >Restore</button>
                  </div>
                </div>
              </div>
            </transition-group>
          </template>

          <template
            v-else-if="!finalCastState && ((finalUserList && finalUserList.length > 0) || isAuditionVideos)"
            class="list-group flex flex-wrap"
          >
            <transition-group
              class="flex flex-wrap content-center"
              type="transition"
              :name="!drag ? 'flip-list' : null"
            >
              <div
                class="list-group-item"
                v-bind:class="{ 'comment-box-view': isCommentView }"
                v-for="(data, fi) in finalUserList"
                :key="data.user_id"
              >
                <router-link
                  :to="isAuditionVideos || (currentAudition && currentAudition.status == 2) ? { name: 'talent/user', params: {id: data.user_id} } : { name: 'auditions/user', params: {id: data.user_id, round: round.id, audition:$route.params.id} }"
                >
                  <div class="btn-card-wrap">
                  <card-user
                    :title="data.name"
                    :time="currentAudition && currentAudition.online != 1 ? data.time : ''"
                    :image="data.image"
                    :favorite="!isAuditionVideos ? data.favorite : 0"
                        class="custom-perfom-list card-grid-view"
                        v-bind:class="{ 'after-clck-new-grp' : isShowCreateGroup, 'relative' : !isCommentView}"
                  />
                <div
                        v-show="!isAuditionVideos && auditionData.online == 0 && currentAudition.status == 1 && round && round.status == 1"
                  class="custom-btn-grp"
                >
                  <div
                          @click="approveBtn(data.user_id, data.is_feedback_sent, $event)"
                    class="m-1 content-center rounded-full grren-back h-10 flex items-center"
                  >
                    <button
                      class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide"
                      type="button"
                    >
                      <img src="/images/icons/right-tick.svg" alt="right-tick" />
                    </button>
                  </div>
                  <div
                          @click="rejectBtn(data.user_id, data.is_feedback_sent, $event)"
                    class="m-1 content-center rounded-full red-back h-10 flex items-center"
                  >
                    <button
                      class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide"
                      type="button"
                    >
                      <img src="/images/icons/delete-icon.svg" alt="delete-icon" />
                    </button>
                  </div>
                </div>
                    </div>
                </router-link>
                
                <div
                  v-if="!isAuditionVideos && isCommentView && currentAudition.status == 1 && round && round.status == 1"
                  class="flex flex-col comment-box"
                >
                  <comment-box
                    v-model="casterComment[fi]"
                    :value="casterComment[fi]"
                    :custom-classes="['border border-b border-gray-300']"
                    :name="`${fi}`"
                    placeholder="Add Comment"
                    @added="addCasterComment(data, fi)"
                  />
                </div>
                <div class="check-grp" v-bind:class="{ 'after-check-grp' : isShowCreateGroup}">
                  <input
                    v-show="isShowCreateGroup"
                    type="checkbox"
                    class="flex items-center justify-between text-purple rounded-full overflow-hidden w-full pl-6 cursor-pointer select-none"
                    :id="'user_' + data.user_id"
                    :value="data.user_id"
                    v-model="checkedNames"
                  />
                  <label :for="'user_' + data.user_id"></label>
                </div>
              </div>
            </transition-group>
          </template>

          <div
            id="performer_box"
            v-else-if="finalCastState"
            class="box dragArea list-group flex flex-wrap mt-2"
          >
            <span class="final-cast-list flex flex-wrap content-start items-center">
              <div
                class="slot list-group-item mr-4 mb-3"
                v-for="(data) in finalCastListUser"
                :key="data.user_id"
                v-bind:user_id="data.user_id"
                v-bind:isPerformer="true"
              >
                <div
                  v-if="data.user_id"
                  v-bind:id="'item_'+data.user_id"
                  v-bind:user_id="data.user_id"
                  class="item"
                >
                  <a
                    class="performer-view"
                    v-bind:performer="data.user_id"
                    v-on:click="clickFinalPerformer($event,data)"
                  >
                    <card-user
                      :title="data.name"
                      :isFinalCast="true"
                      :image="data.image && !data.image.url ? data.image : ''"
                      class="relative"
                    />
                  </a>
                </div>
              </div>
            </span>
          </div>
          <template v-else class="list-group flex flex-wrap">
            <transition-group
              class="flex flex-wrap content-center"
              type="transition"
              :name="!drag ? 'flip-list' : null"
            >
            
              <div
                class="list-group-item"
                v-bind:class="{ 'comment-box-view': isCommentView }"
                v-for="(data, ui) in userList"
                :key="data.user_id"
              >
                <router-link
                  v-bind:class="{ 'pointer-none' : isShowCreateGroup}"
                  :to="!isShowCreateGroup ? (currentAudition && currentAudition.status == 2 ? { name: 'talent/user', params: {id: data.user_id} } : { name: 'auditions/user', params: {id: data.user_id, round: round.id, audition:$route.params.id} }) : { name: 'auditions/detail', params: {id: $route.params.id} }"
                >
                  <div class="btn-card-wrap">
                    <card-user
                      :title="data.name"
                      :time="currentAudition && currentAudition.online != 1 ? data.time : ''"
                      :image="data.image"
                      :favorite="data.favorite"
                      class="custom-perfom-list card-grid-view"
                      v-bind:class="{ 'after-clck-new-grp' : isShowCreateGroup, 'relative' : !isCommentView}"
                    />
                    <div
                      v-if="auditionData && auditionData.online == 0 && currentAudition && currentAudition.status == 1 && round && round.status == 1"
                      class="custom-btn-grp"
                    >
                      <div
                        @click="approveBtn(data.user_id, data.is_feedback_sent, $event)"
                        class="m-1 content-center rounded-full grren-back h-10 flex items-center"
                      >
                        <button
                          class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide"
                          type="button"
                        >
                          <img src="/images/icons/right-tick.svg" alt="right-tick" />
                        </button>
                      </div>
                      <div
                        @click="rejectBtn(data.user_id, data.is_feedback_sent, $event)"
                        class="m-1 content-center rounded-full red-back h-10 flex items-center"
                      >
                        <button
                          class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide"
                          type="button"
                        >
                          <img src="/images/icons/delete-icon.svg" alt="delete-icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                </router-link>
                <!-- <div v-if="auditionData && auditionData.online == 0 && currentAudition.status == 1 && round.status == 1" class="custom-btn-grp">
                    <div @click="approveBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full grren-back h-10 flex items-center">
                      <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button"><img src="/images/icons/right-tick.svg" alt="right-tick" /></button>
                    </div>
                    <div @click="rejectBtn(data.user_id, data.is_feedback_sent)" class="m-1 content-center rounded-full red-back h-10 flex items-center">
                      <button class="text-white text-xs font-bold content-center tracking-tighter flex-1 tracking-wide" type="button"><img src="/images/icons/delete-icon.svg" alt="delete-icon" /></button>
                    </div>
                </div>-->
                <div
                  v-if="!isAuditionVideos && isCommentView && currentAudition && currentAudition.status == 1 && round && round.status == 1"
                  class="flex flex-col comment-box"
                >
                  <comment-box
                    v-model="casterComment[ui]"
                    :value="casterComment[ui]"
                    :custom-classes="['border border-b border-gray-300']"
                    :name="`${ui}`"
                    placeholder="Add Comment"
                    @added="addCasterComment(data, ui)"
                  />
                </div>
                <div class="check-grp" v-bind:class="{ 'after-check-grp' : isShowCreateGroup}">
                  <input
                    v-if="isShowCreateGroup"
                    type="checkbox"
                    class="flex items-center justify-between text-purple rounded-full overflow-hidden w-full pl-6 cursor-pointer select-none"
                    :id="'user_' + data.user_id"
                    :value="data.user_id"
                    v-model="checkedNames"
                  />
                  <label :for="'user_' + data.user_id"></label>
                </div>
              </div>
            </transition-group>
          </template>
          <modal
            :width="500"
            height="380"
            :adaptive="true"
            name="showApproveOptionMdl"
            class="custom-event-popup"
          >
            <button @click="$modal.hide('showApproveOptionMdl')" class="popup-close-btn">
              <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
            </button>
            <h2 style="text-align: center;" class="text-purple">Instant Feedback</h2>
            <base-button
              type="button"
              @click="$modal.show('showApproveMdl');$modal.hide('showApproveOptionMdl')"
              expanded
            >Custom</base-button>
            <base-button type="button" @click="approveStdFeedback" expanded>Standard</base-button>
          </modal>
          <modal
            :width="500"
            height="380"
            :adaptive="true"
            name="showApproveMdl"
            class="custom-event-popup"
          >
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

              <v-select
                label="title"
                v-model="selectedAudition"
                :options="options"
                @search="fetchOptions"
              />
              <base-button type="submit" expanded>Submit</base-button>
            </form>
          </modal>
          <modal
            :width="500"
            height="380"
            :adaptive="true"
            name="showRejectMdl"
            class="custom-event-popup"
          >
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
          <modal
            :width="500"
            height="380"
            :adaptive="true"
            name="showApproveStandardMdl"
            class="custom-event-popup"
          >
            <button @click="$modal.hide('showApproveStandardMdl')" class="popup-close-btn">
              <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
            </button>
            <form @submit.prevent="handleApprMdlFrm('approved_std')">
              <h2 style="text-align: center;" class="text-purple">Instant Feedback</h2>
              <h2
                class="text-purple"
              >Performers who have been "green checked" will receive the message:</h2>
              <base-input
                type="text"
                v-model="feedbackStdText"
                readonly
                class="w-full px-2"
                :custom-classes="['border', 'border-purple']"
              />
              <h2>To change feedback go to Instant Feedback in Settings.</h2>
              <base-button type="submit" expanded>Done</base-button>
              <button type="button" @click="dontShowStdBtn">Don’t show me this again</button>
            </form>
          </modal>
          <!--start: enter Check in model modal-->
          <modal
            class="flex flex-col w-full items-center"
            :width="540"
            height="200"
            name="modal_confirm_restore_performer"
          >
            <div class="py-8 px-3">
              <h1 class="text-lg text-purple font-bold text-center">Restore Performer?</h1>
              <p
                class="text-lg text-purple text-center"
              >This will remove the performer from hidden list.</p>
              <div class="w-full flex flex-wrap justify-center overflow-hidden mt-3">
                <div class="w-1/4">
                  <base-button type="submit" expanded @click="cancelRestorePerformer()">Cancel</base-button>
                </div>
                <div class="w-1/4 ml-3">
                  <base-button type="submit" expanded @click="restorePerformer()">Yes</base-button>
                </div>
              </div>
            </div>
          </modal>
        </div>
      </div>
    </div>
    <sidebar-detail
      :class="{'hidden': finalCastState}"
      @selected="chargeUsers"
      @statusSet="changeView"
      @handleFinalCast="activeFinalCast"
      class="float-right w-1/2 ml-2"
    />
    <section
      :class="{'hidden': !finalCastState}"
      class="float-right w-1/2 ml-2 bg-sidebar flex flex-col items-center h-full w-370"
    >
      <div
        class="flex content-center justify-center relative w-1/2 mt-2"
        @click="backFinalCastList"
      >
        <img src="/images/icons/left_arrow.png" class="absolute left-0" />
        <h1 class="text-purple text-lg font-bold">Final Cast List</h1>
      </div>
      <div class="w-full border border-gray-300 mt-1 mb-6" />
      <div
        id="role_box"
        class="box list-group flex flex-wrap justify-center content-start w-full"
        :class="{'h-48':mainRoles && mainRoles.length==0}"
      >
        <div
          class="slot list-group-item final-cast main-role-slot"
          v-for="(data) in mainRoles"
          :key="data.id"
          v-bind:finalcast_id="data.finalcast_id"
          v-bind:isRole="true"
          v-bind:role_id="data.id"
        >
          <div
            v-if="data.user_id"
            class="item"
            v-bind:user_id="data.user_id"
            v-bind:finalcast_id="data.finalcast_id"
          >
            <card-user
              :title="data.name"
              :isFinalCast="true"
              :image="data.image.url ? data.image.url : data.image"
              class="relative"
            />
          </div>
          <span class="role-name">{{data.user_id && data.rol ? data.rol : data.name}}</span>
        </div>
      </div>

      <div v-if="mainRoles.length == 0" class="text-center h-full">
        <p class="text-purple font-bold text-xl">
          Add a performer to
          <br />your final cast list
        </p>
      </div>
      <div class="export-btn">
        <div
          v-if="mainRoles.length > 0"
          class="purple-back cursor-pointer m-3 content-center flex items-center flex m-3 content-center border-2 rounded-sm border-purple w-48 h-10"
        >
          <p
            @click="exportRoleData"
            class="flex-1 text-white text-sm font-semibold content-center text-center tracking-tighter flex-1"
          >Export</p>
        </div>
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
import { setTimeout } from "timers";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(Loading);

import ExcelService from "@/services/ExcelService";

export default {
  components: {
    BaseInput,
    BaseButton,
    draggable,
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      status: 0,
      roles: [],
      mainRoles: [],
      round: {},
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
      feedbackStdText: "",
      isShowNewGroup: false,
      isClickCancelGroup: false,
      isShowCreateGroup: false,
      isClickCreateGroup: false,
      isShowRecordGroup: false,
      isClickRecordGroup: false,
      isShowCloseGroup: false,
      isClickCloseGroup: false,
      finalUserList: [],
      isShowPerformer: false,
      isOpenGroup: false,
      finalCastListUser: [],
      finalCastPerformerList: [],
      auditionData: null,
      currentAudition: null,
      isAuditionVideos: false,
      showHiddenPerformer: false,
      hiddenPerformerList: [],
      currentRestorUser: null,
      isCommentView: false,
      casterComment: []
    };
  },
  destroyed: () => {
    eventBus.$off();
  },
  watch: {
    userList: function() {
      eventBus.$emit(
        "performerCount",
        this.userList && this.userList.length ? this.userList.length : 0
      );
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
    eventBus.$on("currentAudition", value => {
      this.currentAudition = value;
    });
    eventBus.$on("auditionVideoDetails", value => {
      this.showHiddenPerformer = false;
      this.isAuditionVideos = value.videoSection;
      this.isAuditionVideos
        ? this.manageAuditionVideoPerformer(value.videos)
        : this.manageSelectedPerformer();
      eventBus.$emit("showHiddenPerformer", this.showHiddenPerformer);
    });
    eventBus.$on("showHiddenPerformer", value => {
      this.showHiddenPerformer = value;
      if (this.showHiddenPerformer) {
        this.getHiddenPerformer(value);
      } else if (!this.isAuditionVideos) {
        this.getUserlist();
        this.getGroupdetails();
      }
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
    let {
      data: { data }
    } = await axios.get(`t/instantfeedbacks/defaultFeedback/${this.userId}`);
    this.feedbackText = data.comment
      ? data.comment
      : "Thanks for attending. That's all we need today";
    this.feedbackStdText = data.positiveComment
      ? data.positiveComment
      : "Thanks for attending. That's all we need today";
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
    dontShowBtn() {
      localStorage.setItem("reject_popup_dont_show", "1");
      this.handleApprMdlFrm("rejected");
      this.$modal.hide("showRejectMdl");
    },
    dontShowStdBtn() {
      localStorage.setItem("approved_std_popup_dont_show", "1");
      this.handleApprMdlFrm("approved_std");
      this.$modal.hide("showApproveStandardMdl");
    },
    clickFinalPerformer(event, data) {
      event.preventDefault();
    },
    returnRefinedURL(key, url) {
      let newUrl = url
        .replace(new RegExp(key + "=\\w+"), "")
        .replace("?&", "?")
        .replace("&&", "&");
      return newUrl.endsWith("?") ? newUrl.slice(0, -1) : newUrl;
    },
    redirectOnDetails(user_id) {
      if (this.currentAudition && this.currentAudition.status == 2) {
        this.$router.replace(
          this.$route.query.redirect || {
            name: "talent/user",
            params: { id: user_id }
          }
        );
      } else {
        this.$router.replace(
          this.$route.query.redirect || {
            name: "auditions/user",
            params: {
              id: user_id,
              round: this.round.id,
              audition: this.$route.params.id
            }
          }
        );
      }
    },
    backFinalCastList() {
      this.finalCastState = false;
      this.destroyDragDrop();
    },
    destroyDragDrop() {
      $(".ui-selected").draggable("destroy");
      this.mainRoles = [];
      this.finalCastListUser = [];
      // $('.item').remove();
    },
    initDropdrag() {
      let that = this;
      $(function() {
        var isDragging = false;
        $(".performer-view")
          .mousedown(function() {
            isDragging = false;
          })
          .mousemove(function() {
            isDragging = true;
          })
          .mouseup(function() {
            var user_id = $(this).attr("performer");
            var wasDragging = isDragging;
            isDragging = false;
            if (!wasDragging) {
              that.redirectOnDetails(user_id);
              // $("#throbble").toggle();
            }
          });

        var dragOption = {
            delay: 10,
            distance: 5,
            opacity: 0.45,
            revert: true,
            containment: "#container",
            start: function(event, ui) {
              $(".ui-selected").each(function() {
                $(this).data("original", $(this).position());
              });
            },
            drag: function(event, ui) {
              var offset = ui.position;
              $(".ui-selected")
                .not(this)
                .each(function() {
                  var current = $(this).offset(),
                    targetLeft = document.elementFromPoint(
                      current.left - 1,
                      current.top
                    ),
                    targetRight = document.elementFromPoint(
                      current.left + $(this).width() + 1,
                      current.top
                    );
                  $(this)
                    .css({
                      position: "relative",
                      left: offset.left,
                      top: offset.top
                    })
                    .data("target", $.unique([targetLeft, targetRight]));
                  //console.log($.unique([targetLeft, targetRight]));
                });
            },
            stop: function(event, ui) {
              validate($(".ui-selected").not(ui.draggable));
            }
          },
          dropOption = {
            accept: ".item",
            activeClass: "green3",
            greedy: true,
            drop: function(event, ui) {
              // get atrribute value
              var draggable_user_id = ui.draggable.attr("user_id");

              var draggable_parent_isPerformer = ui.draggable
                .parent()
                .attr("isPerformer");
              var draggable_parent_isRole = ui.draggable
                .parent()
                .attr("isRole");

              var droppable_isPerformer = $(this).attr("isPerformer");
              var droppable_isRole = $(this).attr("isRole");

              //  case for handle perform movement
              if (
                draggable_parent_isPerformer == "true" &&
                droppable_isPerformer == "true"
              ) {
                // if move performer from one place to another performer place then revert it
                console.log("revert on same list drop!");
                ui.draggable.animate(ui.draggable.data().original, "slow");
                return;
              } else if (
                draggable_parent_isPerformer == "true" &&
                droppable_isRole == "true" &&
                $(this).find("div.item").length === 0
              ) {
                // From performer list , add performer to particular role

                var draggable_user_id = ui.draggable.attr("user_id");
                var droppable_role_id = $(this).attr("role_id");
                if (
                  draggable_user_id == undefined ||
                  draggable_user_id == null ||
                  droppable_role_id == undefined ||
                  droppable_role_id == null
                ) {
                  // if not found required data then revert back draggable performer to thier back position
                  ui.draggable.animate(ui.draggable.data().original, "slow");
                  return;
                }
                that
                  .addPerformerToRole(draggable_user_id, droppable_role_id)
                  .then(result => {
                    $(this).attr("finalcast_id", result.id);
                    ui.draggable.attr("finalcast_id", result.id);
                  })
                  .catch(err => {
                    console.log("TCL: initDropdrag -> err", err);
                  });
              } else if (
                draggable_parent_isRole == "true" &&
                droppable_isPerformer == "true" &&
                $(this).find("div.item").length === 0
              ) {
                // remove performer from role list

                var draggable_parent_finalcast_id = ui.draggable.attr(
                  "finalcast_id"
                );
                var draggable_user_id = ui.draggable.attr("user_id");
                if (
                  draggable_parent_finalcast_id == undefined ||
                  draggable_parent_finalcast_id == null ||
                  draggable_user_id == undefined ||
                  draggable_user_id == null
                ) {
                  // if not required then revert back draggable performer to thier back position
                  ui.draggable.animate(ui.draggable.data().original, "slow");
                  return;
                }

                that.removePerformerFromRole(
                  draggable_parent_finalcast_id,
                  draggable_user_id
                );
                ui.draggable.parent().removeAttr("finalcast_id");
                ui.draggable.removeAttr("finalcast_id");
              } else if (
                draggable_parent_isRole == "true" &&
                droppable_isRole == "true" &&
                $(this).find("div.item").length === 0
              ) {
                // move performer from one role to another role
                var draggable_parent_finalcast_id = ui.draggable.attr(
                  "finalcast_id"
                );
                var draggable_user_id = ui.draggable.attr("user_id");
                var droppable_role_id = $(this).attr("role_id");
                if (
                  draggable_parent_finalcast_id == undefined ||
                  draggable_parent_finalcast_id == null ||
                  draggable_user_id == undefined ||
                  draggable_user_id == null ||
                  droppable_role_id == undefined ||
                  droppable_role_id == null
                ) {
                  // if not foudn any required then revert back draggable performer to thier last position
                  ui.draggable.animate(ui.draggable.data().original, "slow");
                  return;
                }
                ui.draggable.parent().removeAttr("finalcast_id");
                ui.draggable.removeAttr("finalcast_id");
                that
                  .swapPerformerRoleToRole(
                    draggable_parent_finalcast_id,
                    draggable_user_id,
                    droppable_role_id
                  )
                  .then(result => {
                    $(this).attr("finalcast_id", result.id);
                    ui.draggable.attr("finalcast_id", result.id);
                  })
                  .catch(err => {
                    console.log("TCL: initDropdrag -> err", err);
                  });
              } else {
                console.log("movement action not found!");
                ui.draggable.animate(ui.draggable.data().original, "slow");
                return;
              }

              if ($(this).is(".slot") && !$(this).has(".item").length) {
                console.log("appending");
                $(this).append(
                  ui.draggable.css({
                    top: 0,
                    left: 0
                  })
                );
              } else {
                console.log("reverting");
                ui.draggable.animate(
                  {
                    top: 0,
                    left: 0
                  },
                  "slow"
                );
                // event.preventDefault();
              }
              validate($(".ui-selected").not(ui.draggable));
            }
          };

        $(".box").selectable({
          filter: ".item",
          start: function(event, ui) {
            $(".ui-selected").draggable("destroy");
          },
          stop: function(event, ui) {
            $(".ui-selected").draggable(dragOption);
          },
          selected: function(event, ui) {
            var numItems = $(".ui-selected").length;
            if (numItems > 1) {
              $(".ui-selected").removeClass("ui-selected");
            }
          }
        });
        $(".slot").droppable(dropOption);
        $(".item").draggable(dragOption);

        function validate($draggables) {
          $draggables.each(function() {
            var $target = $($(this).data("target")).filter(function(i, elm) {
              return $(this).is(".slot") && !$(this).has(".item").length;
            });
            if ($target.length) {
              $target.append(
                $(this).css({
                  top: 0,
                  left: 0
                })
              );
            } else {
              $(this).animate(
                {
                  top: 0,
                  left: 0
                },
                "slow"
              );
            }
          });
          $(".ui-selected")
            .data("original", null)
            .data("target", null)
            .removeClass("ui-selected");
        }
      });
      // End : drag and drop box jquery code
    },
    async rejectBtn(performer_id, is_feedback_sent, event) {
      event.preventDefault();
      this.performer_id = performer_id;
      if (is_feedback_sent == 1) {
        this.$toasted.error("Feedback already send");
      } else {
        if (
          localStorage.getItem("reject_popup_dont_show") &&
          localStorage.getItem("reject_popup_dont_show") == "1"
        ) {
          this.handleApprMdlFrm("rejected");
        } else {
          this.$modal.show("showRejectMdl");
        }
      }
    },
    approveBtn(performer_id, is_feedback_sent, event) {
      event.preventDefault();
      this.performer_id = performer_id;
      if (is_feedback_sent == 1) {
        this.$toasted.error("Feedback already send");
      } else {
        this.$modal.show("showApproveOptionMdl");
      }
    },
    approveStdFeedback() {
      this.$modal.hide("showApproveOptionMdl");
      if (
        localStorage.getItem("approved_std_popup_dont_show") &&
        localStorage.getItem("approved_std_popup_dont_show") == "1"
      ) {
        this.handleApprMdlFrm("approved_std");
      } else {
        this.$modal.show("showApproveStandardMdl");
      }
    },
    fetchOptions(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: _.debounce(async (loading, search, vm) => {
      loading(false);
      if (search.trim().length == 3) {
        let {
          data: { data }
        } = await axios.get(`t/auditions/find_by_title?value=${search}`);
        vm.options = data;
      }
    }),
    destroyedBusevent() {
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
        this.casterComment = [];
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
        eventBus.$emit("isCurrentOpenGroup", false);
        this.openGroupMember = [];
        this.finalUserList = [];
        this.casterComment = [];
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
        this.isOpenGroup = this.isShowCloseGroup =
          groupStatusRes &&
          groupStatusRes.data &&
          groupStatusRes.data.is_group_open
            ? groupStatusRes.data.is_group_open
            : false;

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
    async getHiddenPerformer() {
      try {
        let result = await axios.get(
          `appointments/auditions/${this.round.id}/showHidden`
        );
        this.hiddenPerformerList = result.data.data ? result.data.data : [];
      } catch (ex) {
        console.log(ex);
        this.$toasted.error(ex.response.data.message);
      }
    },
    confirmRestorePerformer(data) {
      this.currentRestorUser = data;
      this.$modal.show("modal_confirm_restore_performer");
    },
    cancelRestorePerformer() {
      this.currentRestorUser = null;
      this.$modal.hide("modal_confirm_restore_performer");
    },
    async restorePerformer() {
      this.$toasted.clear();
      try {
        if (this.isLoading) {
          return;
        }
        this.isLoading = true;
        let params = {
          user: this.currentRestorUser.user_id
            ? this.currentRestorUser.user_id
            : "",
          appointment_id: this.round.id
        };
        let result = await axios.post(`t/instantfeedbacks/restore`, params);
        this.$modal.hide("modal_confirm_restore_performer");
        this.currentRestorUser = null;
        this.$toasted.success("Performer has been restored successfully.");
        this.getHiddenPerformer();
        this.isLoading = false;
      } catch (ex) {
        this.currentRestorUser = null;
        this.$modal.hide("modal_confirm_restore_performer");
        this.getHiddenPerformer();
        this.isLoading = false;
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
      this.finalUserList = _.orderBy(this.finalUserList, "time", "asc");
    },
    manageAuditionVideoPerformer(videos) {
      let userIds =
        videos && videos.length > 0
          ? _.compact(
              _.uniq(
                videos.map(video =>
                  video.performer.user_id ? video.performer.user_id : null
                )
              )
            )
          : [];
      this.finalUserList = [];
      _.each(userIds, user_id => {
        let entry = _.find(this.userList, user => {
          return user.user_id == user_id;
        });
        if (entry) this.finalUserList.push(entry);
      });
      this.finalUserList = _.orderBy(this.finalUserList, "time", "asc");
    },
    async handleApprMdlFrm(type) {
      this.comment = this.comment ? this.comment.trim() : "";
      if (
        (type == "rejected" && !this.feedbackText) ||
        (type == "approved_std" && !this.feedbackStdText)
      ) {
        this.$toasted.clear();
        this.$toasted.error("Please enter feedback message");
        return false;
      } else if (type == "approved" && this.comment == "") {
        this.$toasted.clear();
        this.$toasted.error("Please enter feedback");
        return false;
      }
      try {
        if (this.isLoading) {
          return;
        }
        this.isLoading = true;
        let data = {
          appointment_id: this.round.id,
          user: this.performer_id,
          evaluator: this.userId,
          comment:
            type === "approved"
              ? this.comment
              : type === "approved_std"
              ? this.feedbackStdText
              : this.feedbackText,
          accepted: type === "approved" || type === "approved_std" ? 1 : 0
        };
        if (this.selectedAudition) {
          data.suggested_appointment_id = this.selectedAudition.id;
        }
        let res = await axios.post(`/t/instantfeedbacks/add`, data);
        this.$toasted.success(res.data.data);
        this.isLoading = false;
        this.getUserlist();
        this.getGroupdetails();
        this.$modal.hide("showApproveMdl");
        this.$modal.hide("showRejectMdl");
        this.$modal.hide("showApproveStandardMdl");
        this.comment = "";
        this.selectedAudition = null;
        this.options = [];
      } catch (ex) {
        this.isLoading = false;
        console.log(ex);
        this.$toasted.error(ex.response.data.data);
        this.$modal.hide("showApproveMdl");
        this.$modal.hide("showRejectMdl");
        this.$modal.hide("showApproveStandardMdl");
        this.comment = "";
        this.selectedAudition = null;
        this.options = [];
      }
    },
    async chargeUsers(value) {
      this.round = value;
      // this.finalCastPerformerList
      await this.fetchUserList(value.id);
      await this.fetchFinalCastList(this.$route.params.id);
      this.finalCastPerformerList = _.cloneDeep(
        this.$store.getters["audition/listFinalCasts"]
      );
      for (let data in this.finalCast) {
        let filtered_data = this.userList.filter(
          user => user.user_id == this.finalCast[data].user_id
        );
        for (let j in filtered_data) {
          this.finalCastPerformerList[data].image = filtered_data[j].image;
          this.finalCastPerformerList[data].name = filtered_data[j].name;
          this.finalCastPerformerList[data].time = filtered_data[j].time;
          // this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }
      if (
        this.finalCastPerformerList &&
        this.finalCastPerformerList.length > 0
      ) {
        this.finalCastFilter = this.finalCastPerformerList;
      }
    },
    async chargeFinalCast() {
      this.isLoading = true;
      await this.fetchFinalCastList(this.$route.params.id);
      this.finalCastPerformerList = _.cloneDeep(
        this.$store.getters["audition/listFinalCasts"]
      );

      await this.fetch(this.$route.params.id);
      let lastRound = this.rounds.slice(-1);
      if (lastRound && lastRound.length > 0) {
        await this.fetchUserList(lastRound[0].id);
        this.round = lastRound[0];
      }
      for (let data in this.finalCastPerformerList) {
        let filtered_data = _.cloneDeep(
          this.userList.filter(
            user => user.user_id == this.finalCastPerformerList[data].user_id
          )
        );

        for (let j in filtered_data) {
          this.finalCastPerformerList[data].image = filtered_data[j].image;
          this.finalCastPerformerList[data].name = filtered_data[j].name;
          this.finalCastPerformerList[data].time = filtered_data[j].time;
          this.finalCastPerformerList[data].time = filtered_data[j].time;
          this.finalCastPerformerList[data].birth = filtered_data[j].birth;
          this.finalCastPerformerList[data].email = filtered_data[j].email;
          // this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }

      this.mainRoles = _.cloneDeep(this.roles);

      await this.mainRoles.map(async role => {
        if (
          this.finalCastPerformerList &&
          this.finalCastPerformerList.length > 0
        ) {
          let filtered_data = await this.finalCastPerformerList.filter(
            user => user.rol_id === role.id
          );
          if (filtered_data && filtered_data.length > 0) {
            role.name = filtered_data[0].name;
            role.image = filtered_data[0].image;
            role.rol = filtered_data[0].rol_name;
            role.is_peformer = true;
            role.finalcast_id = filtered_data[0].id;
            role.user_id = filtered_data[0].user_id;
            role.time = filtered_data[0].time;
            role.birth = filtered_data[0].birth;
            role.email = filtered_data[0].email;
          } else {
            role.is_peformer = false;
            role.finalcast_id = null;
            role.user_id = null;
            role.image = role.image.url;
            role.time = "";
            role.birth = null;
            role.email = null;
          }
        } else {
          role.is_peformer = false;
          role.finalcast_id = null;
          role.user_id = null;
          role.image = role.image.url;
          role.time = "";
          role.birth = null;
          role.email = null;
        }
        return role;
      });

      await this.toggleFinalCastListUser();
      if (
        this.finalCastPerformerList &&
        this.finalCastPerformerList.length > 0
      ) {
        this.finalCastFilter = this.finalCastPerformerList;
      }
      // setTimeout(() =>{
      //   // $(".slot").droppable(dropOption);
      //   this.initDropdrag();
      // },100);
      this.isLoading = false;
    },
    async activeFinalCast(item) {
      this.isLoading = true;
      this.roles = item;
      await this.fetchFinalCastList(this.$route.params.id);
      this.finalCastPerformerList = _.cloneDeep(
        this.$store.getters["audition/listFinalCasts"]
      );

      await this.fetch(this.$route.params.id);
      let lastRound = this.rounds.slice(-1);
      if (lastRound && lastRound.length > 0) {
        await this.fetchUserList(lastRound[0].id);
        this.round = lastRound[0];
      }
      for (let data in this.finalCastPerformerList) {
        let filtered_data = _.cloneDeep(
          this.userList.filter(
            user => user.user_id == this.finalCastPerformerList[data].user_id
          )
        );

        for (let j in filtered_data) {
          this.finalCastPerformerList[data].image = filtered_data[j].image;
          this.finalCastPerformerList[data].name = filtered_data[j].name;
          this.finalCastPerformerList[data].time = filtered_data[j].time;
          // this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }

      this.mainRoles = _.cloneDeep(this.roles);

      await this.mainRoles.map(async role => {
        if (
          this.finalCastPerformerList &&
          this.finalCastPerformerList.length > 0
        ) {
          let filtered_data = await this.finalCastPerformerList.filter(
            user => user.rol_id === role.id
          );
          if (filtered_data && filtered_data.length > 0) {
            role.name = filtered_data[0].name;
            role.image = filtered_data[0].image;
            role.rol = filtered_data[0].rol_name;
            role.is_peformer = true;
            role.finalcast_id = filtered_data[0].id;
            role.user_id = filtered_data[0].user_id;
            role.time = filtered_data[0].time;
            role.birth = filtered_data[0].birth;
            role.email = filtered_data[0].email;
          } else {
            role.is_peformer = false;
            role.finalcast_id = null;
            role.user_id = null;
            role.image = role.image.url;
            role.time = "";
            role.birth = null;
            role.email = null;
          }
        } else {
          role.is_peformer = false;
          role.finalcast_id = null;
          role.user_id = null;
          role.image = role.image.url;
          role.time = "";
          role.birth = null;
          role.email = null;
        }
        return role;
      });

      await this.toggleFinalCastListUser();
      if (
        this.finalCastPerformerList &&
        this.finalCastPerformerList.length > 0
      ) {
        this.finalCastFilter = this.finalCastPerformerList;
      }
      this.finalCastState = true;

      setTimeout(() => {
        // $(".slot").droppable(dropOption);
        this.initDropdrag();
      }, 100);
      this.isLoading = false;
    },
    async exportRoleData() {
      this.isLoading = true;
      let json = [];
      await this.generateXlsJsonData().then(res => {
        json = res;
      });

      await ExcelService.exportAsExcelFile(json, "final_cast_list");
      this.isLoading = false;
    },
    async generateXlsJsonData() {
      this.isLoading = true;
      await this.fetchFinalCastList(this.$route.params.id);
      let finalCastPerformerList = _.cloneDeep(
        this.$store.getters["audition/listFinalCasts"]
      );

      await this.fetch(this.$route.params.id);
      let lastRound = this.rounds.slice(-1);
      if (lastRound && lastRound.length > 0) {
        await this.fetchUserList(lastRound[0].id);
        this.round = lastRound[0];
      }
      for (let data in finalCastPerformerList) {
        let filtered_data = _.cloneDeep(
          this.userList.filter(
            user => user.user_id == finalCastPerformerList[data].user_id
          )
        );

        for (let j in filtered_data) {
          finalCastPerformerList[data].image = filtered_data[j].image;
          finalCastPerformerList[data].name = filtered_data[j].name;
          finalCastPerformerList[data].time = filtered_data[j].time;
          finalCastPerformerList[data].time = filtered_data[j].time;
          finalCastPerformerList[data].birth = filtered_data[j].birth;
          finalCastPerformerList[data].email = filtered_data[j].email;
          finalCastPerformerList[data].website = filtered_data[j].website;
          finalCastPerformerList[data].union_string =
            filtered_data[j].union_string;
          finalCastPerformerList[data].representation_name =
            filtered_data[j].representation_name;
          finalCastPerformerList[data].representation_email =
            filtered_data[j].representation_email;

          // this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }

      let mainRoles = _.cloneDeep(this.roles);

      await mainRoles.map(async role => {
        if (finalCastPerformerList && finalCastPerformerList.length > 0) {
          let filtered_data = await finalCastPerformerList.filter(
            user => user.rol_id === role.id
          );
          if (filtered_data && filtered_data.length > 0) {
            role.name = filtered_data[0].name;
            role.image = filtered_data[0].image;
            role.rol = filtered_data[0].rol_name;
            role.is_peformer = true;
            role.finalcast_id = filtered_data[0].id;
            role.user_id = filtered_data[0].user_id;
            role.time = filtered_data[0].time;
            role.birth = filtered_data[0].birth;
            role.email = filtered_data[0].email;
            role.website = filtered_data[0].website;
            role.union_string = filtered_data[0].union_string;
            role.representation_name = filtered_data[0].representation_name;
            role.representation_email = filtered_data[0].representation_email;
          } else {
            role.is_peformer = false;
            role.finalcast_id = null;
            role.user_id = null;
            role.image = role.image.url;
            role.time = "";
            role.birth = null;
            role.email = null;
            role.website = null;
            role.union_string = null;
            role.representation_name = null;
            role.representation_email = null;
          }
        } else {
          role.is_peformer = false;
          role.finalcast_id = null;
          role.user_id = null;
          role.image = role.image.url;
          role.time = "";
          role.birth = null;
          role.email = null;
          role.website = null;
          role.union_string = null;
          role.representation_name = null;
          role.representation_email = null;
        }
        return role;
      });

      let exportData = [];
      _.each(mainRoles, member => {
        if (member.user_id) {
          let newExprtObj = {
            "Role Name": member.rol,
            "Performer Name": member.name,
            Email: member.email,
            "Date of Birth": member.birth,
            Website: member.website,
            "Union Status": member.union_string,
            "Representation Name": member.representation_name,
            "Representation Email": member.representation_email
          };
          exportData.push(newExprtObj);
        }
      });
      if (exportData.length == 0) {
        let newExprtObj = {
          "Role Name": "",
          "Performer Name": "",
          Email: "",
          "Date of Birth": "",
          Website: "",
          "Union Status": "",
          "Representation Name": "",
          "Representation Email": ""
        };
        exportData.push(newExprtObj);
      }
      return exportData;
    },
    async verifyRegisters(item) {
      if (item && item.added && item.added.element) {
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
          if (filtered_data && filtered_data.length > 0) {
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
    async toggleFinalCastListUser() {
      this.finalCastListUser = [];
      this.finalUserList = [];
      let finalCastUserIds =
        this.finalCast && this.finalCast.length > 0
          ? this.finalCast.map(cast => cast.user_id)
          : [];
      await _.each(this.userList, member => {
        if (finalCastUserIds.indexOf(member.user_id) == -1) {
          this.finalCastListUser.push(member);
        } else {
          this.finalCastListUser.push({ user_id: null });
        }
        return member;
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
      // window.console.log(evt);
    },
    //start: new action for drag drop handle
    async addPerformerToRole(user_id, role_id) {
      try {
        let requestParam = {
          audition_id: this.$route.params.id,
          performer_id: user_id,
          rol_id: role_id
        };
        const {
          data: { data }
        } = await axios.post("/t/finalcast", requestParam);
        return data;
      } catch (e) {
        this.$toasted.error("Something went to wrong!");
        this.destroyDragDrop();
        this.activeFinalCast(this.roles);
        console.log(e);
      }
    },
    async removePerformerFromRole(finalcast_id, user_id) {
      try {
        const {
          data: { data }
        } = await axios.delete(`/t/finalcast/${finalcast_id}`);
      } catch (e) {
        this.$toasted.error("Something went to wrong!");
        this.destroyDragDrop();
        this.activeFinalCast(this.roles);
        console.log(e);
      }
    },
    async swapPerformerRoleToRole(finalcast_id, user_id, role_id) {
      try {
        await axios.delete(`/t/finalcast/${finalcast_id}`);
        let requestParam = {
          audition_id: this.$route.params.id,
          performer_id: user_id,
          rol_id: role_id
        };
        const {
          data: { data }
        } = await axios.post("/t/finalcast", requestParam);
        return data;
      } catch (e) {
        this.$toasted.error("Something went to wrong!");
        this.destroyDragDrop();
        this.activeFinalCast(this.roles);
        console.log(e);
      }
    },
    changeCommentView(type) {
      if (type == "comment") {
        this.isCommentView = true;
      } else {
        this.isCommentView = false;
      }
    },
    async addCasterComment(user_data, index) {
      console.log("addCasterComment -> user_data", user_data)
      if (this.loading) {
        return;
      }
      this.$toasted.clear();
      if (!this.casterComment[index] || this.casterComment[index] == "") {
        this.$toasted.error("Please enter comment!");
      }

      this.loading = true;
      // call comment api with try case
      try {
        let requestParam = {
          appointment_id: this.round.id,
          user_id: user_data.user_id,
          comment:this.casterComment[index]
        };

        const {data: { data }} = await axios.post(`/t/feedbacks/addIndividualComment`, requestParam);
      this.loading = false;
        console.log("addCasterComment -> data", data)
        this.$toasted.success(data);        
      Vue.set(this.casterComment, index, "");
      } catch (ex) {
        this.loading = false;
        console.log(ex);
        this.$toasted.error(ex.response.data.message);
      }

      
      
    },
    //end: new action for drag drop handle
    onCancel() {
      console.log("User cancelled the loader.");
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

.gray-back {
  background-color: gray;
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
  color: #4d2545;
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
  border: 1px solid #4d2545;
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
  border-left: 2px solid #d6d6d6;
  border-bottom: 2px solid #d6d6d6;
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
/* .custom-perfom-list {
  position: relative !important;
} */
.custom-perfom-list .check-grp {
  opacity: 0;
  visibility: hidden;
}
.custom-perfom-list::after {
  position: absolute;
  content: "";
  left: 0;
  right: 7px;
  top: 7px;
  bottom: -47px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
}
.custom-perfom-list.after-clck-new-grp::after {
  opacity: 1;
  visibility: visible;
}
.check-grp.after-check-grp {
  opacity: 1;
  visibility: visible;
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
/* .list-group-item.sortable-chosen.sortable-ghost + .list-group-item.final-cast, .list-group-item.sortable-chosen.sortable-ghost + .list-group-item.final-cast.last-final-cast {
    display: none;
}
.final-role-list:nth-last-child(-n+1) {
  display: none!important;
} */
/* .list-group-item.sortable-chosen.sortable-ghost ? .list-group-item.flip-list-enter-to {
    display: none;
} */

.box {
  /* float: left; */
  /* width: 600px; */
  /* height: 500px; */
  text-align: center;
  margin-left: 20px;
  /* border: 5px solid #999; */
}
.slot {
  position: relative;
  width: 162px !important;
  height: 164px;
  margin-top: 0px !important;
  margin: 0 auto;
  padding: 0;
  border: 1px dotted;
}
.item {
  width: 10rem !important;
  /* height: 200px; */
  margin: 0 auto;
  z-index: 1;
  /* background-color: #CCC; */
}
.ui-selecting {
  background: #feca40;
}
.ui-selected {
  /* background-color: #F90; */
}
.green3 {
  background-color: #d9ffe2;
}
.main-role-slot {
  position: relative;
  margin-bottom: 35px;
}
.role-name {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -30px;
}
.container-overflow-hiden {
  width: 99% !important;
}
/* .scroll-auto{
    overflow-y: auto;
    overflow-x: hidden;
  } */
.w-370 {
  width: 423px !important;
}
.w-calc {
  width: calc(100% - 423px) !important;
}
.export-btn {
  width: 100% !important;
  position: fixed;
  bottom: 0;
  right: 0;
  max-width: 423px;
  background-color: #f0f0f0;
  z-index: 11111;
}
.main-role-slot:last-child {
  margin-bottom: 110px !important;
}
.comment-box-view{
   margin-right: 15px;     
   border: 1px solid #c0c0c0;
   box-shadow: 0 1px 6px 0 rgba(32,33,36,0.08);
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 6px;
    position: relative;
  }
  .comment-box-view:nth-child(2n){
    margin-right: 0;
  }
.comment-box-view .btn-card-wrap {
  display: flex;
  align-items: center;
}
.comment-box-view .btn-card-wrap .card-grid-view {
  width: 310px !important;
  margin-right: 0 !important;
}
.comment-box-view
  .btn-card-wrap
  .card-grid-view
  .flex.flex-col.h-full.shadow-md.overflow-hidden {
  display: flex !important;
  flex-direction: row !important;
}
.comment-box-view .btn-card-wrap .custom-btn-grp {
  position: absolute;
  left: 154px;
  top: 80px;
}
.comment-box-view .btn-card-wrap .card-grid-view .card-img .user-image {
  width: 152px !important;
}
.comment-box-view .btn-card-wrap .card-grid-view .card-img .star-performer{
  float: left;
  position: absolute;
  left: 23px;
  top: 26px;
  /* z-index: 1000; */
  font-weight: bold;
  width: 20px!important;
}
.view-btn-design .cus-btn {
  margin-bottom: 0 !important;
  width: 38px !important;
  height: 36px !important;
}
.view-btn-design .cus-btn a {
  background-color: #a7a7a7;
  padding: 4px;
  width: 38px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.view-btn-design .cus-btn a img {
  width: 25px;
  height: 25px;
}
.view-btn-design .cus-btn.background-selected a{
  background-color: #272727;
}
.view-btn-design .cus-btn.background-selected a img{
  filter: contrast(0) brightness(100); 
}

.comment-box-view .custom-perfom-list.after-clck-new-grp::after {
  opacity: 1;
  visibility: visible;
}

.comment-box-view .custom-perfom-list::after{
  position: absolute;
  content: "";
  left: 0;
  right: 0px;
  top: 0px;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: visible;
  border-radius: 4px;
  z-index: -1;
}

.router-link-exact-active.router-link-active.pointer-none .btn-card-wrap .custom-perfom-list img{
  z-index: -11;
}

.router-link-exact-active.router-link-active.pointer-none ~ .comment-box .comment-text{
    z-index: -11;
}
</style>
