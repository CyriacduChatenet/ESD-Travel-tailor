import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      const activitySchedule = await this.activityScheduleRepository.create(
        createActivityScheduleDto,
      );
      return await this.activityScheduleRepository.save(activitySchedule);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll() {
    try {
      return await this.activityScheduleRepository
        .createQueryBuilder('activitySchedule')
        .leftJoinAndSelect('activitySchedule.activities', 'activities')
        .orderBy('activitySchedule.opening_at', 'ASC')
        .getMany();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityScheduleRepository
        .createQueryBuilder('activitySchedule')
        .leftJoinAndSelect('activitySchedule.activities', 'activities')
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
