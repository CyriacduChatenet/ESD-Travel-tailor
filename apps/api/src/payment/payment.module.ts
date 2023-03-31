import { forwardRef, Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { ConfigModule } from '@nestjs/config';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StripeCustomerService } from './stripeCustomer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_KEY,
      apiVersion: '2022-11-15',
    })
  ],
  controllers: [PaymentController],
  providers: [PaymentService, StripeCustomerService],
  exports: [PaymentService, StripeCustomerService],
})
export class PaymentModule {}
