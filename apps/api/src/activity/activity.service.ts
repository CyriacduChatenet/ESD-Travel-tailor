import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ActivityTagService } from './activity-tag/activity-tag.service'

import { CreateActivityDto } from './dto/create-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'
import { Activity } from './entities/activity.entity'

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    private activityTagService: ActivityTagService,
  ) {}
  async create(createActivityDto: CreateActivityDto) {
    try {
      const activity = this.activityRepository.create(createActivityDto)
      return this.activityRepository.save(activity)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll() {
    try {
      return await this.activityRepository
        .createQueryBuilder('activity')
        .leftJoinAndSelect('activity.detail', 'detail')
        .leftJoinAndSelect('activity.image', 'image')
        .leftJoinAndSelect('activity.comments', 'comments')
        .leftJoinAndSelect('activity.travels', 'travels')
        .leftJoinAndSelect('activity.advertiser', 'advertiser')
        .orderBy('activity.createdAt', 'DESC')
        .getMany()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityRepository
        .createQueryBuilder('activity')
        .leftJoinAndSelect('activity.detail', 'detail')
        .leftJoinAndSelect('activity.image', 'image')
        .leftJoinAndSelect('activity.comments', 'comments')
        .leftJoinAndSelect('activity.travels', 'travels')
        .leftJoinAndSelect('activity.advertiser', 'advertiser')
        .where('activity.id = :id', { id })
        .getOne()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    try {
      return this.activityRepository.update(id, updateActivityDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.activityRepository.softDelete(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
