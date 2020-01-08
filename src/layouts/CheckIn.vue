<template>
  <div class="flex flex-col min-h-full cover h-full">
    <div
      class="flex justify-center items-center h-12 text-gray-200 font-light tracking-wider h-10 bg-purple"
    >
      Check In
      <a class="flex items-center cursor-pointer bg-purple mr-0 ml-5" @click="toggleCheckinExit()">
          <figure class="flex justify-center"><img src="/images/icons/settings_white.png" alt="Icon" class="h-4">
          </figure>
      </a>
    </div>   
    <div v-if="showCheckInExit" class="exit-checkin">
      <a class="flex items-center cursor-pointer mr-0 ml-5 mr-1 bg-white" @click="openConfirmCheckOutmodal()">
          <figure class="flex justify-center"><img src="/images/icons/sign_out.png" alt="Icon" class="h-4">
          </figure>
          <span class="ml-1">Exit Check-In</span>
      </a>
    </div> 
    <transition
      name="page"
      mode="out-in"
      @after-leave="$root.$emit('triggerScroll')"
    >
    
      <router-view class="flex flex-row flex-1 h-full" />
    </transition>
    <modal class="flex flex-col w-full items-center mt-4" :width="540" height="175" name="modal_confirm_check_out_mode">
        <div class="py-8 px-3">
            <p class="text-lg text-purple font-bold text-center">Are you sure you want to close Check In for audition?</p>
            <div class="w-full flex flex-wrap justify-center overflow-hidden mt-3">
                <div class="w-1/4">
                    <base-button type="submit" expanded @click="confirmCheckOutmode(true)">
                        Yes
                    </base-button>
                    </div>
                    <div class="w-1/4 ml-3">
                    <base-button type="submit" expanded @click="confirmCheckOutmode(false)">
                        No
                    </base-button>
                </div>

            </div>
        </div>
    </modal>
    <modal class="flex flex-col w-full items-center mt-4" :width="600" height="490" name="modal_passcode_check_out_mode">
        <div class="py-8 px-3">          
            <p class="text-lg text-purple font-bold text-center">Enter Passcode</p>
            <div class="flex w-full pass-code-input">
              <form class="w-full max-w-xs">
                <input class="px-2 py-2 w-3/4 border border-purple mt-0" type="password" :value="checkInPassCode"   @input="onInputChange" placeholder="Passcode" autocomplete="off"    />              
              </form>
            </div>
            <div class="flex w-full mt-3">
              <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="checkInPassCode" :layout="layout" :theme="theme"/>              
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
      checkInPassCode: "",
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
        this.$modal.show("modal_passcode_check_out_mode");
      }
    }, 
    onChange(input) {
      this.checkInPassCode = input;
    },
    onKeyPress(button) {
      // console.log("button", button);
    },
    onInputChange(input) {
      this.checkInPassCode = input.target.value;      
    },
    cancelPassCodeCheckOut(){
      this.$modal.hide("modal_passcode_check_out_mode");
    },
    checkPassCodeCheckOut(){
        this.$toasted.clear();
        if(!this.checkInPassCode || this.checkInPassCode == ''){
          this.$toasted.error("Please enter passcode.");
          return;
        }
        let setPasscode = localStorage.getItem(DEFINE.set_pass_code_key);
        if(window.atob(setPasscode)== this.checkInPassCode){
          console.log('valid passcode')
          this.$router.push({ name: 'auditions/detail', params: {id: this.$route.params.auditionId } });
        } else {
          this.$toasted.error("Please enter valid passcode.");
        }

    },
  }
};
</script>

<style scoped>
.cover {
  background-image: url('/images/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
nav {
  background-image: linear-gradient(#4D2545, #782541);
}
.exit-checkin{
  width: 155px;
  height : 150px;
  right: 0;
}
</style>
