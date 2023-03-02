import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const activityDetail = await this.activityDetailRepository.create(
      createActivityDetailDto,
    );
    return await this.activityDetailRepository.save(activityDetail);
  }

  async findAll() {
    try {
      return await this.activityDetailRepository
        .createQueryBuilder('activityDetail')
        .leftJoinAndSelect('activityDetail.activity', 'activity')
        .orderBy('activityDetail.id', 'DESC')
        .getMany();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityDetailRepository
        .createQueryBuilder('activityDetail')
        .leftJoinAndSelect('activityDetail.activity', 'activity')
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
