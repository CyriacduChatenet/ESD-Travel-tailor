import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'
import {
  ApiTags,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { PaymentService } from './payment.service'
import { Roles } from '../config/decorators/roles.decorator'
import { Role } from '../config/enum/role.enum'

@Controller('payment')
@UseGuards(ThrottlerGuard)
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout/:customerId')
  @Throttle(1000, 60)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiCreatedResponse({
    description: 'Checkout session created successfully',
    type: () => ({ sessionId: String }),
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to create checkout' })
  async createCheckoutSession(
    @Param('customerId') customerId: string,
    @Body() { amount }: { amount: number }
  ): Promise<{ sessionId: string }> {
    const createCheckoutDto: {
      currency: string
      amount: number
      customer: string
    } = {
      currency: 'eur',
      amount,
      customer: customerId,
    }
    const sessionId = await this.paymentService.createCheckoutSession(
      createCheckoutDto
    )
    return { sessionId }
  }
}
