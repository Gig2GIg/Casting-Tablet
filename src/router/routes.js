import mapRoutes from './utils';

export default [

  /*
  |--------------------------------------------------------------------------
  | Guest Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register routes for guest access. These
  | routes require not being authenticated and are public
  | access.
  |
  */

  ...mapRoutes({ layout: 'authentication', onlyWhenLoggedOut: true }, [
    {
      path: '/login',
      alias: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: 'login' */ '@/views/auth/Login'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: 'register' */ '@/views/auth/Register'),
    },
    {
      path: '/password/email',
      name: 'password.email',
      component: () => import(/* webpackChunkName: 'email' */ '@/views/auth/password/Email'),
    },
    {
      path: '/password/reset/:token',
      name: 'password.reset',
      component: () => import(/* webpackChunkName: 'reset' */ '@/views/auth/password/Reset'),
    },
  ]),

  /*
  |--------------------------------------------------------------------------
  | Protected Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register routes for private access. These
  | routes require authentication and are used for private
  | access.
  |
  */

  {
    path: '/auditions',
    name: 'auditions',
    component: () => import(/* webpackChunkName: 'auditions' */ '@/views/Auditions'),
  },

  /*
  |--------------------------------------------------------------------------
  | Error Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register routes for error messages. These
  | routes are used when there is no match.
  |
  */

  ...mapRoutes({ layout: 'landing', public: true }, [
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: '404' */ '@/views/errors/404'),
    },
  ]),

];
