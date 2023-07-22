import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { CreateActivityImageDto } from './dto/create-activity-image.dto';
import { UpdateActivityImageDto } from './dto/update-activity-image.dto';
import { ActivityImageRepository } from './activity-image.repository';

@Injectable()
export class ActivityImageService {
  constructor(private readonly activityImageRepository: ActivityImageRepository) {}

  async create(createActivityImageDto: CreateActivityImageDto) {
    try {
      return await this.activityImageRepository.createActivityImage(createActivityImageDto);
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Unauthorized to create ActivityImage',
        error,
      });
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return await this.activityImageRepository.findAllActivityImage(queries);
    } catch (error) {
      throw new NotFoundException({
        message: 'List of ActivityImage not found',
        error,
      });
    }
  }

  findOne(id: string) {
    try {
      return this.activityImageRepository.findOneActivityImage(id);
    } catch (error) {
      throw new NotFoundException({
        message: `ActivityImage not found with id: ${id}`,
        error,
      });
    }
  }

  update(id: string, updateActivityImageDto: UpdateActivityImageDto) {
    try {
      return this.activityImageRepository.updateActivityImage(id, updateActivityImageDto);
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to update ActivityImage with id: ${id}`,
        error,
      });
    }
  }

  remove(id: string) {
    try {
      return this.activityImageRepository.removeActivityImage(id);
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to remove ActivityImage with id: ${id}`,
        error,
      });
    }
  }
}
