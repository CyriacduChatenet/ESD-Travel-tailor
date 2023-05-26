export const ROUTES = {
  AUTH: {
    SIGNIN: '/signin',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    ACTIVITIES: '/admin/activities',
    TRAVELER: '/admin/traveler',
    ADVERTISER: '/admin/advertiser',
    TAGS: '/admin/tags',
  },
  TRAVELER: {
    DASHBOARD: '/traveler/dashboard',
    EDIT_TRAVELER: '/traveler/edit-travel',
    EDIT: '/traveler/edit',
    TASTE: {
      INDEX: '/traveler/taste',
      CREATE: '/traveler/taste/create',
      EDIT: '/traveler/taste/edit',
    },
    TRAVELER: '/traveler',
    TRAVEL: {
      FIND: '/travel',
      ACTIVITY: '/traveler/travel/activity',
      PAYMENT: '/travel/payment',
    }
  },
  ADVERTISER: {
    DASHBOARD: '/advertiser/dashboard',
    CREATE_ADVERTISER: '/advertiser/create',
    INVOICE: {
      INDEX: '/advertiser/invoices',
    },
    ACTIVITY: {
      CREATE_ACTIVITY: '/advertiser/activity/create',
      UPDATE_ACTIVITY: '/advertiser/activity/edit',
      INDEX: '/activity',
      EDIT: '/activity/edit',
    },
    INDEX: '/advertiser',
    EDIT: '/advertiser/edit',
    PAYMENT: '/advertiser/payment'
  },
  ROOT: '/',
  ACTIVITY: {
    INDEX: '/activity',
    EDIT: '/activity/edit',
    CREATE: '/activity/create',
  },
  TAGS: {
    CREATE: '/tag/create',
    EDIT: '/tag/edit',
  },
  SETTINGS: '/settings',
  SITE_MAP: '/site-map',
  TERMS_AND_CONDITIONS: '/terms-and-conditions',
  ABOUT_US: '/about-us',
}
