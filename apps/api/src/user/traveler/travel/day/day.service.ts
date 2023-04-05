import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'

import { CreateDayDto } from './dto/create-day.dto'
import { UpdateDayDto } from './dto/update-day.dto'
import { Day } from './entities/day.entity'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

@Injectable()
export class DayService {
  constructor(@InjectRepository(Day) private dayRepository: Repository<Day>) {}

  async create(createDayDto: CreateDayDto) {
    try {
      const day = this.dayRepository.create(createDayDto)
      return await this.dayRepository.save(day)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      let { page, limit, sortedBy, startTime, endTime, date } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;

      const query = this.dayRepository.createQueryBuilder('day')
      .leftJoinAndSelect('day.travel', 'travel')
      .leftJoinAndSelect('day.timeSlots', 'timeSlots')

      if(sortedBy) {
        query.orderBy('day.createdAt', sortedBy)
      } else {
        query.orderBy('day.createdAt', 'DESC')
      }

      if(startTime) {
        query.andWhere('day.startTime = :startTime', { startTime })
      }

      if(endTime) {
        query.andWhere('day.endTime = :endTime', { endTime })
      }

      if(date) {
        query.andWhere('day.date = :date', { date })
      }

      return {
        page: page,
        limit: limit,
        total: await query.getCount(),
        data: await query.getMany(),
      }
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
      return await this.dayRepository.createQueryBuilder('day')
      .leftJoinAndSelect('day.travel', 'travel')
      .leftJoinAndSelect('day.timeSlots', 'timeSlots')
      .where('day.id = :id', { id })
      .getOne()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateDayDto: UpdateDayDto) {
    try {
      return await this.dayRepository.update(id, updateDayDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.dayRepository.softDelete(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
