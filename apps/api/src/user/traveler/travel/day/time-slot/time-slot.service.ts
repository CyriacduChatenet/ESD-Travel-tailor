import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { CreateTimeSlotDto } from './dto/create-time-slot.dto'
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto'
import { TimeSlot } from './entities/time-slot.entity'

@Injectable()
export class TimeSlotService {
  constructor(@InjectRepository(TimeSlot) private timeSlotRepository: Repository<TimeSlot>) {}

  async create(createTimeSlotDto: CreateTimeSlotDto) {
    try {
      const timeSlot = this.timeSlotRepository.create(createTimeSlotDto);
      return await this.timeSlotRepository.save(timeSlot)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      let {} = queries;
      return await `This action returns all timeSlot`
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
      return await `This action returns a #${id} timeSlot`
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateTimeSlotDto: UpdateTimeSlotDto) {
    try {
      return await `This action updates a #${id} timeSlot`
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await `This action removes a #${id} timeSlot`
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
