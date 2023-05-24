import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { Comment } from './entities/comment.entity'
import { CommentRepository } from './comment.repository'
import { CommentMarkModule } from './comment-mark/comment-mark.module'
import { ActivityModule } from '../activity/activity.module'
import { ActivityMarkModule } from '../activity/activity-mark/activity-mark.module'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CommentMarkModule, ActivityModule, ActivityMarkModule],
  controllers: [CommentController],
  providers: [CommentRepository, CommentService],
})
export class CommentModule {}
