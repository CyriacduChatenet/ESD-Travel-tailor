import { HttpException, Injectable } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";

import { CreateSubscriptionDto } from "../dto/create-subscription.dto";

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Stripe.Subscription> {
    try {
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
    } catch (err) {
    throw new HttpException(err.message, 402);
    }
    }
}
