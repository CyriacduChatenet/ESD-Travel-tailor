export const ROUTES = {
  ROOT: "/",
  ADVERTISER: {
    CREATE: '/create-advertiser/:id',
    DASHBOARD: '/advertiser/dashboard',
    ADVERT: {
        CREATE: '/advertiser/create-advert',
        UPDATE: '/advertiser/edit-advert/:id',
        UPDATE_WITHOUT_ID: '/advertiser/edit-advert/',
    }
  },
  TRAVELER: {
    DASHBOARD: '/dashboard',
  },
  ADMIN: {},
  AUTH: {
    SIGNIN: "/signin",
    SIGNUP: "/signup",
    FORGOT_PASWORD: "/forgot-password",
    RESET_PASWORD: "/reset-password",
  },
};

export const ROLES = {
  ADVERTISER : 'advertiser',
  TRAVELER: 'traveler',
  ADMIN: 'admin',
}

export const TOKENS = {
  ACCESS_TOKEN: 'access_token',
  RESET_TOKEN: 'reset_token',
}