import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { Roles } from '../config/decorators/roles.decorator';
import { Role } from '../config/enum/role.enum';
import { StripeWebhookService } from './stripe-webhook.service';

@Controller('stripe-webhook')
export class StripeWebhookController {
    constructor(private stripeWebhookService: StripeWebhookService) {}

    @Post()
    @Throttle(10, 60)
    @Roles(Role.Advertiser, Role.Admin)
    async webhook(@Body() body) {
        return await this.stripeWebhookService.paymentWebhook(body);
    }
}
