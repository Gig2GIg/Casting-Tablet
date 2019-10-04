<template>
<div>
  <div class="flex flex-col flex-1 justify-center items-center text-white py-16 h-full">
  
    <p v-if="init" class="text-xl tracking-wider font-bold">
      Audition Name | Audition Start Time
    </p>

    <p v-if="scan" class="text-xl tracking-wider font-bold">
      Scan Your QR code to Sign In
    </p>

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

    <div
      v-if="scan"
      class="flex w-full max-w-xl mt-16"
    >
      <qrcode-stream @decode="onDecode" @init="onInit" />
    </div>
  </div>
  <section v-if="scan" class=" bg-gray-100 flex flex-col items-center h-full w-1/5 overflow-scroll">
    <div class="flex w-full mt-10 ">
      <div class="w-full text-center font-bold text-purple text-xl">
        Audition <br> Appointments
      </div>
    </div>
    <div v-for="index in 10" :key="index" class="container flex w-full -mb-5">
      <div class="w-1/2 text-center m-8 float-left">
        <h4 class="text-left text-sm font-semibold text-indigo-300">Name</h4>
      </div>
      <div class="w-1/2 text-center m-8 float-right">
        <h4 class="text-right text-sm font-bold text-purple">Time</h4>
      </div>
      <div class="w-full border border-gray-300"></div>
    </div>
</section>

</div>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      init:true,
      scan:false,
      isLoading: false,
    };
  },
  mounted(){
    console.log("XD");
  },
  methods: {
    useScanner(){
        this.init = false;
        this.scan = true;
        console.log("XD");
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
  },
};
</script>
<style scoped>
body, html {
    height: 100%;
}
</style>