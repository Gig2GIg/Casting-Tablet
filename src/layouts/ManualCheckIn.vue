<template>
  <div class="flex flex-col min-h-full cover h-full">
    <div class="flex justify-between pr-4 items-center h-12 text-gray-200 font-light tracking-wider h-10 bg-purple">
      <span></span>
      <h3>Check In</h3>
      <a class="flex items-center cursor-pointer bg-purple mr-0 ml-5" @click="toggleCheckinExit()">
          <figure class="flex justify-center"><img src="/images/icons/settings_white.png" alt="Icon" class="h-4">
          </figure>
      </a>
    </div>   
    <div v-if="showCheckInExit" class="exit-checkin">
      <a class="flex items-center cursor-pointer bg-white bg-white-hover br-12 p-2" @click="openConfirmCheckOutmodal()">
          <figure class="flex justify-center"><img src="/images/icons/sign_out.png" alt="Icon" class="h-4">
          </figure>
          <span class="" style="color: black">Exit Manual Check-In</span>
      </a>
    </div> 
    <transition
      name="page"
      mode="out-in"
      @after-leave="$root.$emit('triggerScroll')"
    >
    
      <router-view class="flex flex-row flex-1 h-full" />
    </transition>
    <modal class="flex flex-col w-full items-center" :width="540" height="197" name="modal_confirm_check_out_mode">
        <div class="py-8 px-3">
            <h1 class="text-lg text-purple font-bold text-center">Close Manual Check In?</h1>
            <p class="text-lg text-purple text-center">Are you sure you want to close Manual Check In for audition?</p>
            <div class="w-full flex flex-wrap justify-center overflow-hidden mt-3">
                <div class="w-1/4">
                  <base-button type="submit" expanded @click="confirmCheckOutmode(false)">
                      No
                  </base-button>
                </div>
                <div class="w-1/4 ml-3">
                  <base-button type="submit" expanded @click="confirmCheckOutmode(true)">
                      Yes
                  </base-button>
                </div>

            </div>
        </div>
    </modal>
    <modal class="flex flex-col w-full items-center" :width="600" height="490" name="modal_passcode_check_out_mode">
        <div class="py-8 px-3">          
            <p class="text-lg text-purple font-bold text-center mb-2">Enter Passcode</p>
            <div class="flex w-full pass-code-input">
              <form class="w-full max-w-xs">
                <input class="text-black rounded-full overflow-hidden w-full h-full py-3 pl-6 pr-10 placeholder-purple focus:outline-none border border-purple" type="password" :value="manualCheckInPassCode" @input="onInputChange" placeholder="Passcode" autocomplete="off" />              
              </form>
            </div>
            <div class="flex w-full mt-3">
              <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="manualCheckInPassCode" :layout="layout" :theme="theme"/>              
            </div>
            <div class="w-full flex flex-wrap justify-center overflow-hidden mt-3">
                <div class="w-1/4">
                    <base-button type="button" expanded @click="cancelPassCodeCheckOut()">
                        Cancel
                    </base-button>
                    </div>
                    <div class="w-1/4 ml-3">
                    <base-button type="button" expanded @click="checkPassCodeCheckOut()">
                        Set
                    </base-button>
                </div>
            </div>
        </div>
    </modal>
  </div>
</template>

<script>

import SimpleKeyboard from "../components/shared/SimpleKeyboard";
import DEFINE from '../utils/const.js';

export default {
  components: {
    SimpleKeyboard
  },
  data() {
    return {
      showNavBar: true,
      showCheckInExit : false,
      manualCheckInPassCode: "",
      layout: {
        default: ["1 2 3", "4 5 6", "7 8 9", "0"],
        // default: ["1 2 3", "4 5 6", "7 8 9", "{shift} 0 _", "{bksp}"],
        shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp}"]
      },
      theme: "hg-theme-default hg-layout-numeric numeric-theme",
      options: {
        useKbEvents: false,
        preventClickEvent: false
      }
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.showNavBar = to.name !== 'login';
      },
    },
  },
  methods:{
    toggleCheckinExit(){
     this.showCheckInExit = !this.showCheckInExit;
    },
    openConfirmCheckOutmodal() {
      this.$modal.show("modal_confirm_check_out_mode");
    },
    confirmCheckOutmode(mode) {
      this.$modal.hide("modal_confirm_check_out_mode");
      if (mode) {
        this.$router.push({ name: 'auditions/detail', params: {id: this.$route.params.auditionId } });
        // this.$modal.show("modal_passcode_check_out_mode");
      }
    }, 
    onChange(input) {
      this.manualCheckInPassCode = input;
    },
    onKeyPress(button) {
      // console.log("button", button);
    },
    onInputChange(input) {
      this.manualCheckInPassCode = input.target.value;      
    },
    cancelPassCodeCheckOut(){
      this.$modal.hide("modal_passcode_check_out_mode");
    },
    checkPassCodeCheckOut(){
        this.$toasted.clear();
        if(!this.manualCheckInPassCode || this.manualCheckInPassCode == ''){
          this.$toasted.error("Please enter passcode.");
          return;
        }
        let setPasscode = localStorage.getItem(DEFINE.set_manual_pass_code_key);
        if(window.atob(setPasscode)== this.manualCheckInPassCode){
          localStorage.removeItem(DEFINE.set_pass_code_key);          
          this.$router.push({ name: 'auditions/detail', params: {id: this.$route.params.auditionId } });
        } else {
          this.$toasted.error("Please enter valid passcode.");
        }

    },
  }
};
</script>

<style>

.cover {
  background-image: url('/images/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
nav {
  background-image: linear-gradient(#4D2545, #782541);
}
/* .exit-checkin{
  width: 155px;
  height : 150px;
  right: 0;
} */
.exit-checkin {
    width: 191px !important;
    position: absolute !important;
    right: 2px !important;
    top: 49px !important;
    margin-left: 2px !important;
}
.br-12{
  border-radius: 12px !important;
}
.pass-code-input {
  margin-left: 8.5rem !important;
}
.bg-white-hover:hover {
    background-color: #ececec !important;
}
</style>
