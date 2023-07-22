import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { CreateActivityScheduleDto } from './dto/create-activity-schedule.dto';
import { UpdateActivityScheduleDto } from './dto/update-activity-schedule.dto';
import { ActivityScheduleRepository } from './activity-schedule.repository';

@Injectable()
export class ActivityScheduleService {
  constructor(private activityScheduleRepository: ActivityScheduleRepository) {}

  async create(createActivityScheduleDto: CreateActivityScheduleDto) {
    try {
      return await this.activityScheduleRepository.createActivitySchedule(createActivityScheduleDto);
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Unauthorized to create ActivitySchedule',
        error,
      });
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return await this.activityScheduleRepository.findAllActivitySchedule(queries);
    } catch (error) {
      throw new NotFoundException({
        message: 'List of ActivitySchedule not found',
        error,
      });
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityScheduleRepository.findOneActivitySchedule(id);
    } catch (error) {
      throw new NotFoundException({
        message: `ActivitySchedule not found with id: ${id}`,
        error,
      });
    }
  }

  async update(id: string, updateActivityScheduleDto: UpdateActivityScheduleDto) {
    try {
      return await this.activityScheduleRepository.updateActivitySchedule(id, updateActivityScheduleDto);
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to update ActivitySchedule with id: ${id}`,
        error,
      });
    }
  }

  async remove(id: string) {
    try {
      return await this.activityScheduleRepository.removeActivitySchedule(id);
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to delete ActivitySchedule with id: ${id}`,
        error,
      });
    }
  }
}
