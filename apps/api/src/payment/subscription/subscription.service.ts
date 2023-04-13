import { HttpException, Injectable } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'

import { CreateSubscriptionDto } from '../dto/create-subscription.dto'
import { StripeCustomerService } from '../stripe-customer/stripe-customer.service'

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly stripeCustomerService: StripeCustomerService
  ) {}

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Stripe.Subscription> {
    try {
      const customer = await this.stripeCustomerService.findOne(createSubscriptionDto.customerId);

      if (!customer) {
        const paymentMethodId = "pm_12345"; // Replace with your payment method ID
        await this.stripeClient.customers.update(createSubscriptionDto.customerId, {
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });
        const subscription = await this.stripeClient.subscriptions.create({
          customer: createSubscriptionDto.customerId,
          items: [
            {
              price: createSubscriptionDto.priceId,
            },
          ],
          expand: ['latest_invoice.payment_intent'],
        });
        return subscription;
      }
    } catch (err) {
      throw new HttpException(err.message, 402);
    }
  }
}

