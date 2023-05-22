import { Body, Controller, Post } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

import { PaymentService } from './payment.service'
import { OpencageService } from '../opencage/opencage.service';

@Controller('payment')
export class PaymentController {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly paymentService: PaymentService,
    private opencageService: OpencageService,
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
}
