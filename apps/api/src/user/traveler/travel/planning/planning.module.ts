import { Module, forwardRef } from '@nestjs/common'

import { PlanningService } from './planning.service'
import { DayModule } from '../day/day.module'
import { UserModule } from '../../../../user/user.module'
import { TravelerModule } from '../../traveler.module'
import { TravelModule } from '../travel.module'
import { ActivityModule } from '../../../../activity/activity.module'
import { TimeSlotModule } from '../day/time-slot/time-slot.module'

@Module({
  imports: [
    DayModule,
    UserModule,
    TravelerModule,
    ActivityModule,
    TimeSlotModule,
    forwardRef(() => TravelModule),
  ],
  providers: [PlanningService],
  exports: [PlanningService],
})
export class PlanningModule {}
