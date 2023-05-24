import { Injectable } from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { CreateActivityMarkDto } from './dto/create-activity-mark.dto';
import { UpdateActivityMarkDto } from './dto/update-activity-mark.dto';
import { ActivityMarkRepository } from './activty-mark.repository';

@Injectable()
export class ActivityMarkService {
  constructor(private readonly activityMarkRepository: ActivityMarkRepository) {}

  async create(createActivityMarkDto: CreateActivityMarkDto) {
    return await this.activityMarkRepository.createActivityMark(createActivityMarkDto);
  }

  async findAll(query: ApiLimitResourceQuery) {
    return await this.activityMarkRepository.findAllActivityMark(query);
  }

  async findOne(id: string) {
    return await this.activityMarkRepository.findOneActivityMark(id);
  }

  async update(id: string, updateActivityMarkDto: UpdateActivityMarkDto) {
    return await this.activityMarkRepository.updateActivityMark(id, updateActivityMarkDto);
  }

  async remove(id: string) {
    return await this.activityMarkRepository.removeActivityMark(id);
  }
}
