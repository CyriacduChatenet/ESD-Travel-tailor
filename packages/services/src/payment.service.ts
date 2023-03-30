import { ROUTES } from '@travel-tailor/constants';
import { useFetch } from '@travel-tailor/hooks';
import { CreatePaymentDTO } from '@travel-tailor/types';

const createPayment = async (payment_url: string, confirm_url: string, credentials: CreatePaymentDTO) => {
    try {
        const response = await useFetch.post(`${payment_url}`, credentials);
        await useFetch.post(`${confirm_url}`, { paymentIntentId: response.id });
        return window.location.pathname = ROUTES.AUTH.SIGNIN;
    } catch (err) {
        console.error(err);
    }
};

export const PaymentService = {
    createPayment,
};