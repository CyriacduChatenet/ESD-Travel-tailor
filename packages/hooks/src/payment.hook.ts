import { Stripe } from '@stripe/stripe-js';
import { API_PAYMENT_CHECKOUT_ROUTE } from '@travel-tailor/constants';

export const usePayment = async (api_url: string, stripePromise: Promise<Stripe | null>, credentials: {location: string, amount: number}) => {
    const response = await fetch(`${api_url}${API_PAYMENT_CHECKOUT_ROUTE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location:  credentials.location,
        amount: credentials.amount,
      }),
    })
    const data = await response.json()

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