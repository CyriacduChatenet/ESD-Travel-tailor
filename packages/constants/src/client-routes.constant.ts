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
      CREATE: '/traveler/taste/create',
    },
    TRAVELER: '/traveler',
    TRAVEL: {
      FIND: '/travel',
      ACTIVITY: '/travel/activity',
      PAYMENT: '/travel/payment',
    }
  },
  ADVERTISER: {
    DASHBOARD: '/advertiser/dashboard',
    CREATE_ADVERTISER: '/advertiser/create',
    ACTIVITY: {
      CREATE_ACTIVITY: '/advertiser/create-activity',
      UPDATE_ACTIVITY: '/advertiser/update-activity',
      LIST: '/activity',
    },
    ADVERTISER: '/advertiser',
    PAYMENT: '/advertiser/payment'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    ADMIN: '/admin',
  },
  ROOT: '/'
}
