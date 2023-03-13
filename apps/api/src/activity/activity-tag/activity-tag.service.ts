import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateActivityTagDto } from './dto/create-activity-tag.dto'
import { UpdateActivityTagDto } from './dto/update-activity-tag.dto'
import { ActivityTag } from './entities/activity-tag.entity'

@Injectable()
export class ActivityTagService {
  constructor(
    @InjectRepository(ActivityTag)
    private activityTagRepository: Repository<ActivityTag>
  ) {}

  async create(createActivityTagDto: CreateActivityTagDto) {
    try {
      const activityTag = await this.activityTagRepository.create(
        createActivityTagDto
      )
      return await this.activityTagRepository.save(activityTag)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll() {
    try {
      return this.activityTagRepository
        .createQueryBuilder('activityTag')
        .leftJoinAndSelect('activityTag.activities', 'activity')
        .getMany()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  findOne(name: string) {
    try {
      return this.activityTagRepository
        .createQueryBuilder('activityTag')
        .leftJoinAndSelect('tag.activities', 'activity')
        .where('activityTag.name = :name', { name })
        .getOne()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateActivityTagDto: UpdateActivityTagDto) {
    try {
      const tag = await this.activityTagRepository.findOneBy({ id })

      tag.name = updateActivityTagDto.name
      tag.activities = updateActivityTagDto.activities

      return await this.activityTagRepository.save(tag)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  remove(id: string) {
    try {
      return this.activityTagRepository.softDelete(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
