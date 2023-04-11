import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";

import { Customer } from "../customer/entities/customer.entity";
import { Repository } from "typeorm";
import { CreateSubscriptionDto } from "../dto/create-subscription.dto";

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
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

    const customer = await this.customerRepository.findOne({ where: { stripeId: customerId } });
    customer.stripeId = subscription.customer as string;
    await this.customerRepository.save(customer);

    return subscription;
  }
}
