import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ActivityQuery, ActivityTag } from '@travel-tailor/types'

import { CreateActivityDto } from './dto/create-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'
import { regexNormalizeSlug } from '../config/utils/regex-normalize.util'
import { UploadFileService } from '../upload-file/upload-file.service'
import { ActivityImageService } from './activity-image/activity-image.service'
import { ActivityRepository } from './activity.repository'

@Injectable()
export class ActivityService {
  constructor(
    private activityRepository: ActivityRepository,
    private readonly uploadFileService: UploadFileService,
    private readonly activityImageService: ActivityImageService,
  ) {}

  async create(createActivityDto: CreateActivityDto, user, files) {
    try {
      const activityImage = await this.activityImageService.create({});

      const uploadFile = await this.uploadFileService.create(files[0], user, activityImage);
      await this.activityImageService.update(activityImage.id, {...activityImage, uploadFile});

      const slug = regexNormalizeSlug(createActivityDto.name)

      return await this.activityRepository.createActivity(createActivityDto, activityImage, slug)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries: ActivityQuery) {
    try {
      return await this.activityRepository.findAllActivity(queries)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findAllByTags(tags: ActivityTag[]) {
    try {
    return await this.activityRepository.findAllActivityByTags(tags)
    } catch (error) {
    throw new NotFoundException(error)
    }
    }

  async findAllByAdvertiserId(advertiserId: string, page: number, limit: number) {
    try {
      return await this.activityRepository.findAllActivityByAdvertiserId(advertiserId, page, limit)
    } catch(err) {
      throw new NotFoundException(err);
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityRepository.findOneActivity(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOneByName(slug: string) {
    try {
      return await this.activityRepository.findOneActivityByName(slug)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    try {
      return await this.activityRepository.updateActivity(id, updateActivityDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.activityRepository.removeActivity(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
