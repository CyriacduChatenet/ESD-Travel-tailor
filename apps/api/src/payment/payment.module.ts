import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { applyRawBodyOnlyTo } from '@golevelup/nestjs-webhooks';
import { ConfigModule } from '@nestjs/config';
import { SkipThrottle } from '@nestjs/throttler';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { StripeCustomerService } from './stripe-customer.service';
import { OpencageModule } from '../opencage/opencage.module';
import { MailModule } from '../mail/mail.module';
import { StripeWebhookService } from './stripe-webhook.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StripeModule.forRoot(StripeModule, {
      apiKey: process.env.STRIPE_SECRET_KEY,
      apiVersion: '2022-11-15',
      webhookConfig: {
        stripeSecrets: {
          account: process.env.STRIPE_WEBHOOK_SECRET,
          connect: process.env.STRIPE_WEBHOOK_SECRET,
        },
        decorators: [SkipThrottle()],
      },
    }),
    MailModule,
    OrderModule,
    forwardRef(() => CustomerModule),
    OpencageModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, StripeCustomerService, StripeWebhookService],
  exports: [PaymentService, StripeCustomerService],
})
export class PaymentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    applyRawBodyOnlyTo(consumer, {
      method: RequestMethod.ALL,
      path: 'stripe/webhook',
    });
  }
}
