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
      INDEX: '/traveler/tastes',
      CREATE: '/traveler/taste/create',
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
      CREATE_ACTIVITY: '/advertiser/create-activity',
      UPDATE_ACTIVITY: '/advertiser/update-activity',
      INDEX: '/activity',
    },
    INDEX: '/advertiser',
    PAYMENT: '/advertiser/payment'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    ADMIN: '/admin',
  },
  ROOT: '/'
}
