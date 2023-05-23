import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityImageService } from './activity-image.service';
import { ActivityImageController } from './activity-image.controller';
import { ActivityImage } from './entities/activity-image.entity';
import { ActivityImageRepository } from './activity-image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityImage])],
  controllers: [ActivityImageController],
  providers: [ActivityImageRepository, ActivityImageService],
  exports: [ActivityImageService]
})
export class ActivityImageModule {}
