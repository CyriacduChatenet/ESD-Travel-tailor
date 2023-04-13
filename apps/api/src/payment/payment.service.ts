import { HttpException, Injectable } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'
import { ConfigService } from '@nestjs/config'

import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Role } from '../config/enum/role.enum';
import { SubscriptionService } from './subscription/subscription.service';
import { Advertiser } from '../user/advertiser/entities/advertiser.entity';
import { AdvertiserService } from '../user/advertiser/advertiser.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private configService: ConfigService,
    private subscriptionService: SubscriptionService,
    private advertiserService: AdvertiserService,
  ) {}

  async createCheckoutSession(createCheckoutDto: CreateCheckoutDto, advertiserId: string): Promise<string> {
    // try {
      const advertiser = await this.advertiserService.findOne(advertiserId);
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
        mode: 'payment',
        success_url: `${this.configService.get('CLIENT_APP_URL')}/payment/success`,
        cancel_url: `${this.configService.get('CLIENT_APP_URL')}/payment/cancel`,
      });

      // if (advertiser && advertiser.user.roles === Role.Advertiser) {
      //   await this.subscriptionService.createSubscription({
      //     customerId: advertiser.customer.stripeId,
      //     priceId: 'price_1Mw4OMFXjkZ2xKS6EgnyEo60',
      //   });
      // }

      return session.id;
    // } catch (err) {
    //   throw new HttpException(err.message, 402);
    // }
  }
  
}