import { forwardRef, Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { ConfigModule } from '@nestjs/config';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { CustomerModule } from './customer/customer.module';
import { StripeCustomerService } from './stripe/customer/stripe-customer.service';
import { MailModule } from '../mail/mail.module';
import { StripeInvoiceService } from './stripe/invoices/stripe-invoice.service';
import { StripeInvoiceController } from './stripe/invoices/stripe-invoice.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_KEY,
      apiVersion: '2022-11-15',
    }),
    MailModule,
    forwardRef(() => CustomerModule),
  ],
  controllers: [PaymentController, StripeInvoiceController],
  providers: [PaymentService, StripeCustomerService, StripeInvoiceService],
  exports: [PaymentService, StripeCustomerService, StripeInvoiceService],
})
export class PaymentModule {}
