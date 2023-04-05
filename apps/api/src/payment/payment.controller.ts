import { Controller, Get } from '@nestjs/common'

import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}


  @Get('checkout')
  async createCheckoutSession(): Promise<{ sessionId: string }> {
    const sessionId = await this.paymentService.createCheckoutSession();
    return { sessionId };
  }
}
