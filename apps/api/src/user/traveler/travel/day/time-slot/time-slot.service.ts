import { Injectable } from '@nestjs/common';

import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';

@Injectable()
export class TimeSlotService {
  create(createTimeSlotDto: CreateTimeSlotDto) {
    return 'This action adds a new timeSlot';
  }

  findAll() {
    return `This action returns all timeSlot`;
  }

  findOne(id: string) {
    return `This action returns a #${id} timeSlot`;
  }

  update(id: string, updateTimeSlotDto: UpdateTimeSlotDto) {
    return `This action updates a #${id} timeSlot`;
  }

  remove(id: string) {
    return `This action removes a #${id} timeSlot`;
  }
}
