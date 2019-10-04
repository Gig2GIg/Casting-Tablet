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
  ]),

  ...mapRoutes({ layout: 'checkIn'}, [
    {
      path: '/auditions/:id/checkin',
      name: 'auditions/checkin',
      component: () => import(/* webpackChunkName: 'auditions' */ '@/views/auditions/AuditionCheckIn'),
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
  {
    path: '/auditions/create',
    name: 'auditions.create',
    component: () => import(/* webpackChunkName: 'auditions.create' */ '@/views/auditions/CreateAudition'),
  },

  {
    path: '/auditions/:id',
    name: 'auditions/detail',
    component: () => import(/* webpackChunkName: 'auditions' */ '@/views/AuditionsDetail'),
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
