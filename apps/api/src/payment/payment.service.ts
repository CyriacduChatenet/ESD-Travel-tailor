import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async createStripeCustomer() {
    const customer = await this.stripeClient.customers.create();
    return customer;
  }

  async createPaymentIntent(createPaymentDto: CreatePaymentDto) {
    const paymentMethod = await this.stripeClient.paymentMethods.create({
      type: 'card',
      card: createPaymentDto.card,
    });
  
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: createPaymentDto.amount,
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
