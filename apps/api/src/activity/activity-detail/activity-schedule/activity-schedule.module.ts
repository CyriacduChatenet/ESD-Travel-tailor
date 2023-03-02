import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityScheduleService } from './activity-schedule.service';
import { ActivityScheduleController } from './activity-schedule.controller';
import { ActivitySchedule } from './entities/activity-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivitySchedule])],
  controllers: [ActivityScheduleController],
  providers: [ActivityScheduleService],
})
export class ActivityScheduleModule {}
