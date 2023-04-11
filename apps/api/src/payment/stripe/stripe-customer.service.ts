import { Injectable } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";

@Injectable()
export class StripeCustomerService {
    constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

    async create(email: string) {
        return await this.stripeClient.customers.create({ email });
    };

    async findAll() {
        return await this.stripeClient.customers.list();
    }

    async findOne(customerId: string) {
        return await this.stripeClient.customers.retrieve(customerId);
    }

    async update(customerId: string, email: string) {
        return await this.stripeClient.customers.update(customerId, { email });
    }

    async delete(customerId: string) {
        return await this.stripeClient.customers.del(customerId);
    }
}