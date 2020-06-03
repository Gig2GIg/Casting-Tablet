import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import routes from './routes';
import DEFINE from './../utils/const';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: (to, _from, savedPosition) => new Promise((resolve) => {
    const position = savedPosition || {};

    // savedPosition is only available for popstate navigations.
    if (!savedPosition) {
      if (to.hash) {
        position.selector = to.hash;
      }

      // Check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        position.x = 0;
        position.y = 0;
      }
    }

    // Wait for the out transition to complete (if necessary)
    router.app.$root.$once('triggerScroll', () => {
      console.log("router triggerScroll")
      router.app.$nextTick(() => resolve(position));
    });
  }),
  routes,
});

router.beforeEach((to, from, next) => {
console.log("to", to)
console.log("from", from)
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const allowBoth = to.matched.some(record => record.meta.allowBoth);
  const isPrimeModule = to.matched.some(record => record.meta.isPrimeModule);
  // console.log("isPrimeModule", isPrimeModule)


  if (allowBoth) {
    return next();
  }
  const loggedIn = store.getters['auth/isAuthenticated'];
  const currentUser = store.getters['profile/currentUser'];
  console.log("router currentUser", currentUser)

  if (!isPublic && !onlyWhenLoggedOut && !loggedIn) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next({ name: 'auditions' });
  }

  if (isPrimeModule && (!currentUser || !currentUser.is_premium || currentUser.is_premium === 0)) {
    Vue.toasted.clear();
    Vue.toasted.info(DEFINE.no_plan_subscirbed_error);
    // Vue.toasted.info(DEFINE.no_plan_subscirbed_error,  {
    //   action : {
    //       text : 'Subscribe',
    //       onClick : (e, toastObject) => {            
    //         that.$router.push({name: 'my.settings'});
    //       }
    //     }
    //   });
    if(from.name){
      return next({ name: from.name });
    } else {
      return next({ name: 'my.settings' });
    }
    
  }

  return next();
});
router.afterEach((to, from, next) => {
  const currentUser = store.getters['profile/currentUser'];
  // console.log("currentUser", currentUser)
});

export default router;
