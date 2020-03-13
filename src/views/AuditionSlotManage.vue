<template>
  <div class="flex text-purple h-full w-full container-overflow-hiden" id="container">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <div class="w-full w-calc" >      
      <div v-if="!finalUserList || finalUserList.length == 0" class="flex items-center flex-wrap ml-5 h-full">
        <h4 class="w-full text-center text-purple font-semibold text-2xl">There are no performances</h4>
      </div>
      <div class=" flex flex-wrap ml-5">
        <div class="col-6">
         
          <div id="performer_box"  class="box dragArea list-group flex flex-wrap mt-2">
            <span class="final-cast-list flex flex-wrap content-start items-center">
                <div
                        class="slot list-group-item mr-4 mb-3"
                        v-for="(data) in finalUserList"
                        :key="data.user_id"                      
                        v-bind:user_id="data.user_id"
                        v-bind:isPerformer="true"
                >

                      <div v-if="data.user_id" v-bind:id="'item_'+data.user_id" v-bind:user_id="data.user_id" class="item" >
                        <a class="performer-view" v-bind:performer="data.user_id" v-on:click="clickFinalPerformer($event,data)">  
                              <card-user
                                      :title="data.name"
                                      :isFinalCast="true"
                                      :image="data.image && !data.image.url ? data.image : ''"
                              />
                          </a>
                    </div>
                </div>
            </span>
            
          </div>
          
          
        </div>
      </div>      
    </div>
    <!-- <sidebar-detail :class="{'hidden': finalCastState}"  @selected="chargeUsers" @statusSet="changeView" @handleFinalCast="activeFinalCast" class="float-right w-1/2 ml-2"/> -->

    <section class="float-right w-1/2 ml-2 bg-sidebar flex flex-col items-center h-full w-370">
      <div class="flex content-center justify-center relative w-1/2 mt-2" @click="backToDetails">
        <img src="/images/icons/left_arrow.png" class="absolute left-0 " >
        <h1 class="text-purple text-lg font-bold">Manage</h1>
      </div>
      <div class="w-full border border-gray-300 mt-1 mb-6" />
      <div id="role_box" class="box list-group flex flex-wrap justify-center content-start w-full" :class="{'h-48':slots && slots.length==0}">        
        <div
            class="slot list-group-item final-cast main-role-slot"
            v-for="(data) in slots"
            :key="data.id"
            v-bind:isSlot="true"
            v-bind:slot_id="data.id"
          >
               <div v-if="data.user_id"  class="item" v-bind:user_id="data.user_id" v-bind:finalcast_id="data.finalcast_id" >                    
                      <card-user
                              :title="''"
                              :image="''"                              
                      />
              </div>
              <span class="role-name">{{data.time}}</span>
        </div>
        
      </div>
      
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import AuditionService from "@/services/AuditionService";

import axios from "axios";
import TokenService from "../services/core/TokenService";

import _ from "lodash";

import { eventBus } from "../main";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(Loading);

