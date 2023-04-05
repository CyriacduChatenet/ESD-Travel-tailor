import { forwardRef, Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { ConfigModule } from '@nestjs/config';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { StripeCustomerService } from './stripe-customer.service';
import { SubscriptionService } from './subscription.service';
import { OpencageModule } from '../opencage/opencage.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_KEY,
      apiVersion: '2022-11-15',
    }),
    OrderModule,
    forwardRef(() => CustomerModule),
    OpencageModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, StripeCustomerService, SubscriptionService],
  exports: [PaymentService, StripeCustomerService, SubscriptionService],
})
export class PaymentModule {}
