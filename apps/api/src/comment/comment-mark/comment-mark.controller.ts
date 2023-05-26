import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { CommentMarkService } from './comment-mark.service';
import { CreateCommentMarkDto } from './dto/create-comment-mark.dto';
import { UpdateCommentMarkDto } from './dto/update-comment-mark.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../config/decorators/roles.decorator';
import { Role } from '../../config/enum/role.enum';

@Controller('comment-mark')
@UseGuards(ThrottlerGuard)
export class CommentMarkController {
  constructor(private readonly commentMarkService: CommentMarkService) {}

  @Post()
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  create(@Body() createCommentMarkDto: CreateCommentMarkDto) {
    return this.commentMarkService.create(createCommentMarkDto);
  }

  @Get()
  @Throttle(20, 60)
  findAll(@Query() query: ApiLimitResourceQuery) {
    return this.commentMarkService.findAll(query);
  }

  @Get(':id')
  @Throttle(20, 60)
  findOne(@Param('id') id: string) {
    return this.commentMarkService.findOne(id);
  }

  @Patch(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  update(@Param('id') id: string, @Body() updateCommentMarkDto: UpdateCommentMarkDto) {
    return this.commentMarkService.update(id, updateCommentMarkDto);
  }

  @Delete(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  remove(@Param('id') id: string) {
    return this.commentMarkService.remove(id);
  }
}
