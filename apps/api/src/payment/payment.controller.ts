import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { PaymentService } from './payment.service'
import { Roles } from '../config/decorators/roles.decorator';
import { Role } from '../config/enum/role.enum';

@Controller('payment')
@UseGuards(ThrottlerGuard)
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) { }


  @Post('checkout/:customerId')
  @Throttle(500, 60)
  @Roles(Role.Advertiser, Role.Admin)
  async createCheckoutSession(@Param('customerId') customerId: string ,@Body() { amount }: { amount: number }): Promise<{ sessionId: string }> {
    const createCheckoutDto: { currency: string, amount: number, customer: string } = {
      currency: 'eur',
      amount,
      customer: customerId,
    };
    const sessionId = await this.paymentService.createCheckoutSession(createCheckoutDto);
    return { sessionId };
  }
}
