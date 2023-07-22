import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ActivityTagQuery } from '@travel-tailor/types'

import { CreateActivityTagDto } from './dto/create-activity-tag.dto'
import { UpdateActivityTagDto } from './dto/update-activity-tag.dto'
import { ActivityTagRepository } from './activity-tag.repository'

@Injectable()
export class ActivityTagService {
  constructor(private activityTagRepository: ActivityTagRepository) {}

  async create(createActivityTagDto: CreateActivityTagDto) {
    try {
      return await this.activityTagRepository.createActivityTag(createActivityTagDto)
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Unauthorized to create activity tag',
        error
      })
    }
  }

  async findAll(queries: ActivityTagQuery) {
    try {
      return await this.activityTagRepository.findAllActivityTag(queries)
    } catch (error) {
      throw new NotFoundException({
        message: 'List of Activity tag not found',
        error
      })
    }
  }

  findOne(name: string) {
    try {
      return this.activityTagRepository.findOneActivityTag(name)
    } catch (error) {
      throw new NotFoundException({
        message: `Activity tag not found with name: ${name}`,
        error
      })
    }
  }

  async update(id: string, updateActivityTagDto: UpdateActivityTagDto) {
    try {
      return await this.activityTagRepository.updateActivityTag(id, updateActivityTagDto)
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to update activity tag with id: ${id}`,
        error
      })
    }
  }

  async remove(id: string) {
    try {
      return this.activityTagRepository.removeActivityTag(id)
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to remove activity tag with id: ${id}`,
        error
      })
    }
  }
}
