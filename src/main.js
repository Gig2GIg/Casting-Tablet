import '@/bootstrap';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VeeValidateLaravel from 'vee-validate-laravel-extended';
import VueTheMask from 'vue-the-mask';
import App from '@/App';
import store from '@/store';
import router from '@/router';

Vue.use(VeeValidate);
Vue.use(VeeValidateLaravel);
Vue.use(VueTheMask);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
