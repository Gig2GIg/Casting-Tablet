<template>
  <div>
     <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <img src="/images/logo.png" class="max-w-xs" alt="Logo">
  
    <form class="w-full max-w-xs mt-8" @submit.prevent="handleLogin">
      <base-input v-model="email" v-validate="'required|email'" name="user" placeholder="User" :message="errors.first('user')" />
  
      <base-input v-model="password" v-validate="'required'" name="password" type="password" placeholder="Password" :message="errors.first('password')" />
  
      <base-button type="submit" expanded>
        Log In
      </base-button>
    </form>
  
    <router-link :to="{ name: 'password.email' }" class="mt-2 text-sm">
      Forgot Password?
    </router-link>
  
    <router-link :to="{ name: 'register' }" class="mt-16">
      <!-- Create Account -->
      <span class="text-2lg"> Getting started Now!</span>
    </router-link>
  </div>
</template>

<script>
  import Vue from "vue";
  import {
    mapActions
  } from 'vuex';
  import DEFINE from '../../utils/const.js';
  import firebase from 'firebase/app';
  import 'firebase/messaging';
  import axios from "axios";
  // Import component
  import Loading from "vue-loading-overlay";
  // Import stylesheet
  import "vue-loading-overlay/dist/vue-loading.css";

  Vue.use(Loading);
    
  export default {
    components: {
      Loading,
    },
    data() {
      return {
        email: '',
        password: '',
        isLoading: false,
        fullPage: true,
      };
    },
    methods: {
      ...mapActions('auth', ['login']),
  
      async handleLogin() {
        try {
          if (this.isLoading) {
            return;
          }
  
          this.isLoading = true;
  
          await this.login({
            email: this.email,
            password: this.password,
            type: DEFINE.caster_type,
          });
  
          if (firebase.messaging.isSupported()) {
            await this.askForPermissionToReceiveNotifications();
          }
  
          // Redirect the user to the page he first tried to visit or to the home view
          this.onLoginSuccessRedirect();
        } catch (e) {
          console.log("TCL: handleLogin -> e.FirebaseError",e);
          if(e.code && e.code == DEFINE.firebase_permission_error.code){
            this.updateDeviceToken("");
            this.onLoginSuccessRedirect();
          } else if(e.name && e.name == DEFINE.firebase_permission_error.name){
            this.updateDeviceToken("");
            this.onLoginSuccessRedirect();
          } else if (e.response.status === 403) {
            this.$toasted.error(e.response.data.error ? e.response.data.error : 'These credentials do not match our records.');
          } else if (e.response.status === 401) {
            this.$toasted.error('These credentials do not match our records.');
          }
        } finally {
          this.isLoading = false;
        }
      },
      async askForPermissionToReceiveNotifications() {
        const messaging = firebase.messaging();
  
        // Request permission
        await messaging.requestPermission();
  
        // Update token
        const token = await messaging.getToken();
        await this.updateDeviceToken(token);
  
        // Listen token changes
        messaging.onTokenRefresh(async() => {
          const token = await messaging.getToken();
          await this.updateDeviceToken(token);
        });
      },
      async updateDeviceToken(device_token) {
        let userAgentId = window.navigator.userAgent.replace(/\D+/g, '');
        await axios.put(`/t/notification-send-pushkey?pushkey=${device_token}&device_id=${userAgentId}&device_type=web`);
      },
      onLoginSuccessRedirect(){
        // Redirect the user to the page he first tried to visit or to the home view
        this.$router.replace(
          this.$route.query.redirect || {
            name: 'auditions'
          },
        );
      },
      onCancel() {
        console.log("User cancelled the loader.");
      },
    },
  };
</script>
