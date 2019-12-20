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
      <div v-if="status == 1 || finalCastState == true || round.length >0" class=" flex flex-wrap ml-5">
        <div class="col-6">
          <draggable
            class="dragArea list-group flex flex-wrap"
            :list="userList"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @change="log"
            :move="checkMove"
          >
            <transition-group  class="flex flex-wrap justify-center content-center" type="transition" :name="!drag ? 'flip-list' : null">
              <div
                class="list-group-item"
                v-for="(data, index) in userList"
                :key="data.user_id"
              >
                  <router-link :to="{ name: 'auditions/user', params: {id: data.user_id, round: round.id, audition:$route.params.id} }">
                  <card-user
                    :title="data.name"
                    :time="data.time"
                    :image="data.image"
                  />
                  </router-link>
                <div>
                  <input
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
import { mapActions, mapState, mapGetters } from 'vuex';
import AuditionService from '@/services/AuditionService';
import draggable from 'vuedraggable'
import BaseButton from "../components/BaseButton";
let idGlobal = 8;

export default {
  components: {
    BaseButton,
      draggable,
  },
  data() {
    return {
      isLoading: true,
      status: 0,
      roles:[],
      mainRoles:[],
      round: '',
      drag: false,
      finalCastState: false,
      finalCastFilter:[],
      checkedNames:[],
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
      ]
    };
  },
  computed: {
    ...mapState('audition', ['userList', 'finalCast']),
    ...mapState('round', ['rounds']),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    }
  },
  async mounted() {

  },
  methods: {
    ...mapActions('audition', ['fetchUserList', 'fetchFinalCastList', 'removePerformer', 'addPerformer']),
    ...mapActions('round', ['fetch']),
    async chargeUsers(value){
      this.round = value;
      await this.fetchUserList(value.id);
      await this.fetchFinalCastList(this.$route.params.id)
      for(let data in this.finalCast){
        let filtered_data = this.userList.filter(user => user.user_id == this.finalCast[data].user_id );
        for(let j in filtered_data){
          this.finalCast[data].image = filtered_data[j].image;
          this.finalCast[data].name = filtered_data[j].name;
          this.finalCast[data].time = filtered_data[j].time;
          this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }
      if(this.finalCast.length > 0){
        this.finalCastFilter = this.finalCast;
      }
    },
    async chargeFinalCast(){
      await this.fetchFinalCastList(this.$route.params.id)
      for(let data in this.finalCast){
        let filtered_data = this.userList.filter(user => user.user_id == this.finalCast[data].user_id );
        for(let j in filtered_data){
          this.finalCast[data].image = filtered_data[j].image;
          this.finalCast[data].name = filtered_data[j].name;
          this.finalCast[data].time = filtered_data[j].time;
          this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }
      this.mainRoles = this.roles;
      this.mainRoles.map((role)=>{
        this.finalCast.map((user) =>{
          if(user.rol_id == role.id){
            role.name = user.name;
            role.image.url = user.image;
            role.rol = user.rol_name;
          }
        });
      });
      if(this.finalCast.length > 0){
        this.finalCastFilter = this.finalCast;
      }
    },
    async verifyRegisters(item){
      item.added.element.rol_id = item.added.element.rol;
      let data = {
        "audition_id":this.$route.params.id,
        "performer_id":item.added.element.user_id,
        "rol_id":item.added.element.rol_id,
      }
      await this.addPerformer(data);
      try{
        let filtered_data = this.finalCastFilter.filter(user => user.rol_id == item.added.element.rol && user.user_id!=item.added.element.user_id);
        if(filtered_data.length > 0){
          this.finalCastFilter = this.finalCastFilter.filter(user => user.user_id != filtered_data[0].user_id);
          await this.removePerformer(filtered_data[0].id);
        }
        await this.chargeFinalCast();

      }catch(e){
        console.log(e);
      }
    },
    async activeFinalCast(item){
      this.roles = item;
      await this.fetch(this.$route.params.id);
      let lastRound = this.rounds.slice(-1);
      if(lastRound.length>0){
        await this.fetchUserList(lastRound[0].id);
        this.round = lastRound[0];
      }
      for(let data in this.finalCast){
        let filtered_data = this.userList.filter(user => user.user_id == this.finalCast[data].user_id );
        for(let j in filtered_data){
          this.finalCast[data].image = filtered_data[j].image;
          this.finalCast[data].name = filtered_data[j].name;
          this.finalCast[data].time = filtered_data[j].time;
          this.finalCast[data].rol_id = filtered_data[j].rol;
        }
      }
      this.mainRoles = this.roles;
      this.mainRoles.map((role)=>{
        if(this.finalCast.length > 0){
          this.finalCast.map((user) =>{
            if(user.rol_id == role.id){
              role.name = user.name;
              role.image.url = user.image;
              role.rol = user.rol_name;
            }
          });
        }
      });
      if(this.finalCast.length > 0){
        this.finalCastFilter = this.finalCast;
      }
      this.finalCastState = true
    },
    checkMove: function(evt){
      evt.draggedContext.element.name!=='apple';
    },
    async changeView(status){
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
  },
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
</style>
