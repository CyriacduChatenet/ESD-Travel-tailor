import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ApiLimitResourceQuery } from '@travel-tailor/types'
import { Repository } from 'typeorm'

import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Comment } from './entities/comment.entity'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    try {
      return await this.commentRepository.save(createCommentDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      let { page, limit } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;

      return await this.commentRepository
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.traveler', 'traveler')
        .leftJoinAndSelect('comment.activity', 'activity')
        .orderBy('comment.createdAt', 'DESC')
        .skip((page - 1) * limit)
        .take(limit)
        .getMany()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
      return await this.commentRepository
        .createQueryBuilder('comment')
        .where('comment.id = :id', { id })
        .leftJoinAndSelect('comment.traveler', 'traveler')
        .leftJoinAndSelect('comment.activity', 'activity')
        .getOne()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      return this.commentRepository.update(id, updateCommentDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.commentRepository.softDelete(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
