import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { PaymentService } from './payment.service'
import { OpencageService } from '../opencage/opencage.service';
import { Roles } from '../config/decorators/roles.decorator';
import { Role } from '../config/enum/role.enum';

@Controller('payment')
@UseGuards(ThrottlerGuard)
export class PaymentController {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly paymentService: PaymentService,
    private opencageService: OpencageService,
  ) { }


  @Post('checkout')
  @Throttle(100, 60)
  @Roles(Role.Advertiser, Role.Admin)
  async createCheckoutSession(@Body() { amount }: { amount: number }): Promise<{ sessionId: string }> {
    // const currency = await this.opencageService.getCurrency({ location });
    const createCheckoutDto: { currency: string, amount: number } = {
      currency: 'eur',
      amount,
    };
    const sessionId = await this.paymentService.createCheckoutSession(createCheckoutDto);
    return { sessionId };
  }

  @Get('invoices/customer/:customerId')
  async getInvoices(@Param() { customerId }: { customerId: string }): Promise<Stripe.Invoice[]> {
    const invoices = await this.stripeClient.invoices.list({
      customer: customerId,
    });
    return invoices.data;
  }
}
