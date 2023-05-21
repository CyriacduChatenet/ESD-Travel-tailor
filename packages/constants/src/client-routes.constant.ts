export const ROUTES = {
  AUTH: {
    SIGNIN: '/signin',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },
  TRAVELER: {
    DASHBOARD: '/traveler/dashboard',
    EDIT_TRAVELER: '/traveler/edit-travel',
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
    },
    INDEX: '/advertiser',
    PAYMENT: '/advertiser/payment'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    ADMIN: '/admin',
  },
  ROOT: '/',
  ACTIVITY: {
    INDEX: '/activity',
  },
  SETTINGS: '/settings',
  SITE_MAP: '/site-map',
  TERMS_AND_CONDITIONS: '/terms-and-conditions',
  ABOUT_US: '/about-us',
}
