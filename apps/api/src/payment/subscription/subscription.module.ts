import { Module, forwardRef } from '@nestjs/common';

import { SubscriptionService } from './subscription.service';
import { CustomerModule } from '../customer/customer.module';
import { Customer } from '../customer/entities/customer.entity';

@Module({
    imports: [forwardRef(() => CustomerModule)],
    providers: [SubscriptionService],
    exports: [SubscriptionService],
})
export class SubscriptionModule {}
