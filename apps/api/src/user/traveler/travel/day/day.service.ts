import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'

import { CreateDayDto } from './dto/create-day.dto'
import { UpdateDayDto } from './dto/update-day.dto'
import { ApiLimitResourceQuery } from '@travel-tailor/types'
import { DayRepository } from './day.repository'
import { Day } from './entities/day.entity'

@Injectable()
export class DayService {
  constructor(private readonly dayRepository: DayRepository) {}

  async create(createDayDto: CreateDayDto) {
    try {
      return await this.dayRepository.createDay(createDayDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
     return await this.dayRepository.findAllDay(queries)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
     return await this.dayRepository.findOneDay(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findByTravelId(travelId: string): Promise<Day[]> {
    try {
      return await this.dayRepository.findByTravelId(travelId);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateDayDto: UpdateDayDto) {
    try {
      return await this.dayRepository.updateDay(id, updateDayDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.dayRepository.removeDay(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
