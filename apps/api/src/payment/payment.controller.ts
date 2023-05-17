import { Body, Controller, Post } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

import { PaymentService } from './payment.service'
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { OpencageService } from '../opencage/opencage.service';
import { InvoiceService } from './invoice.service';
import { StripeWebhookService } from './stripe-webhook.service';

@Controller('payment')
export class PaymentController {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly paymentService: PaymentService,
    private opencageService: OpencageService,
    private invoiceService: InvoiceService,
    private stripeWebhookService: StripeWebhookService,
  ) { }


  @Post('checkout')
  async createCheckoutSession(@Body() { location, amount }: { location: string, amount: number }): Promise<{ sessionId: string }> {
    // const currency = await this.opencageService.getCurrency({ location });
    const createCheckoutDto: { currency: string, amount: number } = {
      currency: 'eur',
      amount,
    };
    const sessionId = await this.paymentService.createCheckoutSession(createCheckoutDto);
    return { sessionId };
  }

  @Post('webhook')
  async webhook(@Body() body) {
    return await this.stripeWebhookService.paymentWebhook(body);
  }
}
