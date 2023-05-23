import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentMarkService } from './comment-mark.service';
import { CreateCommentMarkDto } from './dto/create-comment-mark.dto';
import { UpdateCommentMarkDto } from './dto/update-comment-mark.dto';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

@Controller('comment-mark')
export class CommentMarkController {
  constructor(private readonly commentMarkService: CommentMarkService) {}

  @Post()
  create(@Body() createCommentMarkDto: CreateCommentMarkDto) {
    return this.commentMarkService.create(createCommentMarkDto);
  }

  @Get()
  findAll(@Query() query: ApiLimitResourceQuery) {
    return this.commentMarkService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentMarkService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentMarkDto: UpdateCommentMarkDto) {
    return this.commentMarkService.update(id, updateCommentMarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentMarkService.remove(id);
  }
}
