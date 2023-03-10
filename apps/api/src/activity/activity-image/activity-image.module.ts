import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityImageService } from './activity-image.service';
import { ActivityImageController } from './activity-image.controller';
import { ActivityImage } from './entities/activity-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityImage])],
  controllers: [ActivityImageController],
  providers: [ActivityImageService],
  exports: [ActivityImageService]
})
export class ActivityImageModule {}
