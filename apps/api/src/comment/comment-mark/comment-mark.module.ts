import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentMarkService } from './comment-mark.service';
import { CommentMarkController } from './comment-mark.controller';
import { CommentMarkRepository } from './comment-mark.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentMarkRepository])],
  controllers: [CommentMarkController],
  providers: [CommentMarkRepository, CommentMarkService],
  exports: [CommentMarkService],
})
export class CommentMarkModule {}
