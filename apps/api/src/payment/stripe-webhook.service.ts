import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";
import { ConfigService } from "@nestjs/config";
import { MailService } from "src/mail/mail.service";
import { InvoiceService } from "./invoice.service";
import { StripeCustomerService } from "./stripe-customer.service";

@Injectable()
export class StripeWebhookService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private configService: ConfigService,
    private mailService: MailService,
    private invoiceService: InvoiceService,
    private stripeCustomerService: StripeCustomerService,
    ) {}

  constructEvent(body, headers, secret: string): Stripe.Event {
    const signature = headers['stripe-signature'];

    try {
      return this.stripeClient.webhooks.constructEvent(body, signature, secret);
    } catch (err) {
      console.error(`Error when build Stripe event: ${err}`);
      throw new BadRequestException('Error when build Stripe event');
    }
  }

  async paymentWebhook(body) {
    const event = this.constructEvent(body, body.headers, this.configService.get('STRIPE_WEBHOOK_SECRET'));
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log(session);
        // Fulfill the purchase...
        // this.fulfillOrder(session);
        break;
      case 'invoice.paid':
        const invoice = event.data.object;
        console.log(invoice);
        // this.fulfillOrder(session);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return { received: true };
  }
}