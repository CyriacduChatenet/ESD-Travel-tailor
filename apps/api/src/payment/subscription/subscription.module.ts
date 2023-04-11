import { Module, forwardRef } from '@nestjs/common';

import { SubscriptionService } from './subscription.service';

@Module({
    providers: [SubscriptionService],
    exports: [SubscriptionService],
})
export class SubscriptionModule {}
