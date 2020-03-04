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
      path: '/password/reset-password/:token',
      name: 'password.reset-password',
      component: () => import(/* webpackChunkName: 'email' */ '@/views/auth/password/Resetpassword'),
    },
  ]),

  ...mapRoutes({ layout: 'checkIn' }, [
    {
      path: '/auditions/:id/checkin/:title/:date/:auditionId',
      name: 'auditions/checkin',
      component: () => import(/* webpackChunkName: 'auditions' */ '@/views/auditions/AuditionCheckIn'),
    },
  ]),

  ...mapRoutes({ layout: 'monitor' }, [
    {
      path: '/auditions/:id/monitor-mode/:auditionId',
      name: 'monitor-update',
      component: () => import(/* webpackChunkName: 'monitor-update' */ '@/views/auditions/MonitorMode'),
    },
  ]),

  ...mapRoutes({ layout: 'talent' }, [
    {
      path: '/auditions/talent-database',
      name: 'talents',
      component: () => import(/* webpackChunkName: 'auditions' */ '@/views/TalentDatabase'),
    },

  ]),

  ...mapRoutes({ layout: 'news' }, [
    {
      path: '/news-and-updates',
      name: 'news-and-updates',
      component: () => import(/* webpackChunkName: 'auditions.user' */ '@/views/newsAndUpdates'),
    },
    {
      path: '/news-and-updates/view',
      name: 'view.news',
      component: () => import(/* webpackChunkName: 'view.news' */ '@/views/ViewNews'),
    },

  ]),


  ...mapRoutes({ layout: 'detail' }, [
    {
      path: '/auditions/:audition/round/:round/user/:id/',
      name: 'auditions/user',
      component: () => import(/* webpackChunkName: 'auditions.user' */ '@/views/user/userAudition'),
    },

    {
      path: '/talent/:id/:code',
      name: 'talent/user',
      component: () => import(/* webpackChunkName: 'auditions.user' */ '@/views/user/userTalent'),
      props: true,
    },
  ]),

  ...mapRoutes({ layout: 'auditiondetails' }, [
    {
      path: '/auditions/detail/:id',
      name: 'auditions/detail',
      component: () => import(/* webpackChunkName: 'auditions.detail' */ '@/views/AuditionsDetail'),
    },
  ]),
  ...mapRoutes({ layout: 'auditiondetails' }, [
    {
      path: '/auditions/detail_old/:id',
      name: 'auditions/detail_old',
      component: () => import(/* webpackChunkName: 'auditions.detail' */ '@/views/AuditionsDetailOld'),
    },
  ]),
  ...mapRoutes({ layout: 'tour' }, [
    {
      path: '/tour',
      name: 'tour',
      component: () => import(/* webpackChunkName: 'tour' */ '@/views/tour/Details'),
    }
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
    path: '/auditions/update/:id',
    name: 'auditions.update',
    component: () => import(/* webpackChunkName: 'auditions.update' */ '@/views/auditions/UpdateAudition'),
  },
  // {
  //   path: '/auditions/detail/:id',
  //   name: 'auditions/detail',
  //   component: () => import(/* webpackChunkName: 'auditions.detail' */ '@/views/AuditionsDetail'),
  // },
  {
    path: '/auditions/round/:id/create',
    name: 'auditions.round',
    component: () => import(/* webpackChunkName: 'auditions.round' */ '@/views/auditions/CreateRound'),
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import(/* webpackChunkName: 'notifications' */ '@/views/MyNotifications'),
  },

  {
    path: '/my/settings',
    name: 'my.settings',
    component: () => import(/* webpackChunkName: 'mysettings' */ '@/views/Settings'),
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

  ...mapRoutes({ layout: 'authentication', public: true }, [
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: '404' */ '@/views/errors/404'),
    },
  ]),

];
