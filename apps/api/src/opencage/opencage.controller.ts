import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { OpencageService } from './opencage.service';
import { Roles } from '../config/decorators/roles.decorator';
import { Role } from '../config/enum/role.enum';

@Controller('opencage')
@UseGuards(ThrottlerGuard)
export class OpencageController {
    constructor(private opencageService: OpencageService) {}

    @Get()
    @Throttle(100, 60)
    @Roles(Role.Advertiser, Role.Admin)
    async getCurrency(@Query() query: { location: string}) {
        return await this.opencageService.getCurrency(query);
    }
}
