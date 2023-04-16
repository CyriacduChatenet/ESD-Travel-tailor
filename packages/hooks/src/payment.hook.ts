import { Stripe } from '@stripe/stripe-js';
import { API_PAYMENT_CHECKOUT_ROUTE } from '@travel-tailor/constants';
import { useFetch } from './fetch.hook'
import { Dispatch, SetStateAction } from 'react';

export const usePayment = async (api_url: string, stripePromise: Promise<Stripe | null>, credentials: {location: string, amount: number}, setError: Dispatch<SetStateAction<any>> | any) => {
  const data = await useFetch.post(`${api_url}${API_PAYMENT_CHECKOUT_ROUTE}`, credentials, setError);

  const stripe = await stripePromise
  if (stripe) {
    const result = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    })
    if (result.error) {
      console.error(result.error.message)
    }
  }
};