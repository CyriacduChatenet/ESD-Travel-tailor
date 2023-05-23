import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { CreateCommentMarkDto } from './dto/create-comment-mark.dto';
import { UpdateCommentMarkDto } from './dto/update-comment-mark.dto';
import { CommentMarkRepository } from './comment-mark.repository';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

@Injectable()
export class CommentMarkService {
  constructor(private readonly commentMarkRepository: CommentMarkRepository) {}

  async create(createCommentMarkDto: CreateCommentMarkDto) {
    try {
      return await this.commentMarkRepository.createCommentMark(createCommentMarkDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(query: ApiLimitResourceQuery) {
    try {
      return await this.commentMarkRepository.findAllCommentMark(query);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.commentMarkRepository.findOneCommentMark(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateCommentMarkDto: UpdateCommentMarkDto) {
    try {
      return await this.commentMarkRepository.updateCommentMark(id, updateCommentMarkDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.commentMarkRepository.removeCommentMark(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
