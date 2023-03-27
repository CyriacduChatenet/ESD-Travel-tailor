import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async createPaymentIntent(amount: number) {
    const paymentMethod = await this.stripeClient.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2022,
        cvc: '123',
      },
    });
  
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method: paymentMethod.id,
    });
  
    return paymentIntent;
  }  

  async confirmPaymentIntent(paymentIntentId: string) {
    const paymentIntent = await this.stripeClient.paymentIntents.confirm(
      paymentIntentId,
    );
    return paymentIntent;
  }
}
