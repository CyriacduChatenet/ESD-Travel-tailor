import { Body, Controller, Post } from '@nestjs/common'
import { User as UserType } from '@travel-tailor/types';

import { PaymentService } from './payment.service'
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { OpencageService } from '../opencage/opencage.service';
import { User } from '../config/decorators/user.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService, private opencageService: OpencageService) {}


  @Post('checkout')
  async createCheckoutSession(@Body() { location, amount}: { location: string, amount: number}, @User() user: UserType): Promise<{ sessionId: string }> {
    const currency = await this.opencageService.getCurrency({ location });

    const createCheckoutDto: CreateCheckoutDto = {
      currency,
      amount,
      customer: user.advertiser ? user.advertiser.customer.id : user.traveler.customer.id,
    };

    const sessionId = await this.paymentService.createCheckoutSession(createCheckoutDto, user);
    return { sessionId };
  }
}
