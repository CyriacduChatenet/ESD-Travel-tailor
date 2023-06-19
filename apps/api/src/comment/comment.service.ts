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
import { Comment } from './entities/comment.entity'
import { CommentMark } from './comment-mark/entities/comment-mark.entity'
import { ActivityMarkService } from '../activity/activity-mark/activity-mark.service'
import { ActivityService } from '../activity/activity.service'

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly commentMarkService: CommentMarkService,
    private readonly activityMarkService: ActivityMarkService,
    private readonly activityService: ActivityService) { }

  async create(createCommentDto: CreateCommentDto, activityId: string) {
    try {
      const commentMarks = await this.commentMarkService.create(createCommentDto.marks)
      const comment = await this.commentRepository.createComment(createCommentDto, commentMarks)

      const activity = await this.activityService.findOne(activityId);
      activity.comments.push(comment);

      const commentsAndTotal = await this.extractCommentMarks(activityId)
      const marks = await this.activityMarkService.calculateActivityMarks(commentsAndTotal)

      await this.activityService.update(activityId, {
        description: activity.description,
        comments: activity.comments, 
        marks: { 
          rentability: Number(marks.place), 
          place: Number(marks.place), 
          waiting: Number(marks.waiting), 
          explanation: Number(marks.explanation), 
          arrival: Number(marks.arrival), 
          global: Number(marks.global)
        }});

      return comment
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

  async findAllByActivityId(queries: ApiLimitResourceQuery, activityId: string) {
    try {
      return await this.commentRepository.findAllCommentByActivityId(queries, activityId)
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

  private async findComments(activityId: string) {
    const commentList: Comment[] = []
    const commentsFirstPage = await this.findAllByActivityId({ limit: 10, page: 1 }, activityId)
    const totalPage = Math.ceil(commentsFirstPage.total / 10)

    for (let i = 0; i < totalPage; i++) {
      const comments = await this.findAllByActivityId({ limit: 10, page: i + 1 }, activityId)
      commentList.push(...comments.data)
    }

    return commentList;
  }

  private async extractCommentMarks(activityId: string) {
    const comments: Comment[] = await this.findComments(activityId)
    const totalComments = comments.length;

    const commentMarks: CommentMark[] = []

    comments.filter((comment: Comment) => comment.marks !== null).forEach((comment: Comment) => {
      commentMarks.push(comment.marks)
    })

    return { commentMarks, totalComments }
  };
}
