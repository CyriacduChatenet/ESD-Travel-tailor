import { Controller, Get } from '@nestjs/common';

import { PictureService } from './picture.service';

@Controller('picture')
export class PictureController {
    constructor(private readonly pictureService: PictureService) {};

    @Get()
    async findHomeBannerContent() {
        return await this.pictureService.findHomeBannerContent();
    }
}
