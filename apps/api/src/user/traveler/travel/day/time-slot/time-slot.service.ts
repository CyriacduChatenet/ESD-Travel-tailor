import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { CreateTimeSlotDto } from './dto/create-time-slot.dto'
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto'
import { TimeSlotRepository } from './time-slot.repository'

@Injectable()
export class TimeSlotService {
  constructor(private readonly timeSlotRepository: TimeSlotRepository) {}

  async create(createTimeSlotDto: CreateTimeSlotDto) {
    try {
      return await this.timeSlotRepository.createTimeSlot(createTimeSlotDto);
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
     return await this.timeSlotRepository.findAllTimeSlot(queries)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
      return await this.timeSlotRepository.findOneTimeSlot(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateTimeSlotDto: UpdateTimeSlotDto) {
    try {
     return await this.timeSlotRepository.updateTimeSlot(id, updateTimeSlotDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.timeSlotRepository.removeTimeSlot(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
