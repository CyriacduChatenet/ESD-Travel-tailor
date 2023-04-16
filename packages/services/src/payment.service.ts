import { ROUTES } from '@travel-tailor/constants';
import { Dispatch, SetStateAction } from '@travel-tailor/functions';
import { useFetch } from '@travel-tailor/hooks';
import { CreatePaymentDTO } from '@travel-tailor/types';

const createPayment = async (payment_url: string, confirm_url: string, credentials: CreatePaymentDTO, customerId: string, setError: Dispatch<SetStateAction<any>> | any) => {
    try {
        const response = await useFetch.post(`${payment_url}`, credentials, setError);
        await useFetch.post(`${confirm_url}`, { paymentIntentId: response.id, customer: customerId }, setError);
        return window.location.pathname = ROUTES.AUTH.SIGNIN;
    } catch (err) {
        console.error(err);
    }
};

export const PaymentService = {
    createPayment,
};