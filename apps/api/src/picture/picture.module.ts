import { Module } from '@nestjs/common';

import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';

@Module({
  providers: [PictureService],
  controllers: [PictureController]
})
export class PictureModule {}
