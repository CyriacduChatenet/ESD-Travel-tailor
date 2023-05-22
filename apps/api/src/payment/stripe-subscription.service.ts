import { HttpException, Injectable } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";

import { CreateSubscriptionDto } from "./dto/create-subscription.dto";

@Injectable()
export class StripeSubscriptionService {
    constructor(@InjectStripe() private readonly stripeClient: Stripe) { }

    async create(createSubscriptionDto: CreateSubscriptionDto) {
        try {
            const sessionId = createSubscriptionDto.sessionId;

            const session = await this.stripeClient.checkout.sessions.retrieve(sessionId);
            const price = await this.stripeClient.prices.retrieve(createSubscriptionDto.priceId);

            const subscription = await this.stripeClient.subscriptions.create({
                customer: session.customer.toString(),
                items: [
                    {
                        price: price.id,
                    },
                ],
                collection_method: 'charge_automatically',
                payment_behavior: 'default_incomplete',
                expand: ['latest_invoice.payment_intent'],
            });

            const latestInvoice = await this.stripeClient.invoices.retrieve(subscription.latest_invoice as string, {
                expand: ['payment_intent'],
            });

            const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;

            if (paymentIntent.status === 'succeeded') {
                return subscription.id;
            } else {
                throw new HttpException('Failed to create subscription', 402);
            }
        } catch (err) {
            throw new HttpException(err.message, 402);
        }
    }

    async findAll() { }

    async findOne() { }

    async update() { }

    async delete() { }
}