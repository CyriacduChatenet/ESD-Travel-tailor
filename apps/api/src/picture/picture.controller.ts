import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PictureService } from './picture.service';

@Controller('picture')
@ApiTags('Picture')
export class PictureController {
    constructor(private readonly pictureService: PictureService) {};

    @Get()
    @ApiOperation({ summary: 'Get picture' })
    @ApiOkResponse({ description: 'Successful operation' })
    async findHomeBannerContent() {
        return await this.pictureService.findHomeBannerContent();
    }
}
