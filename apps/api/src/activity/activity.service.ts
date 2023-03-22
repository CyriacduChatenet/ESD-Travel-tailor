import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ActivityQuery } from '@travel-tailor/types'

import { CreateActivityDto } from './dto/create-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'
import { Activity } from './entities/activity.entity'
import { regexNormalize } from '../utils/regex-normalize.util'

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>
  ) {}
  async create(createActivityDto: CreateActivityDto) {
    try {
      const activity = this.activityRepository.create({
        ...createActivityDto,
        slug: regexNormalize(createActivityDto.name.toLowerCase()),
      })
      return this.activityRepository.save(activity)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries: ActivityQuery) {
    try {
      let { tags, limit, page, sortedBy, name, location, duration, opening_at, closing_at } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;

      let query = this.activityRepository
        .createQueryBuilder('activity')
        .leftJoinAndSelect('activity.detail', 'detail')
        .leftJoinAndSelect('activity.image', 'image')
        .leftJoinAndSelect('activity.comments', 'comments')
        .leftJoinAndSelect('activity.travels', 'travels')
        .leftJoinAndSelect('activity.advertiser', 'advertiser')
        .leftJoinAndSelect('activity.tags', 'tag')
        .innerJoinAndSelect("detail.schedules", "schedules")
        .innerJoinAndSelect("detail.closingDays", "closingDays")
  
      if (tags) {
        const tagList = tags.split(',').map(tag => tag.trim());
        query = query.andWhere('tag.name IN (:...tags)', { tags: tagList });
      }

      if(sortedBy) {
        query.orderBy('activity.createdAt', sortedBy)
      }
      if(name) {
        query.andWhere('activity.name = :name', { name })
      }

      if(location) {
        query.andWhere('detail.location = :location', { location })
      }
      if(duration) {
        query.andWhere('detail.duration = :duration', { duration })
      }

      if(opening_at) {
        query.andWhere("schedules.opening_at <= :opening_at", { opening_at })
      }
      if(closing_at) {
        query.andWhere("schedules.closing_at <= :closing_at", { closing_at })
      }
  
      const activities = await query.skip((page - 1) * limit).take(limit).getMany();
      return activities;
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

  async findOneByName(slug: string) {
    try {
      return await this.activityRepository
        .createQueryBuilder('activity')
        .leftJoinAndSelect('activity.detail', 'detail')
        .leftJoinAndSelect('activity.image', 'image')
        .leftJoinAndSelect('activity.comments', 'comments')
        .leftJoinAndSelect('activity.travels', 'travels')
        .leftJoinAndSelect('activity.advertiser', 'advertiser')
        .leftJoinAndSelect('activity.tags', 'tag')
        .where('activity.slug = :slug', { slug })
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
        .getOne()

      activity.name = updateActivityDto?.name
      activity.image.source = updateActivityDto?.image.source
      activity.detail.duration = updateActivityDto?.detail.duration
      activity.detail.location = updateActivityDto?.detail.location
      activity.comments = updateActivityDto?.comments
      activity.travels = updateActivityDto?.travels
      activity.advertiser = updateActivityDto?.advertiser
      activity.tags = updateActivityDto?.tags

      return this.activityRepository.save(activity)
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
