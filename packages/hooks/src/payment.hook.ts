import { Stripe } from '@stripe/stripe-js';
import { API_PAYMENT_CHECKOUT_ROUTE } from '@travel-tailor/constants';
import { useFetch } from './fetch.hook'

export const usePayment = async (api_url: string, stripePromise: Promise<Stripe | null>, credentials: {location: string, amount: number}) => {
  const response: any = useFetch.post(`${api_url}${API_PAYMENT_CHECKOUT_ROUTE}`, {
    location:  credentials.location,
    amount: credentials.amount,
  })

    const stripe = await stripePromise
    if (stripe) {
      const result = await stripe.redirectToCheckout({
        sessionId: response.sessionId,
      })
      if (result.error) {
        console.error(result.error.message)
      }
    }
};