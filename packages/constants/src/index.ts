export const API_SIGNIN_ROUTE = `http://localhost:8000/api/v1/auth/signin`;
export const API_SIGNUP_ROUTE = `http://localhost:8000/api/v1/auth/signup`;
export const API_FORGOT_PASSWORD_ROUTE = `http://localhost:8000/api/v1/auth/forgot-password`;
export const API_RESET_PASSWORD_ROUTE = `http://localhost:8000/api/v1/auth/reset-password`;

export const API_ADVERTISER_ROUTE = `http://localhost:8000/api/v1/advertiser`;

export const API_TRAVELER_ROUTE = `http://localhost:8000/api/v1/traveler`;

export const API_USER_ROUTE = `http://localhost:8000/api/v1/user`;

export const ACCESS_TOKEN = 'accessToken';
export const RESET_TOKEN = 'resetToken';

export const ROUTES = {
    SIGNIN: '/signin',
    TRAVELER: {
        DASHBOARD: '/traveler/dashboard',
    },
    ADVERTISER: {
        DASHBOARD: '/advertiser/dashboard',
        CREATE_ADVERTISER: '/advertiser/create-advertiser',
    },
    ADMIN: {
        DASHBOARD: '/admin/dashboard'
    }
};

export const ROLES = {
    ADMIN: 'admin',
    TRAVELER: 'traveler',
    ADVERTISER: 'advertiser'
};