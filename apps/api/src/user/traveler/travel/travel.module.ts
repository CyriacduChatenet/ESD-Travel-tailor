import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { Travel } from './entities/travel.entity';
import { DayModule } from './day/day.module';
import { PlanningService } from './planning.service';
import { ActivityModule } from '../../../activity/activity.module';
import { TravelerModule } from '../traveler.module';
import { UserModule } from '../../../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Travel]), DayModule, ActivityModule, TravelerModule, UserModule],
  controllers: [TravelController],
  providers: [TravelService, PlanningService],
})
export class TravelModule {}
