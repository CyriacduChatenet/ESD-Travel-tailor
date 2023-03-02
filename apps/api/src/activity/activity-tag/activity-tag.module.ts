import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityTagService } from './activity-tag.service';
import { ActivityTagController } from './activity-tag.controller';
import { ActivityTag } from './entities/activity-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityTag])],
  controllers: [ActivityTagController],
  providers: [ActivityTagService],
})
export class ActivityTagModule {}
