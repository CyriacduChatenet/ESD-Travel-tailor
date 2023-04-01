import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
import { Repository } from 'typeorm';

import { CreateActivityScheduleDto } from './dto/create-activity-schedule.dto';
import { UpdateActivityScheduleDto } from './dto/update-activity-schedule.dto';
import { ActivitySchedule } from './entities/activity-schedule.entity';

@Injectable()
export class ActivityScheduleService {
  constructor(
    @InjectRepository(ActivitySchedule)
    private activityScheduleRepository: Repository<ActivitySchedule>,
  ) {}

  async create(createActivityScheduleDto: CreateActivityScheduleDto) {
    try {
      const activitySchedule = this.activityScheduleRepository.create(
        createActivityScheduleDto,
      );
      return await this.activityScheduleRepository.save(activitySchedule);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      let { page, limit, sortedBy, opening_at, closing_at } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;

      const query = this.activityScheduleRepository
        .createQueryBuilder('activitySchedule')
        .leftJoinAndSelect('activitySchedule.activityDetail', 'activityDetail')

        if(sortedBy) {
          query.orderBy('activitySchedule.createdAt', sortedBy);
        } else {
          query.orderBy('activitySchedule.createdAt', 'DESC');
        }

        if(opening_at) {
          query.where('activitySchedule.opening_at = :opening_at', { opening_at });
        }

        if(closing_at) {
          query.where('activitySchedule.closing_at = :closing_at', { closing_at });
        }

        return {
          page: page,
          limit: limit,
          data: await query.skip((page - 1) * limit).take(limit).getMany()
        };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityScheduleRepository
        .createQueryBuilder('activitySchedule')
        .leftJoinAndSelect('activitySchedule.activityDetail', 'activityDetail')
        .where('activitySchedule.id = :id', { id })
        .getOne();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(
    id: string,
    updateActivityScheduleDto: UpdateActivityScheduleDto,
  ) {
    try {
      return await this.activityScheduleRepository.update(
        id,
        updateActivityScheduleDto,
      );
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.activityScheduleRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
