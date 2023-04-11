import { HttpException, Injectable } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'
import { ConfigService } from '@nestjs/config'
import { User } from '@travel-tailor/types';

import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { SubscriptionService } from './subscription/subscription.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private configService: ConfigService,
  ) {}

  async createCheckoutSession(createCheckoutDto: CreateCheckoutDto, user: User): Promise<string> {
    try {
      const session = await this.stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: createCheckoutDto.currency,
              product_data: {
                name: 'Product Name',
                description: 'Product Description',
              },
              unit_amount: createCheckoutDto.amount * 100,
            },
            quantity: 1,
          },
        ],
        customer: createCheckoutDto.customer,
        mode: 'payment',
        success_url: `${this.configService.get('CLIENT_APP_URL')}/payment/success`,
        cancel_url: `${this.configService.get('CLIENT_APP_URL')}/payment/cancel`,
      });

      // if(user.advertiser) {
      //   console.log('create subscription');
      //   await this.subscriptionService.createSubscription({ customerId: createCheckoutDto.customer, priceId: `${createCheckoutDto.amount * 100}` });
      // }

      return session.id;
    } catch (err) {
      throw new HttpException(err.message, 402);
    }
  }
}
