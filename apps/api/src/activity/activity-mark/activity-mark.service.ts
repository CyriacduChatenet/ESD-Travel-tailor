import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { CreateActivityMarkDto } from './dto/create-activity-mark.dto'
import { UpdateActivityMarkDto } from './dto/update-activity-mark.dto'
import { ActivityMarkRepository } from './activty-mark.repository'
import { CommentMark } from '../../comment/comment-mark/entities/comment-mark.entity'

@Injectable()
export class ActivityMarkService {
  constructor(
    private readonly activityMarkRepository: ActivityMarkRepository
  ) {}

  async create(createActivityMarkDto: CreateActivityMarkDto) {
    try {
      return await this.activityMarkRepository.createActivityMark(
        createActivityMarkDto
      )
    } catch (err) {
      throw new UnauthorizedException({
        message: 'Unauthorized to create ActivityMark',
        err,
      })
    }
  }

  async findAll(query: ApiLimitResourceQuery) {
    try {
      return await this.activityMarkRepository.findAllActivityMark(query)
    } catch (error) {
      throw new NotFoundException({
        message: 'List of ActivityMark not found',
        error,
      })
    }
  }

  async findOne(id: string) {
    try {
      return await this.activityMarkRepository.findOneActivityMark(id)
    } catch (error) {
      throw new NotFoundException({
        message: `ActivityMark not found with id: ${id}`,
        error,
      })
    }
  }

  async update(id: string, updateActivityMarkDto: UpdateActivityMarkDto) {
    try {
      return await this.activityMarkRepository.updateActivityMark(
        id,
        updateActivityMarkDto
      )
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to update ActivityMark with id: ${id}`,
        error,
      })
    }
  }

  async remove(id: string) {
    try {
      return await this.activityMarkRepository.removeActivityMark(id)
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to remove ActivityMark with id: ${id}`,
        error,
      })
    }
  }

  async calculateActivityMarks({
    commentMarks,
    totalComments,
  }: {
    commentMarks: CommentMark[]
    totalComments: number
  }) {
    const rentability =
      commentMarks.reduce(
        (acc, commentMark) => acc + commentMark.rentability,
        0
      ) / totalComments
    const place =
      commentMarks.reduce((acc, commentMark) => acc + commentMark.place, 0) /
      totalComments
    const waiting =
      commentMarks.reduce((acc, commentMark) => acc + commentMark.waiting, 0) /
      totalComments
    const explanation =
      commentMarks.reduce(
        (acc, commentMark) => acc + commentMark.explanation,
        0
      ) / totalComments
    const arrival =
      commentMarks.reduce((acc, commentMark) => acc + commentMark.arrival, 0) /
      totalComments

    const global = (rentability + place + waiting + explanation + arrival) / 5

    const activityMarks = {
      global: global.toFixed(1),
      rentability: rentability.toFixed(1),
      place: place.toFixed(1),
      waiting: waiting.toFixed(1),
      explanation: explanation.toFixed(1),
      arrival: arrival.toFixed(1),
    }

    return activityMarks
  }
}
