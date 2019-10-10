<template>
<div>
  <div class="flex flex-col flex-1 justify-center items-center text-white py-16 h-full">
  
    <p v-if="init" class="text-xl tracking-wider font-bold">
      Audition Name | Audition Start Time
    </p>

    <p v-if="scan" class="text-xl tracking-wider font-bold">
      Scan Your QR code to Sign In
    </p>
    
    <!-- <p v-if="scan" class="text-xl tracking-wider font-bold">
      You've Checked-In Successfully!
    </p> -->
    <div
      v-if="init"
      class="flex w-full max-w-xl mt-16"
    >
      <base-button
        @click.native="useScanner"
        type="submit"
        text="text-purple"
        color="bg-white"
        class="m-5 bg-white"
        expanded
      >
      I Have an Appoinment
      </base-button>

      <base-button
        text="text-white"
        color="bg-purple"
        type="submit"
        class="m-5"
        expanded
      >
        I'm a Walk In
      </base-button>
    </div>
    <p  v-if="scan" class="decode-result" @click="changeScanner">Change method <b>{{ result }}</b></p>

    <div
      v-if="scan"
      class="flex w-full max-w-xl mt-16"
    >

    <p v-if="error !== null" class="drop-error">{{ error }}</p>
      <qrcode-stream v-if="cam" @decode="onDecode" @init="onInit" />
      <qrcode-drop-zone class="w-full" v-if="image" @detect="onDetect" @dragover="onDragOver" @init="logErrors">
      <div class="drop-area" :class="{ 'dragover': dragover }">
        DROP SOME IMAGES HERE 
      </div>
    </qrcode-drop-zone>
    </div>
    <!-- <div
      v-if="scan"
      class="flex justify-center w-full max-w-xl mt-16 bg-white"
    >

    <p v-if="error !== null" class="drop-error">{{ error }}</p>
      <div class="bg-white">
        <p>Data</p>
      </div>
    </div> -->
  </div>
  <section v-if="scan" class=" bg-gray-100 flex flex-col items-center h-full w-1/5 overflow-scroll">
    <div class="flex w-full mt-10 ">
      <div class="w-full text-center font-bold text-purple text-xl">
        Audition <br> Appointments
      </div>
    </div>
    <div v-for="data in appointments" :key="data.id" class="w-full">
      <div class="flex w-full -mb-5">
        <div class="w-1/2 text-center m-8 float-left">
          <h4 class="text-left text-sm  text-purple">{{data.name}}</h4>
        </div>
        <div class="w-1/2 text-center m-8 float-right">
          <h4 class="text-right text-sm font-bold text-purple">{{data.time}}</h4>
        </div>
      </div>
      <div class="w-full border border-gray-300"></div>
    </div>
</section>

</div>

</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      email: '',
      password: '',
      init:true,
      scan:false,
      isLoading: false,
      result: null,
      error: null,
      dragover: false,
      cam: true,
      image:false
    };
  },
  computed:{
    ...mapState("appointment", ["appointments"])
  },
  mounted(){},
  methods: {
    ...mapActions("appointment", ["fetch"]),
    useScanner(){
        this.init = false;
        this.scan = true;
        this.fetch(this.$route.params.id);
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },
    onDecode (result) {
      this.result = result
    },
    changeScanner(){
      if(this.cam){
        this.cam = false;
        this.image = true;
      }
      else{
        this.cam = true;
        this.image = false;
      }
    },
    async onDetect (promise) {
      try {
        const { content } = await promise

        this.result = content
        this.error = null
      } catch (error) {
        if (error.name === 'DropImageFetchError') {
          this.error = 'Sorry, you can\'t load cross-origin images :/'
        } else if (error.name === 'DropImageDecodeError') {
          this.error = 'Ok, that\'s not an image. That can\'t be decoded.'
        } else {
          this.error = 'Ups, what kind of error is this?! ' + error.message
        }
      }
    },

    logErrors (promise) {
      promise.catch(console.error)
    },

    onDragOver (isDraggingOver) {
      this.dragover = isDraggingOver
    }
  },
};
</script>
<style scoped>
body, html {
    height: 100%;
}
.drop-area {
  height: 300px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  padding: 10px;

  background-color: rgba(0,0,0,.5);
}

.dragover {
  background-color: rgba(0,0,0,.8);
}

.drop-error {
  color: red;
  font-weight: bold;
}
</style>