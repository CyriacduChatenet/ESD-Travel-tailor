import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityClosingDayService } from './activity-closing-day.service';
import { ActivityClosingDayController } from './activity-closing-day.controller';
import { ActivityClosingDay } from './entities/activity-closing-day.entity';
import { ActivityClosingDayRepository } from './activity-closing-day.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityClosingDay])],
  controllers: [ActivityClosingDayController],
  providers: [ActivityClosingDayRepository, ActivityClosingDayService],
})
export class ActivityClosingDayModule {}
