import { Stripe } from '@stripe/stripe-js';
import { API_PAYMENT_CHECKOUT_ROUTE } from '@travel-tailor/constants';
import { useFetch } from './fetch.hook'

export const usePayment = async (api_url: string, stripePromise: Promise<Stripe | null>, credentials: {location: string, amount: number}) => {
  const data = await useFetch.post(`${api_url}${API_PAYMENT_CHECKOUT_ROUTE}`, credentials);

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