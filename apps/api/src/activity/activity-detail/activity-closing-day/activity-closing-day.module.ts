import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityClosingDayService } from './activity-closing-day.service';
import { ActivityClosingDayController } from './activity-closing-day.controller';
import { ActivityClosingDay } from './entities/activity-closing-day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityClosingDay])],
  controllers: [ActivityClosingDayController],
  providers: [ActivityClosingDayService],
})
export class ActivityClosingDayModule {}
