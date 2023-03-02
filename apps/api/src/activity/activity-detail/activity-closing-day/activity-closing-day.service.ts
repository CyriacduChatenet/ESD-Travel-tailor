import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateActivityClosingDayDto } from './dto/create-activity-closing-day.dto';
import { UpdateActivityClosingDayDto } from './dto/update-activity-closing-day.dto';
import { ActivityClosingDay } from './entities/activity-closing-day.entity';

@Injectable()
export class ActivityClosingDayService {
  constructor(
    @InjectRepository(ActivityClosingDay)
    private activityClosingDayRepository: Repository<ActivityClosingDay>,
  ) {}
  async create(createActivityClosingDayDto: CreateActivityClosingDayDto) {
    try {
      const activityClosingDay = await this.activityClosingDayRepository.create(
        createActivityClosingDayDto,
      );
      return await this.activityClosingDayRepository.save(activityClosingDay);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll() {
    try {
      return await this.activityClosingDayRepository
        .createQueryBuilder('activityClosingDay')
        .leftJoinAndSelect('activityClosingDay.activity', 'activity')
        .orderBy('activityClosingDay.day', 'ASC')
        .getMany();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityClosingDayRepository
        .createQueryBuilder('activityClosingDay')
        .leftJoinAndSelect('activityClosingDay.activity', 'activity')
        .where('activityClosingDay.id = :id', { id })
        .getOne();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async update(
    id: string,
    updateActivityClosingDayDto: UpdateActivityClosingDayDto,
  ) {
    try {
      return await this.activityClosingDayRepository.update(
        id,
        updateActivityClosingDayDto,
      );
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.activityClosingDayRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
