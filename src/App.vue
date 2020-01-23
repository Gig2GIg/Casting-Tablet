<template>
  <component
    :is="layout"
    class="layout"
    :class="layout"
  />
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/messaging';
import axios from "axios";

import Vue from 'vue';

import TokenService from './services/core/TokenService';
import DEFINE from './utils/const';

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDTrKkhJCM4ZNbFXRTq0AE2uKzNlpo3_i4',
  authDomain: 'dd-gig2gig.firebaseapp.com',
  databaseURL: 'https://dd-gig2gig.firebaseio.com',
  projectId: 'dd-gig2gig',
  storageBucket: 'dd-gig2gig.appspot.com',
  messagingSenderId: '593196123450',
  appId: '1:593196123450:web:796a695a5e872524fc3c03',
});

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
  //listen for firebase notifications when window is active
  messaging.onMessage(payload => {    
    Vue.toasted.info(payload.notification.body);
  });
}

export default {
  computed: {
    defaultLayout() {
      return 'dashboard';
    },
    layout() {
      return `${this.$route.meta.layout || this.defaultLayout}-layout`;
    },
  },
  async created() {      
      if (firebase.messaging.isSupported() && TokenService.getUserId()) {
        try {
          await this.askForPermissionToReceiveNotifications();
        } catch (e) { 
          if(e.code && e.code == DEFINE.firebase_permission_error.code){
            this.updateDeviceToken("");
          } else if(e.name && e.name == DEFINE.firebase_permission_error.name){
            this.updateDeviceToken("");
          }
        }
      }
    },
  methods: {
    async askForPermissionToReceiveNotifications() {
      const messaging = firebase.messaging();

      // Request permission
      await messaging.requestPermission();

      // Update token
      const token = await messaging.getToken();      
      await this.updateDeviceToken(token);

      // Listen token changes
      messaging.onTokenRefresh(async () => {
        const token = await messaging.getToken();
        await this.updateDeviceToken(token);
      });
    },
    async updateDeviceToken(device_token) {
      let userAgentId = window.navigator.userAgent.replace(/\D+/g, '');      
      await axios.put(`/t/notification-send-pushkey?pushkey=${device_token}&device_id=${userAgentId}`);
    },
  }
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.bg-purple-gradient {
  background-image: linear-gradient(#4D2545, #782541);
}

.bg-purple-gradient:hover {
  background-image: linear-gradient(#331d2f, #5e1d33);
}

body, html {
  height: 100%;
}
.cus-des-timepicker .time-picker-preview {
    border-radius: 50px !important;
    border: 1px solid #4d2545 !important;
    box-shadow: none !important;
}
.cus-des-timepicker .time-picker-preview .preview-container{
    font-size: 100%;
    color: #4d2545;
}
.cus-des-timepicker .time-picker-preview.active{
      background-image: linear-gradient(#4D2545, #782541);
      color: #ffffff;
}
.cus-des-timepicker .time-picker-preview.active .preview-container{
  color: #ffffff;
}
.cus-des-timepicker .time-picker-modal-container{
  width: 300px;
}
.cus-des-timepicker .time-picker-modal-header .time-picker-header.active, .cus-des-timepicker .time-picker-modal-header .time-picker-header:hover{
  color: #4d2545;
}
.cus-des-timepicker .picker-point.current{
  background-image: linear-gradient(#4D2545, #782541);
}
.cus-des-timepicker .time-picker-interval.active, .cus-des-timepicker .time-picker-interval:hover{
  color: #4d2545;
  font-weight: bold;
}
.cus-des-timepicker .interval-container{
  text-align: center;
}
.h-57{height: 57px;}
.VueCarousel-navigation-prev {transform: rotate(180deg) translate(32px, 20px) !important;}
.VueCarousel-navigation-button{color: #592543!important;}
.outside-click-container{display: none;}
.time-picker-preview.active ~ .outside-click-container {
    display: block;
}
.text-transform-capitalize{
  text-transform: capitalize
}


</style>
