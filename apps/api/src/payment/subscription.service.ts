import { Injectable } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";

@Injectable()
export class SubscriptionService {
    constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

    async create(customerId: string, priceId: string) {
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