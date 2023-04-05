import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'

import { OrderService } from './order/order.service'
import { CustomerService } from './customer/customer.service'

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private orderService: OrderService,
    @Inject(forwardRef(() => CustomerService))
    private customerService: CustomerService
  ) {}

  async createCheckoutSession(): Promise<string> {
    const session = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Product Name',
              description: 'Product Description',
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
    return session.id;
  }
}
