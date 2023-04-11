import { Module } from '@nestjs/common';
import { StripeCustomerService } from './stripe-customer.service';
import { StripeCustomerController } from './stripe-customer.controller';

@Module({
  controllers: [StripeCustomerController],
  providers: [StripeCustomerService],
  exports: [StripeCustomerService],
})
export class StripeCustomerModule {}
