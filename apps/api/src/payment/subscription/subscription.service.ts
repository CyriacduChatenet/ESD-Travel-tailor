import { Injectable } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";

import { CreateSubscriptionDto } from "../dto/create-subscription.dto";

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    const { customerId, priceId } = createSubscriptionDto;

    const subscription = await this.stripeClient.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
    });

    return subscription;
  }
}
