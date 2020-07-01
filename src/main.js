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
import VModal from 'vue-js-modal'

import moment from "moment";

// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/images/no-image.jpg',
  loading: '/images/Loadingsome.gif',
  attempt: 1
});


Vue.use(VModal)

Vue.use(VueCarousel);
Vue.use(VeeValidate);
Vue.use(VeeValidateLaravel);
Vue.use(VueTheMask);
Vue.use(VueQrcodeReader);

Vue.filter("getErrorMsg", function(errors) {
  if (errors) {
    let obj = errors;
    return obj[Object.keys(obj)[0]] ? obj[Object.keys(obj)[0]][0] : null;
  } else {
    return null;
  }
});


Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("MMMM Do, YYYY");
  }
});

// only time value should be pass e.g. 10:20 am or 15:30
Vue.filter("custTimeFormat", function (value) {
  if (value) {
    return moment(String(value), "h:mma").format("hh:mm A");
  }
});

Vue.filter("planDateFormat", function (value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY");
  } else {
    return '-';
  }
});

// only time value should be pass e.g. 10:20 am or 15:30 and display only hours with minutes 00
Vue.filter("custHoursTimeFormat", function (value) {
  if (value) {
    return moment(String(value), "h:mma").format("hh:00 A");
  }
});


// Initialize Firebase
// firebase.initializeApp({
//   apiKey: 'AIzaSyDTrKkhJCM4ZNbFXRTq0AE2uKzNlpo3_i4',
//   authDomain: 'dd-gig2gig.firebaseapp.com',
//   databaseURL: 'https://dd-gig2gig.firebaseio.com',
//   projectId: 'dd-gig2gig',
//   storageBucket: 'dd-gig2gig.appspot.com',
//   messagingSenderId: '593196123450',
//   appId: '1:593196123450:web:796a695a5e872524fc3c03',
// });

Vue.config.productionTip = false;
export const eventBus = new Vue();

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
