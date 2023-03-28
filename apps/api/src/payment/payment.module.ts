import { Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { ConfigModule } from '@nestjs/config';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_KEY,
      apiVersion: '2022-11-15',
    }),
    CustomerModule,
    OrderModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
