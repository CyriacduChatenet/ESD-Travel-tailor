import { forwardRef, Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { ConfigModule } from '@nestjs/config';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { OpencageModule } from '../opencage/opencage.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { AdvertiserModule } from '../user/advertiser/advertiser.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_KEY,
      apiVersion: '2022-11-15',
    }),
    OrderModule,
    OpencageModule,
    forwardRef(() => CustomerModule),
    StripeModule,
    SubscriptionModule,
    forwardRef(() => AdvertiserModule),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