import ExcelService from '@/services/ExcelService';

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage : true,
      status: 0,
      roles: [],
      mainRoles: [],
      round: "",
      drag: false,
      finalCastState: false,
      finalCastFilter: [],
      checkedNames: [],
      openGroupMember: [],     
      finalUserList: [],
      slots : []
    };
  },
  destroyed:()=>{
    eventBus.$off();
  },
  watch: {
  },
  async created() {    
      await this.fetchAuditionData(this.$route.params.id);
      eventBus.$emit("auditionTitle", this.audition.title);    
      await this.fetchAppointmentNotWalk(this.$route.params.id);
      this.slots = this.appointmentNotWalk && this.appointmentNotWalk.slots ? this.appointmentNotWalk.slots : [];

      await this.getUserList();

      
  },
  computed: {
    ...mapState("audition", ["userList", 'audition', 'appointmentNotWalk']),
    ...mapState("appointment", [ "appointmentNotWalk"]),
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
  methods: {    
    ...mapActions("audition", [
      "fetchUserList",
      "fetchAuditionData",
      "fetchAppointmentNotWalk"
    ]),
    ...mapActions("appointment", ["fetchAppointmentNotWalk"]),
    async getUserList(){
      await this.fetchUserList(this.$route.params.id);      
      console.log("getUserList -> this.userList", this.userList)
      this.finalUserList = this.userList;
      setTimeout(() =>{
        this.initDropdrag();
      },100);
    },
    clickFinalPerformer(event,data){
      event.preventDefault();
    },
    backToDetails(){
      this.$router.push({ name: 'auditions/detail',params:{id: this.$route.params.id } });
      this.destroyDragDrop();
    },
    redirectOnDetails(user_id){
      this.$router.replace(
        this.$route.query.redirect || {
          name: 'talent/user_view',
          params: {id: user_id}
        },
      );
    },
    destroyDragDrop(){
      $(".ui-selected").draggable("destroy");
      this.mainRoles = [];
      this.finalCastListUser = [];
      // $('.item').remove();
    },
    initDropdrag(){
      let that = this;
        $(function () {
          
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
              start: function (event, ui) {
                  $(".ui-selected").each(function () {
                      $(this).data("original", $(this).position());
                  });
              },
              drag: function (event, ui) {
                  var offset = ui.position;
                  $(".ui-selected").not(this).each(function () {
                      var current = $(this).offset(),
                          targetLeft = document.elementFromPoint(current.left - 1, current.top),
                          targetRight = document.elementFromPoint(current.left + $(this).width() + 1, current.top);
                      $(this).css({
                          position: "relative",
                          left: offset.left,
                          top: offset.top
                      }).data("target", $.unique([targetLeft, targetRight]));
                      //console.log($.unique([targetLeft, targetRight]));
                  });
              },
              stop: function (event, ui) {
                  validate($(".ui-selected").not(ui.draggable));
              }
          }, dropOption = {
              accept: '.item',
              activeClass: "green3",
              greedy: true,
              drop: function (event, ui) {
                  // get atrribute value
                  var draggable_user_id = ui.draggable.attr("user_id");
                  
                  var draggable_parent_isPerformer = ui.draggable.parent().attr("isPerformer");
                  var draggable_parent_isSlot = ui.draggable.parent().attr("isSlot");

                  var droppable_isPerformer = $(this).attr("isPerformer");
                  var droppable_isSlot = $(this).attr("isSlot");
                  
                  //  case for handle perform movement
                  if(draggable_parent_isPerformer == 'true' && droppable_isPerformer == 'true'){ // if move performer from one place to another performer place then revert it
                    console.log("revert on same list drop!");
                    ui.draggable.animate(ui.draggable.data().original,"slow");
                    return;
                  } else if (draggable_parent_isPerformer == 'true' && droppable_isSlot == 'true' && $(this).find('div.item').length === 0){ // From performer list , add performer to particular role
                    console.log("else if 1");
                    var draggable_user_id = ui.draggable.attr("user_id");        
                    var droppable_slot_id = $(this).attr("slot_id");
                    if(draggable_user_id == undefined || draggable_user_id == null || droppable_slot_id == undefined || droppable_slot_id == null){ // if not found required data then revert back draggable performer to thier back position
                      ui.draggable.animate(ui.draggable.data().original,"slow");
                      return;
                    }
                    let parentDiv = ui.draggable.parent();
                    that.checkIn(draggable_user_id, droppable_slot_id).then((result) => {
                      parentDiv.remove();
                        // $(this).attr('finalcast_id',result.id);
                        // ui.draggable.attr('finalcast_id',result.id);
                    }). 
                    catch((err) => { 
                        console.log("TCL: initDropdrag -> err", err);
                    });
                    
                  } else if(draggable_parent_isSlot == 'true' && droppable_isPerformer == 'true' && $(this).find('div.item').length === 0){ // remove performer from role list
                    console.log("else if 2");
                    var draggable_parent_finalcast_id = ui.draggable.attr("finalcast_id");
                    var draggable_user_id = ui.draggable.attr("user_id");     
                    if(draggable_parent_finalcast_id == undefined || draggable_parent_finalcast_id == null || draggable_user_id == undefined || draggable_user_id == null){ // if not required then revert back draggable performer to thier back position
                      ui.draggable.animate(ui.draggable.data().original,"slow");
                      return;
                    }        
                    
                    
                    that.removePerformerFromRole(draggable_parent_finalcast_id, draggable_user_id);
                    ui.draggable.parent().removeAttr("finalcast_id");
                    ui.draggable.removeAttr("finalcast_id");

                    
                    
                  } else if(draggable_parent_isSlot == 'true' && droppable_isSlot == 'true' && $(this).find('div.item').length === 0) { // move performer from one role to another role
                    console.log("else if 2");
                    var draggable_parent_finalcast_id = ui.draggable.attr("finalcast_id");
                    var draggable_user_id = ui.draggable.attr("user_id");     
                    var droppable_slot_id = $(this).attr("slot_id");   
                    if(draggable_parent_finalcast_id == undefined || draggable_parent_finalcast_id == null || draggable_user_id == undefined || draggable_user_id == null || droppable_slot_id == undefined || droppable_slot_id == null){ // if not foudn any required then revert back draggable performer to thier last position
                      ui.draggable.animate(ui.draggable.data().original,"slow");
                      return;
                    }                  
                    ui.draggable.parent().removeAttr("finalcast_id");
                    ui.draggable.removeAttr("finalcast_id");
                    that.swapPerformerRoleToRole(draggable_parent_finalcast_id, draggable_user_id, droppable_slot_id).then((result) => {
                        $(this).attr('finalcast_id',result.id);
                        ui.draggable.attr('finalcast_id',result.id);
                    }). 
                    catch((err) => { 
                        console.log("TCL: initDropdrag -> err", err);
                    });
                  } else {

                    console.log("movement action not found!");                    
                    ui.draggable.animate(ui.draggable.data().original,"slow");
                    return;
                  }


                  if ($(this).is(".slot") && !$(this).has(".item").length) {
                      console.log("appending")
                      $(this).append(ui.draggable.css({
                          top: 0,
                          left: 0
                      }));
                  } else {                      
                      console.log("reverting")
                      ui.draggable.animate({
                          top: 0,
                          left: 0
                      }, "slow");
                      // event.preventDefault();
                  }
                  validate($(".ui-selected").not(ui.draggable));
              }
          }

          $(".box").selectable({
              filter: ".item",
              start: function (event, ui) {
                  $(".ui-selected").draggable("destroy");
              },
              stop: function (event, ui) {
                  $(".ui-selected").draggable(dragOption)
              },
              selected: function(event, ui) { 
                var numItems = $('.ui-selected').length;
                if(numItems > 1){
                  $('.ui-selected').removeClass('ui-selected');
                }
              }  
          });
          $(".slot").droppable(dropOption);
          $(".item").draggable(dragOption)

          function validate($draggables) {

              $draggables.each(function () {
                  var $target = $($(this).data("target")).filter(function (i, elm) {
                      return $(this).is(".slot") && !$(this).has(".item").length;
                  });
                  if ($target.length) {
                      $target.append($(this).css({
                          top: 0,
                          left: 0
                      }))
                  } else {
                      $(this).animate({
                          top: 0,
                          left: 0
                      }, "slow");
                  }

              });
              $(".ui-selected").data("original", null)
                  .data("target", null)
                  .removeClass("ui-selected");
          }
        });
      // End : drag and drop box jquery code

    },
    async checkIn(slot_id,performer_id){
      try {
            let requestParam = {
              slot_id : slot_id,
              performer_id : performer_id,
              is_checkin :true
            };            
            // const { data: { data } } = await axios.post('/t/finalcast', requestParam);
            return true;
        } catch (e) {
          this.$toasted.error("Something went to wrong!");
          this.destroyDragDrop();
          this.activeFinalCast(this.roles);
          console.log(e);
        }
    },
    manageSelectedPerformer() {
      this.finalUserList = [];
      _.each(this.openGroupMember, member => {
        let entry = _.find(this.userList, user => {
          return user.user_id == member.user_id;
        });
        if (entry) this.finalUserList.push(entry);
      });
      this.finalUserList = _.orderBy(this.finalUserList, 'time', 'asc'); 
    },
    manageAuditionVideoPerformer(videos) {
      let userIds = videos && videos.length > 0 ? _.compact(_.uniq(videos.map(video=>video.performer.user_id ? video.performer.user_id : null))) : [];
      this.finalUserList = [];
      _.each(userIds, user_id => {
        let entry = _.find(this.userList, user => {
          return user.user_id == user_id;
        });
        if (entry) this.finalUserList.push(entry);
      });
      this.finalUserList = _.orderBy(this.finalUserList, 'time', 'asc'); 
    },
     
    async chargeUsers(value) {
      this.round = value;
      // this.finalCastPerformerList
      await this.fetchUserList(value.id);
      await this.fetchFinalCastList(this.$route.params.id);
      this.finalCastPerformerList = _.cloneDeep(this.$store.getters[
        "audition/listFinalCasts"
      ]);
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
      if (this.finalCastPerformerList && this.finalCastPerformerList.length > 0) {
        this.finalCastFilter = this.finalCastPerformerList;
      }
    }, 
    async chargeFinalCast() {
      this.isLoading = true;
      await this.fetchFinalCastList(this.$route.params.id);
      this.finalCastPerformerList = _.cloneDeep(this.$store.getters[
        "audition/listFinalCasts"
      ]);

      await this.fetch(this.$route.params.id);
      let lastRound = this.rounds.slice(-1);
      if (lastRound && lastRound.length > 0) {
        await this.fetchUserList(lastRound[0].id);
        this.round = lastRound[0];
      }
      for (let data in this.finalCastPerformerList) {
        let filtered_data = _.cloneDeep(this.userList.filter(        
          user => user.user_id == this.finalCastPerformerList[data].user_id
        ));
        
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
        if (this.finalCastPerformerList && this.finalCastPerformerList.length > 0) {
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
            role.time = '';
            role.birth = null;
            role.email = null;

          }          
        } else {
          role.is_peformer = false;
          role.finalcast_id = null;
          role.user_id = null;
          role.image = role.image.url;
          role.time = '';
          role.birth = null;
          role.email = null;
        }
        return role;
      });
        
      await this.toggleFinalCastListUser();
      if (this.finalCastPerformerList && this.finalCastPerformerList.length > 0) {
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
      this.finalCastPerformerList = _.cloneDeep(this.$store.getters[      
        "audition/listFinalCasts"
      ]);

      await this.fetch(this.$route.params.id);
      let lastRound = this.rounds.slice(-1);
      if (lastRound && lastRound.length > 0) {
        await this.fetchUserList(lastRound[0].id);
        this.round = lastRound[0];
      }
      for (let data in this.finalCastPerformerList) {
        let filtered_data = _.cloneDeep(this.userList.filter(        
          user => user.user_id == this.finalCastPerformerList[data].user_id
        ));
        
        for (let j in filtered_data) {
          this.finalCastPerformerList[data].image = filtered_data[j].image;          
          this.finalCastPerformerList[data].name = filtered_data[j].name;
          this.finalCastPerformerList[data].time = filtered_data[j].time;
          // this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }
      
      this.mainRoles = _.cloneDeep(this.roles);
            
      await this.mainRoles.map(async role => {
        if (this.finalCastPerformerList && this.finalCastPerformerList.length > 0) {
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
            role.time = '';
            role.birth = null;
            role.email = null;

          }          
        } else {
          role.is_peformer = false;
          role.finalcast_id = null;
          role.user_id = null;
          role.image = role.image.url;
          role.time = '';
          role.birth = null;
          role.email = null;
        }
        return role;
      });

      await this.toggleFinalCastListUser();
      if (this.finalCastPerformerList && this.finalCastPerformerList.length > 0) {
        this.finalCastFilter = this.finalCastPerformerList;
      }
      this.finalCastState = true;
      
      setTimeout(() =>{
        // $(".slot").droppable(dropOption);
        this.initDropdrag();
      },100);
      this.isLoading = false;
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
    async toggleFinalCastListUser(){
      this.finalCastListUser = [];
      this.finalUserList = [];
      let finalCastUserIds = this.finalCast && this.finalCast.length > 0 ? this.finalCast.map(cast=>cast.user_id) : [];
      await _.each(this.userList, member => {    
          if(finalCastUserIds.indexOf(member.user_id) == -1){
            this.finalCastListUser.push(member);
          } else {
            this.finalCastListUser.push({user_id : null});          
          }
          return member;
        });
    },
    async changeView(status) {
      this.status = status;
    },
    cloneDog({ id }) {;
      // return {
      //   id: idGlobal++,
      //   name: `cat ${id}`
      // };
    },
    log: function(evt) {
      // window.console.log(evt);
    },    
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
    background: #FECA40;
  }
  .ui-selected {
    /* background-color: #F90; */
  }
  .green3 {
    background-color: #D9FFE2;
  }
  .main-role-slot{
    position: relative;
    margin-bottom: 35px;
  }
  .role-name{
    position: absolute;
    left: 0;
    right: 0;
    bottom: -30px;
  }
  .container-overflow-hiden{
    width: 99% !important;  
  }
  /* .scroll-auto{
    overflow-y: auto;
    overflow-x: hidden;
  } */
  .w-370{
    width: 423px !important;
  }
  .w-calc{
    width: calc(100% - 423px) !important;
  }
  .export-btn{
    width: 100% !important;
    position: fixed;
    bottom: 0;
    right: 0;
    max-width: 423px; 
    background-color: #F0F0F0;
    z-index: 11111;
  }
  .main-role-slot:last-child{
    margin-bottom: 110px !important;
  }
</style>
