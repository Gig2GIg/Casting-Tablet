import '@/bootstrap';
import Vue from 'vue';
import VueCarousel from 'vue-carousel';
import VeeValidate from 'vee-validate';
import VeeValidateLaravel from 'vee-validate-laravel-extended';
import VueTheMask from 'vue-the-mask';
import VueQrcodeReader from 'vue-qrcode-reader';
import firebase from 'firebase/app';
import App from '@/App';
import store from '@/store';
import router from '@/router';

Vue.use(VueCarousel);
Vue.use(VeeValidate);
Vue.use(VeeValidateLaravel);
Vue.use(VueTheMask);
Vue.use(VueQrcodeReader);

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

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
