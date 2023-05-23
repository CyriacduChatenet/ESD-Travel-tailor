import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { CreateActivityClosingDayDto } from './dto/create-activity-closing-day.dto';
import { UpdateActivityClosingDayDto } from './dto/update-activity-closing-day.dto';
import { ActivityClosingDayRepository } from './activity-closing-day.repository';

@Injectable()
export class ActivityClosingDayService {
  constructor(private activityClosingDayRepository: ActivityClosingDayRepository) {}

  async create(createActivityClosingDayDto: CreateActivityClosingDayDto) {
    try {
      return await this.activityClosingDayRepository.createActivityClosingDay(createActivityClosingDayDto)
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return await this.activityClosingDayRepository.findAllActivityClosingDay(queries);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityClosingDayRepository.findOneActivityClosingDay(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async update(id: string, updateActivityClosingDayDto: UpdateActivityClosingDayDto) {
    try {
      return await this.activityClosingDayRepository.updateActivityClosingDay(id, updateActivityClosingDayDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.activityClosingDayRepository.removeActivityClosingDay(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
