import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@travel-tailor/functions';
import { useFetch } from '@travel-tailor/hooks';

interface PaymentFormProps {
  api_url: string;
  amount: number;
  onSuccess: () => void;
  onError: () => void;
}

export function WebPaymentForm({ amount, onSuccess, onError, api_url }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      return;
    }

    try {
      const { paymentIntent } = await useFetch.post(api_url, { amount })

      const { error } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      onSuccess();
    } catch (error: any) {
      setErrorMessage(error.message);
      onError();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement />
      </label>

      {errorMessage && <p>{errorMessage}</p>}

      <button type="submit">Pay {amount} EUR</button>
    </form>
  );
}
