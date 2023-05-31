import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectStripe } from "nestjs-stripe";
import Stripe from "stripe";
import { ConfigService } from "@nestjs/config";

import { MailService } from "../mail/mail.service";
import { StripeCustomerService } from "./stripe-customer.service";

@Injectable()
export class StripeWebhookService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private configService: ConfigService,
    private mailService: MailService,
    private stripeCustomerService: StripeCustomerService,
  ) { }

  async handleStripeWebhook(event: Stripe.Event) {
    try {
      console.log('payment_intent.created', event)
      return { success_payment: event }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.PAYMENT_REQUIRED)
    }
  }
}