import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import routes from './routes';

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
      router.app.$nextTick(() => resolve(position));
    });
  }),
  routes,
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const allowBoth = to.matched.some(record => record.meta.allowBoth);
  
  if(allowBoth){
    return next();
  }
  const loggedIn = store.getters['auth/isAuthenticated'];

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

  return next();
});

export default router;
