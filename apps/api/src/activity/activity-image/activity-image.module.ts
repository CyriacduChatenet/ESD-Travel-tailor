import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityImageService } from './activity-image.service';
import { ActivityImageController } from './activity-image.controller';
import { ActivityImage } from './entities/activity-image.entity';
import { UploadFileModule } from '../../upload-file/upload-file.module';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityImage]), UploadFileModule],
  controllers: [ActivityImageController],
  providers: [ActivityImageService],
  exports: [ActivityImageService]
})
export class ActivityImageModule {}
