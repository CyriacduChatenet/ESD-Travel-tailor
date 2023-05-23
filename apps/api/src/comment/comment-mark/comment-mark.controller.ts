import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { CommentMarkService } from './comment-mark.service';
import { CreateCommentMarkDto } from './dto/create-comment-mark.dto';
import { UpdateCommentMarkDto } from './dto/update-comment-mark.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../config/decorators/roles.decorator';
import { Role } from '../../config/enum/role.enum';

@Controller('comment-mark')
export class CommentMarkController {
  constructor(private readonly commentMarkService: CommentMarkService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
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
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  update(@Param('id') id: string, @Body() updateCommentMarkDto: UpdateCommentMarkDto) {
    return this.commentMarkService.update(id, updateCommentMarkDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  remove(@Param('id') id: string) {
    return this.commentMarkService.remove(id);
  }
}
