import React, { FC } from 'react';
import { loadStripe, StripeElements } from '@travel-tailor/functions';
import { WebPaymentForm } from '@travel-tailor/ui';

interface IProps {
    api_url: string;
    stripe_api_key: string;
}

export const StripeProvider: FC<IProps> = ({ api_url, stripe_api_key }) => {
    const stripePromise = loadStripe(stripe_api_key);

    const handleSuccess = () => {
        console.log('success')
        // Traitement après un paiement réussi
      };
    
      const handleError = () => {
        console.log('error')
        // Traitement après un échec de paiement
      };

      return (
        <StripeElements stripe={stripePromise}>
          <WebPaymentForm amount={1000} onSuccess={handleSuccess} onError={handleError} api_url={api_url} />
        </StripeElements>
      );
    
};