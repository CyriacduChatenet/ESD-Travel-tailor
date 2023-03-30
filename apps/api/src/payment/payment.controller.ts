import { Controller, Post, Body } from '@nestjs/common'

import { PaymentService } from './payment.service'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { StripeCustomerService } from './stripeCustomer.service'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService, private stripeCustomerService: StripeCustomerService) {}

  @Post('create-customer')
  async createStripeCustomer() {
    const customer = await this.stripeCustomerService.createStripeCustomer()
    return customer
  }

  @Post()
  async createPaymentIntent(@Body() createPaymentDto: CreatePaymentDto) {
    const paymentIntent = await this.paymentService.createPaymentIntent(
      createPaymentDto
    )
    return paymentIntent
  }

  @Post('/confirm')
  async confirmPaymentIntent(@Body('paymentIntentId') paymentIntentId: string, @Body('userId') customer: string) {
    const paymentIntent = await this.paymentService.confirmPaymentIntent(
      paymentIntentId,
      customer
    )
    return paymentIntent
  }
}
