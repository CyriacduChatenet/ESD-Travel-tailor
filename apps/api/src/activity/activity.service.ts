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
        .leftJoinAndSelect('activity.tags', 'tag')
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
        .leftJoinAndSelect('activity.tags', 'tag')
        .where('activity.id = :id', { id })
        .getOne()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    try {
      const activity = await this.activityRepository
        .createQueryBuilder('activity')
        .leftJoinAndSelect('activity.detail', 'detail')
        .leftJoinAndSelect('activity.image', 'image')
        .leftJoinAndSelect('activity.comments', 'comments')
        .leftJoinAndSelect('activity.travels', 'travels')
        .leftJoinAndSelect('activity.advertiser', 'advertiser')
        .leftJoinAndSelect('activity.tags', 'tags')
        .where('activity.id = :id', { id })
        .getOne();

        activity.name = updateActivityDto?.name;
        activity.image.source = updateActivityDto?.image.source;
        activity.detail.duration = updateActivityDto?.detail.duration;
        activity.detail.location = updateActivityDto?.detail.location;
        activity.comments = updateActivityDto?.comments;
        activity.travels = updateActivityDto?.travels;
        activity.advertiser = updateActivityDto?.advertiser;
        activity.tags = updateActivityDto?.tags;

        return this.activityRepository.save(activity);
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
