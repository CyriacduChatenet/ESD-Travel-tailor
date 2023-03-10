import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityDetailService } from './activity-detail.service';
import { ActivityDetailController } from './activity-detail.controller';
import { ActivityDetail } from './entities/activity-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityDetail])],
  controllers: [ActivityDetailController],
  providers: [ActivityDetailService],
  exports: [ActivityDetailService]
})
export class ActivityDetailModule {}
