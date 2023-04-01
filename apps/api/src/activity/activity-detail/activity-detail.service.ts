import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
import { Repository } from 'typeorm';

import { CreateActivityDetailDto } from './dto/create-activity-detail.dto';
import { UpdateActivityDetailDto } from './dto/update-activity-detail.dto';
import { ActivityDetail } from './entities/activity-detail.entity';

@Injectable()
export class ActivityDetailService {
  constructor(
    @InjectRepository(ActivityDetail)
    private activityDetailRepository: Repository<ActivityDetail>,
  ) {}

  async create(createActivityDetailDto: CreateActivityDetailDto) {
    const activityDetail = this.activityDetailRepository.create(
      createActivityDetailDto,
    );
    return await this.activityDetailRepository.save(activityDetail);
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      let { page, limit, sortedBy, duration, location } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;

      const query = this.activityDetailRepository
        .createQueryBuilder('activityDetail')
        .leftJoinAndSelect('activityDetail.activity', 'activity')
        .leftJoinAndSelect('activityDetail.schedules', 'activitySchedule')
        .leftJoinAndSelect('activityDetail.closingDays', 'activityClosingDay')

      if (sortedBy) {
        query.orderBy('activityDetail.createdAt', sortedBy);
      } else {
        query.orderBy('activityDetail.createdAt', 'DESC');
      }

      if (duration) {
        query.andWhere('activityDetail.duration = :duration', { duration });
      }

      if (location) {
        query.andWhere('activityDetail.location = :location', { location });
      }

      return {
        page: page,
        limit: limit,
        total: await query.getCount(),
        data: await query.skip((page - 1) * limit).take(limit).getMany(),
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityDetailRepository
        .createQueryBuilder('activityDetail')
        .leftJoinAndSelect('activityDetail.activity', 'activity')
        .leftJoinAndSelect('activityDetail.schedules', 'activitySchedule')
        .leftJoinAndSelect('activityDetail.closingDays', 'activityClosingDay')
        .where('activityDetail.id = :id', { id })
        .getOne();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateActivityDetailDto: UpdateActivityDetailDto) {
    try {
      return await this.activityDetailRepository.update(
        id,
        updateActivityDetailDto,
      );
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.activityDetailRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
