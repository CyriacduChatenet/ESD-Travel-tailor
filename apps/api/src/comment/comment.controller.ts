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
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../config/enum/role.enum';
import { Roles } from '../config/decorators/roles.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
@UseGuards(ThrottlerGuard)
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Comment created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to create comment' })
  create(@Body() createCommentDto: CreateCommentDto, @Body('activity') activity: string) {
    return this.commentService.create(createCommentDto, activity);
  }

  @Get()
  @ApiCreatedResponse({ description: 'Comments found successfully' })
  @ApiNotFoundResponse({ description: 'List of comments not found' })
  @Throttle(1000, 60)// Assuming you have defined this decorator to document the query parameters
  findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.commentService.findAll(queries);
  }

  @Get('/activity/:id')
  @ApiCreatedResponse({ description: 'Comments found successfully' })
  @ApiNotFoundResponse({ description: 'List of comments not found' })
  @Throttle(1000, 60)// Assuming you have defined this decorator to document the query parameters
  findAllByActivityId(@Query() queries: ApiLimitResourceQuery, @Param('id') activityId: string) {
    return this.commentService.findAllByActivityId(queries, activityId);
  }

  @Get(':id')
  @Throttle(1000, 60)
  @ApiCreatedResponse({ description: 'Comment found successfully' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Comment updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to update comment' })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Comment deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to delete comment' })
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
