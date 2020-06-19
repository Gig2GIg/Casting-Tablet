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
      await axios.put(`/t/notification-send-pushkey?pushkey=${device_token}&device_id=${userAgentId}&device_type=web`);
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

.v--modal-box.v--modal {
      overflow: auto !important;
}

.my-info-mdel .v--modal-box.v--modal {
    top: 110px !important;
    /* height: calc(100vh - 230px) !important; */
    min-height: 520px !important;
}
.my-info-content{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;  
  padding: 20px;
}
.month-picker .vue-monthly-picker .month-year-display.text-black.placeholder {
  color: #4D2545 !important;
}
.plan-list-carousel .VueCarousel-navigation-button { 
    color: #ffffff !important;
    position: static !important;
    outline: none !important;
    font-size: 22px !important;
}
.plan-list-carousel .VueCarousel-navigation{
  margin-top: 40px !important;
}
.plan-list-carousel .custom-plan-blank{
  min-height: 115px;
}
.plan-list-carousel .VueCarousel-navigation-prev {
    transform: rotate(180deg) translate(32px, 21px) !important;
    margin-right: 60px !important;
}
.plan-list-carousel .VueCarousel-navigation-next{
  position: relative !important;
  margin-left: 60px !important;
}
 .slide-info{font-size: 14px;
    position: absolute;
    left: -160px;
    top: 15px;
    white-space: nowrap;
    color: #ffffff !important;
    font-weight: bold;}

.plan-list-carousel .VueCarousel-navigation--disabled {
  opacity:1 !important;
  color:rgba(255,255,255,0.5) !important;
}
.plan-list-carousel .VueCarousel-navigation--disabled span{
  color:rgba(255,255,255,1);
}

.invite-block-hieght ::-webkit-input-placeholder {color: #D6D6D6 !important; opacity: 1; }
.invite-block-hieght ::-moz-placeholder {color: #D6D6D6 !important; opacity: 1; }
.invite-block-hieght :-ms-input-placeholder {color: #D6D6D6 !important; opacity: 1; }
.invite-block-hieght :-moz-placeholder {color: #D6D6D6 !important; opacity: 1; }

.plan-list-carousel .VueCarousel-inner {
  height: calc(100% - 1.25rem) !important;
}
</style>
