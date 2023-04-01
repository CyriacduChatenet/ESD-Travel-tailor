import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
import { Repository } from 'typeorm';

import { CreateActivityImageDto } from './dto/create-activity-image.dto';
import { UpdateActivityImageDto } from './dto/update-activity-image.dto';
import { ActivityImage } from './entities/activity-image.entity';

@Injectable()
export class ActivityImageService {
  constructor(
    @InjectRepository(ActivityImage)
    private activityImageRepository: Repository<ActivityImage>,
  ) {}
  async create(createActivityImageDto: CreateActivityImageDto) {
    try {
      const activityImage = await this.activityImageRepository.create(
        createActivityImageDto,
      );
      return await this.activityImageRepository.save(activityImage);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  findAll(queries: ApiLimitResourceQuery) {
    try {
      let { page, limit, sortedBy } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;

      const query = this.activityImageRepository
        .createQueryBuilder('activityImage')
        .leftJoinAndSelect('activityImage.activity', 'activity')

      if (sortedBy) {
        query.orderBy('activityImage.createdAt', sortedBy);
      } else {
        query.orderBy('activityImage.createdAt', 'DESC');
      }

      return {
        page: page,
        limit: limit,
        data: query.skip((page - 1) * limit).take(limit).getMany()
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findOne(id: string) {
    try {
      return this.activityImageRepository
        .createQueryBuilder('activityImage')
        .leftJoinAndSelect('activityImage.activity', 'activity')
        .where('activityImage.id = :id', { id })
        .getOne();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  update(id: string, updateActivityImageDto: UpdateActivityImageDto) {
    try {
      return this.activityImageRepository.update(id, updateActivityImageDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  remove(id: string) {
    try {
      return this.activityImageRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
