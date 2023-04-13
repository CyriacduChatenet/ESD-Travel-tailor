import { Body, Controller, Param, Post } from '@nestjs/common'
import { User as UserType } from '@travel-tailor/types'

import { PaymentService } from './payment.service'
import { OpencageService } from '../opencage/opencage.service'

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private opencageService: OpencageService,
  ) {}

  @Post('checkout/:id')
  async createCheckoutSession(
    @Param('id') id: string,
    @Body() { location, amount }: { location: string; amount: number }
  ): Promise<{ sessionId: string }> {
    const currency = await this.opencageService.getCurrency({ location })

    const createCheckoutDto: { currency: string; amount: number } = {
      currency,
      amount,
    }

    const sessionId = await this.paymentService.createCheckoutSession(createCheckoutDto, id)
    return { sessionId }
  }
}
