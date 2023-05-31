import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common'
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Role } from '../config/enum/role.enum'
import { Roles } from '../config/decorators/roles.decorator'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('comment')
@UseGuards(ThrottlerGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @Throttle(100, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  create(@Body() createCommentDto: CreateCommentDto, @Body('activity') activity: string) {
    return this.commentService.create(createCommentDto, activity)
  }

  @Get()
  @Throttle(100, 60)
  findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.commentService.findAll(queries)
  }

  @Get('/activity/:id')
  @Throttle(100, 60)
  findAllByActivityId(@Query() queries: ApiLimitResourceQuery, @Param('id') activityId: string) {
    return this.commentService.findAllByActivityId(queries, activityId)
  }

  @Get(':id')
  @Throttle(100, 60)
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id)
  }

  @Patch(':id')
  @Throttle(100, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto)
  }

  @Delete(':id')
  @Throttle(100, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  remove(@Param('id') id: string) {
    return this.commentService.remove(id)
  }
}
