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

  ...mapRoutes({ layout: 'authentication', onlyWhenLoggedOut: true, isPrimeModule: false }, [
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
  ...mapRoutes({ layout: 'inviteuser', isPrimeModule: true }, [
    {
      path: '/invite-user/:type',
      alias: '/',
      name: 'invite_user',
      component: () => import('@/views/InviteUser'),
    },
  ]),
  ...mapRoutes({ layout: 'subscribeplan', isPrimeModule: false}, [
    {
      path: '/subscribe-plan',
      alias: '/',
      name: 'subscribe_plan',
      component: () => import('@/views/SubscribePlan'),
    },
    {
      path: '/plan-change',
      alias: '/',
      name: 'plan_change',
      component: () => import('@/views/PlanChange'),
    },
  ]),
  ...mapRoutes({ layout: 'blank', allowBoth: true , isPrimeModule: false }, [
    {
      path: '/talent-shared/:id',
      name: 'talent_shared/user',
      component: () => import(/* webpackChunkName: 'auditions.user' */ '@/views/user/userTalentShared'),
      props: true,
    },
  ]),

  ...mapRoutes({ layout: 'checkIn', isPrimeModule: true }, [
    {
      path: '/auditions/:id/checkin/:title/:date/:auditionId',
      name: 'auditions/checkin',
      component: () => import(/* webpackChunkName: 'auditions' */ '@/views/auditions/AuditionCheckIn'),
    },
  ]),

  ...mapRoutes({ layout: 'monitor', isPrimeModule: true }, [
    {
      path: '/auditions/:id/monitor-mode/:auditionId',
      name: 'monitor-update',
      component: () => import(/* webpackChunkName: 'monitor-update' */ '@/views/auditions/MonitorMode'),
    },
  ]),

  ...mapRoutes({ layout: 'talent', isPrimeModule: true }, [
    {
      path: '/auditions/talent-database',
      name: 'talents',
      component: () => import(/* webpackChunkName: 'auditions' */ '@/views/TalentDatabase'),
    },

  ]),

  ...mapRoutes({ layout: 'news', isPrimeModule: true }, [
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


  ...mapRoutes({ layout: 'detail', isPrimeModule: false }, [
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
    {
      path: '/talent/:id',
      name: 'talent/user_view',
      component: () => import(/* webpackChunkName: 'auditions.user' */ '@/views/user/userTalent'),
      props: true,
    },
  ]),

  ...mapRoutes({ layout: 'auditiondetails' , isPrimeModule: true }, [
    {
      path: '/auditions/detail/:id',
      name: 'auditions/detail',
      component: () => import(/* webpackChunkName: 'auditions.detail' */ '@/views/AuditionsDetail'),
    },
  ]),
  ...mapRoutes({ layout: 'auditionslotlayout' , isPrimeModule: true }, [
    {
      path: '/audition-slot/manage/:id',
      name: 'audition-slot/manage',
      component: () => import(/* webpackChunkName: 'auditions.detail' */ '@/views/AuditionSlotManage'),
    },
  ]),
  ...mapRoutes({ layout: 'tour',isPrimeModule: false }, [
    {
      path: '/tour',
      name: 'tour',
      component: () => import(/* webpackChunkName: 'tour' */ '@/views/tour/Details'),
    }
  ]),
  ...mapRoutes({ layout: 'settings',isPrimeModule: false }, [
    {
      path: '/my/settings',
      name: 'my.settings',
      component: () => import(/* webpackChunkName: 'tour' */ '@/views/Settings'),
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
    meta : {
      isPrimeModule: true
    },
    component: () => import(/* webpackChunkName: 'auditions' */ '@/views/Auditions'),
  },
  {
    path: '/past-auditions',
    name: 'past_auditions',
    component: () => import(/* webpackChunkName: 'auditions' */ '@/views/PastAuditions'),
  },
  {
    path: '/auditions/create',
    name: 'auditions.create',
    meta : {
      isPrimeModule: true
    },
    component: () => import(/* webpackChunkName: 'auditions.create' */ '@/views/auditions/CreateAudition'),
  },
  {
    path: '/auditions/update/:id',
    name: 'auditions.update',
    meta : {
      isPrimeModule: true
    },
    component: () => import(/* webpackChunkName: 'auditions.update' */ '@/views/auditions/UpdateAudition'),
  },
  // {
  //   path: '/auditions/detail/:id',
  //   name: 'auditions/detail',
  //   meta : {
  //     isPrimeModule: true
  //   },
  //   component: () => import(/* webpackChunkName: 'auditions.detail' */ '@/views/AuditionsDetail'),
  // },
  {
    path: '/auditions/round/:id/create',
    name: 'auditions.round',
    meta : {
      isPrimeModule: true
    },
    component: () => import(/* webpackChunkName: 'auditions.round' */ '@/views/auditions/CreateRound'),
  },
  {
    path: '/notifications',
    name: 'notifications',
    meta : {
      isPrimeModule: true
    },
    component: () => import(/* webpackChunkName: 'notifications' */ '@/views/MyNotifications'),
  },

  // {
  //   path: '/my/settings',
  //   name: 'my.settings',
  //   meta : {
  //     isPrimeModule: false
  //   },
  //   component: () => import(/* webpackChunkName: 'mysettings' */ '@/views/Settings'),
  // },

  /*
  |--------------------------------------------------------------------------
  | Error Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register routes for error messages. These
  | routes are used when there is no match.
  |
  */

  ...mapRoutes({ layout: 'authentication', public: true , isPrimeModule: false }, [
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: '404' */ '@/views/errors/404'),
    },
  ]),

];
