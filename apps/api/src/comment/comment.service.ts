import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { CommentRepository } from './comment.repository'
import { CommentMarkService } from './comment-mark/comment-mark.service'

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository, private readonly commentMarkService: CommentMarkService) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const commentMarks = await this.commentMarkService.create(createCommentDto.marks)
      return await this.commentRepository.createComment(createCommentDto, commentMarks)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
     return await this.commentRepository.findAllComment(queries)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
      return await this.commentRepository.findOneComment(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      return this.commentRepository.updateComment(id, updateCommentDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.commentRepository.removeComment(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
