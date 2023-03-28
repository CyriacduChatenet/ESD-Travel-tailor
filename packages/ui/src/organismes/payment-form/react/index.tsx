import { ChangeEvent, useState } from 'react';
import { PaymentService } from '@travel-tailor/services';
import { API_CONFIRM_PAYMENT_ROUTE, API_PAYMENT_ROUTE } from '@travel-tailor/constants';
import { PaymentCredentials } from '@travel-tailor/types';

interface PaymentFormProps {
  api_url: string;
}

export function WebPaymentForm({ api_url }: PaymentFormProps) {
  const [credentials, setCredentials] = useState<PaymentCredentials>({
    number: '',
    exp_month: 0,
    exp_year: 0,
    cvc: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    PaymentService.createPayment(`${api_url}${API_PAYMENT_ROUTE}`, `${api_url}${API_CONFIRM_PAYMENT_ROUTE}`, { amount: 1000, card : { ...credentials }})
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        <p>Card number</p>
        <input type="text" name='number' placeholder='card number' onChange={handleChange} />
      </label>
      <label htmlFor="">
        <p>Card exp month</p>
        <input type="number" name='exp_month' placeholder='card exp month' onChange={handleChange} />
      </label>
      <label htmlFor="">
        <p>Card exp year</p>
        <input type="number" name='exp_year' placeholder='card exp year' onChange={handleChange} />
      </label>
      <label htmlFor="">
        <p>Cvc</p>
        <input type="text" name='cvc' placeholder='cvc' onChange={handleChange} />
      </label>
      <input type="submit" value="Pay" />
    </form>
  );
}
