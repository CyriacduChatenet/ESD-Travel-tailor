import { Injectable } from '@nestjs/common';
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
    return await this.activityRepository.save(createActivityDto);
  }

  async findAll() {
    return await this.activityRepository.find({
      relations: {
        travel: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.activityRepository.findOne({
      where: { id },
      relations: {
        travel: true,
      },
    });
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    return this.activityRepository.update(id, updateActivityDto);
  }

  async remove(id: string) {
    return await this.activityRepository.softDelete(id);
  }
}
