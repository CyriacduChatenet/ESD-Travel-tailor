import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimeSlotService } from './time-slot.service';
import { TimeSlotController } from './time-slot.controller';
import { TimeSlot } from './entities/time-slot.entity';
import { TimeSlotRepository } from './time-slot.repository';
import { DayModule } from '../day.module';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot]), forwardRef(() => DayModule)],
  controllers: [TimeSlotController],
  providers: [TimeSlotRepository, TimeSlotService],
  exports: [TimeSlotService],
})
export class TimeSlotModule {}
