import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { Comment } from './entities/comment.entity'
import { CommentRepository } from './comment.repository'
import { CommentMarkModule } from './comment-mark/comment-mark.module'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CommentMarkModule],
  controllers: [CommentController],
  providers: [CommentRepository, CommentService],
})
export class CommentModule {}
