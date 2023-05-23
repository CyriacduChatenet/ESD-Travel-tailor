import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { CreateActivityDetailDto } from './dto/create-activity-detail.dto';
import { UpdateActivityDetailDto } from './dto/update-activity-detail.dto';
import { ActivityDetailRepository } from './activity-detail.repository';

@Injectable()
export class ActivityDetailService {
  constructor(private readonly activityDetailRepository: ActivityDetailRepository) { }

  async create(createActivityDetailDto: CreateActivityDetailDto) {
    try {
      return await this.activityDetailRepository.createActivityDetail(createActivityDetailDto)
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return await this.activityDetailRepository.findAllActivityDetail(queries);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityDetailRepository.findOneActivityDetail(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateActivityDetailDto: UpdateActivityDetailDto) {
    try {
      return await this.activityDetailRepository.updateActivityDetail(id, updateActivityDetailDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.activityDetailRepository.removeActivityDetail(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
