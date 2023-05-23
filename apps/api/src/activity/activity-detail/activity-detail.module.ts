import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityDetailService } from './activity-detail.service';
import { ActivityDetailController } from './activity-detail.controller';
import { ActivityDetail } from './entities/activity-detail.entity';
import { ActivityDetailRepository } from './activity-detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityDetail])],
  controllers: [ActivityDetailController],
  providers: [ActivityDetailRepository, ActivityDetailService],
  exports: [ActivityDetailService]
})
export class ActivityDetailModule {}
