import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'
import { ConfigService } from '@nestjs/config'

import { OrderService } from './order/order.service'
import { CustomerService } from './customer/customer.service'

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private orderService: OrderService,
    @Inject(forwardRef(() => CustomerService))
    private customerService: CustomerService,
    private configService: ConfigService,
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
      success_url: `${this.configService.get('CLIENT_APP_URL')}/payment/success`,
      cancel_url: `${this.configService.get('CLIENT_APP_URL')}/payment/cancel`,
    });
    return session.id;
  }
}
