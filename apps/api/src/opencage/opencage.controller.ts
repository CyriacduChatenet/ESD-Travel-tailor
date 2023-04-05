import { Controller, Get, Query } from '@nestjs/common';
import { OpencageService } from './opencage.service';

@Controller('opencage')
export class OpencageController {
    constructor(private opencageService: OpencageService) {}

    @Get()
    async getCurrency(@Query() query: { location: string}) {
        return await this.opencageService.getCurrency(query);
    }
}
