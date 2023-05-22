import { HttpException, Injectable } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'
import { ConfigService } from '@nestjs/config'

import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { StripeSubscriptionService } from './stripe-subscription.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly configService: ConfigService,
    private readonly stripeSubscriptionService: StripeSubscriptionService,
  ) { }

  async createCheckoutSession(createCheckoutDto: CreateCheckoutDto): Promise<string> {
    try {
      const session = await this.stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: createCheckoutDto.currency ? createCheckoutDto.currency : 'eur',
              product_data: {
                name: 'Product Name',
                description: 'Product Description',
              },
              unit_amount: createCheckoutDto.amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${this.configService.get('CLIENT_APP_URL')}/payment/success`,
        cancel_url: `${this.configService.get('CLIENT_APP_URL')}/payment/cancel`,
      });

      const subscriptionId = await this.stripeSubscriptionService.create({
        sessionId: session.id,
        priceId: session.line_items[0].price.id,
      });
  
      return subscriptionId;
    } catch (err) {
      throw new HttpException(err.message, 402);
    }
  }
}
