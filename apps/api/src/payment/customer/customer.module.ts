import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PaymentModule } from '../payment.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { StripeCustomerModule } from '../stripe-customer/stripe-customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), forwardRef(() => PaymentModule), SubscriptionModule, StripeCustomerModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}