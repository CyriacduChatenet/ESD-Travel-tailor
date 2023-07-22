import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { CommentMarkService } from './comment-mark.service';
import { CreateCommentMarkDto } from './dto/create-comment-mark.dto';
import { UpdateCommentMarkDto } from './dto/update-comment-mark.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../config/decorators/roles.decorator';
import { Role } from '../../config/enum/role.enum';

@Controller('comment-mark')
@UseGuards(ThrottlerGuard)
@ApiTags('Comment Marks')
export class CommentMarkController {
  constructor(private readonly commentMarkService: CommentMarkService) {}

  @Post()
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Comment mark created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to create comment mark' })
  create(@Body() createCommentMarkDto: CreateCommentMarkDto) {
    return this.commentMarkService.create(createCommentMarkDto);
  }

  @Get()
  @Throttle(1000, 60)
  @ApiCreatedResponse({ description: 'Comments mark found successfully' })
  @ApiNotFoundResponse({ description: 'List of comments mark not found' })
  findAll(@Query() query: ApiLimitResourceQuery) {
    return this.commentMarkService.findAll(query);
  }

  @Get(':id')
  @Throttle(1000, 60)
  @ApiCreatedResponse({ description: 'Comment mark found successfully' })
  @ApiNotFoundResponse({ description: 'Comment mark not found' })
  findOne(@Param('id') id: string) {
    return this.commentMarkService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Comment mark updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to update comment mark' })
  update(@Param('id') id: string, @Body() updateCommentMarkDto: UpdateCommentMarkDto) {
    return this.commentMarkService.update(id, updateCommentMarkDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Comment mark deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to delete comment mark' })
  remove(@Param('id') id: string) {
    return this.commentMarkService.remove(id);
  }
}
