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
      let { page, limit, sortedBy } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;

      const query = this.timeSlotRepository.createQueryBuilder('timeSlot')
      .leftJoinAndSelect('timeSlot.day', 'day')
      .leftJoinAndSelect('timeSlot.activity', 'activity')

      if(sortedBy) {
        query.orderBy('timeSlot.createdAt', sortedBy)
      } else {
        query.orderBy('timeSlot.createdAt', 'DESC')
      }

      return {
        page: page,
        limit: limit,
        total: await query.getCount(),
        data: await query.skip((page - 1) * limit).take(limit).getMany(),
      }
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
      return await this.timeSlotRepository.createQueryBuilder('timeSlot')
      .leftJoinAndSelect('timeSlot.day', 'day')
      .leftJoinAndSelect('timeSlot.activity', 'activity')
      .where('timeSlot.id = :id', { id })
      .getOne()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateTimeSlotDto: UpdateTimeSlotDto) {
    try {
      return await this.timeSlotRepository.update(id, updateTimeSlotDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.timeSlotRepository.softDelete(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
