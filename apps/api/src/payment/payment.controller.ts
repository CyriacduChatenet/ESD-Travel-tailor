import { Body, Controller, Post } from '@nestjs/common'

import { PaymentService } from './payment.service'
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { OpencageService } from '../opencage/opencage.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService, private opencageService: OpencageService) {}


  @Post('checkout')
  async createCheckoutSession(@Body() { location, amount}: { location: string, amount: number}): Promise<{ sessionId: string }> {
    const currency = await this.opencageService.getCurrency({ location });

    const createCheckoutDto: {currency: string, amount: number } = {
      currency,
      amount,
    };

    const sessionId = await this.paymentService.createCheckoutSession(createCheckoutDto);
    return { sessionId };
  }
}
