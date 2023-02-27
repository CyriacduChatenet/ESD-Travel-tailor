import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}
  async create(createActivityDto: CreateActivityDto) {
    try {
      return await this.activityRepository.save(createActivityDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll() {
    try {
      return await this.activityRepository.find({
        relations: {
          travel: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityRepository.findOne({
        where: { id },
        relations: {
          travel: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    try {
      return this.activityRepository.update(id, updateActivityDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.activityRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
