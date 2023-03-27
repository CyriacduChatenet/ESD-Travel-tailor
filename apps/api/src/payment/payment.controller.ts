import { Controller, Post, Body } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPaymentIntent(@Body('amount') amount: number) {
    const paymentIntent = await this.paymentService.createPaymentIntent(
      amount,
    );
    return paymentIntent;
  }

  @Post('/confirm')
  async confirmPaymentIntent(@Body('paymentIntentId') paymentIntentId: string) {
    const paymentIntent = await this.paymentService.confirmPaymentIntent(
      paymentIntentId,
    );
    return paymentIntent;
  }
}
