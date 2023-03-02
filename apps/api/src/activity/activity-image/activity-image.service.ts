import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  findAll() {
    try {
      return this.activityImageRepository
        .createQueryBuilder('activityImage')
        .leftJoinAndSelect('activityImage.activity', 'activity')
        .orderBy('activityImage.id', 'DESC')
        .getMany();
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
