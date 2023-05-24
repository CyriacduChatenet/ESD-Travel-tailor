import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityMarkService } from './activity-mark.service';
import { ActivityMarkController } from './activity-mark.controller';
import { ActivityMarkRepository } from './activty-mark.repository';
import { ActivityMark } from './entities/activity-mark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityMark])],
  controllers: [ActivityMarkController],
  providers: [ActivityMarkRepository, ActivityMarkService],
  exports: [ActivityMarkService],
})
export class ActivityMarkModule {}
