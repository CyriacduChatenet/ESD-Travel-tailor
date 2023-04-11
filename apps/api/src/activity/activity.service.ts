import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ActivityImage as ImageType, ActivityQuery, ActivityTag } from '@travel-tailor/types'

import { CreateActivityDto } from './dto/create-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'
import { Activity } from './entities/activity.entity'
import { regexNormalizeSlug } from '../config/utils/regex-normalize.util'
import { UploadFileService } from '../upload-file/upload-file.service'
import { ActivityImageService } from './activity-image/activity-image.service'

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    private readonly uploadFileService: UploadFileService,
    private readonly activityImageService: ActivityImageService,
  ) {}

  async create(createActivityDto: CreateActivityDto, user, files) {
    try {
      const activityImage = await this.activityImageService.create({});

      const uploadFile = await this.uploadFileService.create(files[0], user, activityImage);
      console.log(uploadFile);
      await this.activityImageService.update(activityImage.id, {...activityImage, uploadFile});


      const activity = this.activityRepository.create({
        ...createActivityDto,
        image: activityImage,
        slug: regexNormalizeSlug(createActivityDto.name.toLowerCase()),
      })
      return this.activityRepository.save(activity)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries: ActivityQuery) {
    try {
      let { limit, page, sortedBy, name, tags, location, duration, closed_day, opening_at, closing_at, mark } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;

      let query = this.activityRepository
        .createQueryBuilder('activity')
        .leftJoinAndSelect('activity.image', 'image')
        .leftJoinAndSelect('image.uploadFile', 'uploadFile')
        .leftJoinAndSelect('activity.comments', 'comments')
        .leftJoinAndSelect('activity.advertiser', 'advertiser')
        .leftJoinAndSelect('activity.tags', 'tag')
        .leftJoinAndSelect('activity.timeSlots', 'timeSlot')
        .leftJoinAndSelect('activity.detail', 'detail')
        .leftJoinAndSelect("detail.closingDays", "closingDay")
        .leftJoinAndSelect("detail.schedules", "schedule")  
  
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

      if(mark) {
        query.andWhere('activity.mark = :mark', { mark })
      }
        
      if (closed_day) {
        const closedDaysList = tags.split(',').map(closingDay => closingDay.trim());
        query = query.andWhere('closingDay.date IN (:...closingDays)', { closingDays: closedDaysList });
      }

      if(opening_at) {
        query.andWhere('schedule.opening_at = :opening_at', { opening_at })
      }

      if(closing_at) {
        query.andWhere('schedule.closing_at = :closing_at', { closing_at })
      }

      return {
        page: page,
        limit: limit,
        total: await query.getCount(),
        data: await query.skip((page - 1) * limit).take(limit).getMany()
      }
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findAllByTags(tags: ActivityTag[]) {
    try {
    return await this.activityRepository
    .createQueryBuilder('activity')
    .leftJoinAndSelect('activity.image', 'image')
    .leftJoinAndSelect('image.uploadFile', 'uploadFile')
    .leftJoinAndSelect('activity.comments', 'comments')
    .leftJoinAndSelect('activity.advertiser', 'advertiser')
    .leftJoinAndSelect('activity.tags', 'tag')
    .leftJoinAndSelect('activity.timeSlots', 'timeSlot')
    .leftJoinAndSelect('activity.detail', 'detail')
    .leftJoinAndSelect("detail.closingDays", "closingDay")
    .leftJoinAndSelect("detail.schedules", "schedule")
    .andWhere('tag.name IN (:...tags)', { tags })
    .getMany()
    } catch (error) {
    throw new NotFoundException(error)
    }
    }

  async findOne(id: string) {
    try {
      return await this.activityRepository
        .createQueryBuilder('activity')
        .leftJoinAndSelect('activity.image', 'image')
        .leftJoinAndSelect('image.uploadFile', 'uploadFile')
        .leftJoinAndSelect('activity.comments', 'comments')
        .leftJoinAndSelect('activity.advertiser', 'advertiser')
        .leftJoinAndSelect('activity.tags', 'tag')
        .leftJoinAndSelect('activity.timeSlots', 'timeSlot')
        .leftJoinAndSelect('activity.detail', 'detail')
        .leftJoinAndSelect("detail.closingDays", "closingDay")
        .leftJoinAndSelect("detail.schedules", "schedule")
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
        .leftJoinAndSelect('activity.image', 'image')
        .leftJoinAndSelect('image.uploadFile', 'uploadFile')
        .leftJoinAndSelect('activity.comments', 'comments')
        .leftJoinAndSelect('activity.advertiser', 'advertiser')
        .leftJoinAndSelect('activity.tags', 'tag')
        .leftJoinAndSelect('activity.timeSlots', 'timeSlot')
        .leftJoinAndSelect('activity.detail', 'detail')
        .leftJoinAndSelect("detail.closingDays", "closingDay")
        .leftJoinAndSelect("detail.schedules", "schedule")
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
        .leftJoinAndSelect('image.uploadFile', 'uploadFile')
        .leftJoinAndSelect('activity.comments', 'comments')
        .leftJoinAndSelect('activity.advertiser', 'advertiser')
        .leftJoinAndSelect('activity.timeSlots', 'timeSlot')
        .leftJoinAndSelect('activity.tags', 'tags')
        .where('activity.id = :id', { id })
        .getOne()
      
      if(!activity) throw new NotFoundException('Activity not found')

      if(updateActivityDto?.detail && updateActivityDto?.detail?.closingDays) {
        activity.detail.closingDays = updateActivityDto?.detail.closingDays
      }

      if(updateActivityDto?.detail && updateActivityDto?.detail?.schedules) {
        activity.detail.schedules = updateActivityDto?.detail.schedules
      }

      if(updateActivityDto?.timeSlots) {
        activity.timeSlots = updateActivityDto?.timeSlots
      }

      if(updateActivityDto?.name) {
        activity.name = updateActivityDto?.name
      }

      if(updateActivityDto?.mark) {
        activity.mark = updateActivityDto?.mark
      }

      if(updateActivityDto?.image && updateActivityDto.image.uploadFile){
        activity.image.uploadFile = updateActivityDto.image.uploadFile
      }

      if(updateActivityDto?.detail && updateActivityDto?.detail.duration){
        activity.detail.duration = updateActivityDto?.detail.duration
      }

      if(updateActivityDto?.detail && updateActivityDto?.detail.location){
        activity.detail.location = updateActivityDto?.detail.location
      }

      if(updateActivityDto?.comments){
        activity.comments = updateActivityDto?.comments
      }

      if(updateActivityDto?.advertiser){
        activity.advertiser = updateActivityDto?.advertiser
      }

      if(updateActivityDto?.tags){
        activity.tags = updateActivityDto?.tags
      }

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
