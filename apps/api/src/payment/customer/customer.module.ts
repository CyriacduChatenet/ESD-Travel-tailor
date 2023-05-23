import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PaymentModule } from '../payment.module';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), forwardRef(() => PaymentModule)],
  controllers: [CustomerController],
  providers: [CustomerRepository, CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}