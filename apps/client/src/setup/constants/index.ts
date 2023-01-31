export const ROUTES = {
  ROOT: "/",
  ADVERTISER: {
    CREATE: '/create-advertiser',
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
  },
};
