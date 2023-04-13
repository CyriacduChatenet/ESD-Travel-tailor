import { Module, forwardRef } from '@nestjs/common';

import { SubscriptionService } from './subscription.service';
import { StripeCustomerModule } from '../stripe-customer/stripe-customer.module';

@Module({
    imports: [StripeCustomerModule],
    providers: [SubscriptionService],
    exports: [SubscriptionService],
})
export class SubscriptionModule {}
