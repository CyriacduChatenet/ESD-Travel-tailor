import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimeSlotService } from './time-slot.service';
import { TimeSlotController } from './time-slot.controller';
import { TimeSlot } from './entities/time-slot.entity';
import { TimeSlotRepository } from './time-slot.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot])],
  controllers: [TimeSlotController],
  providers: [TimeSlotRepository, TimeSlotService],
  exports: [TimeSlotService],
})
export class TimeSlotModule {}
