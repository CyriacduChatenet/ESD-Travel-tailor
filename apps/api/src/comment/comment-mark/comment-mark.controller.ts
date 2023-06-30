import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger';
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
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  create(@Body() createCommentMarkDto: CreateCommentMarkDto) {
    return this.commentMarkService.create(createCommentMarkDto);
  }

  @Get()
  @Throttle(1000, 60)
  @ApiCreatedResponse({ description: 'Comments mark found successfully' })
  @ApiNotFoundResponse({ description: 'Invalid input data' })
  // Assuming you have defined this decorator to document the query parameters
  findAll(@Query() query: ApiLimitResourceQuery) {
    return this.commentMarkService.findAll(query);
  }

  @Get(':id')
  @Throttle(1000, 60)
  @ApiCreatedResponse({ description: 'Comment mark found successfully' })
  @ApiBadRequestResponse({ description: 'Invalid comment mark ID' })
  findOne(@Param('id') id: string) {
    return this.commentMarkService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Comment mark updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data or comment mark ID' })
  update(@Param('id') id: string, @Body() updateCommentMarkDto: UpdateCommentMarkDto) {
    return this.commentMarkService.update(id, updateCommentMarkDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Comment mark deleted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid comment mark ID' })
  remove(@Param('id') id: string) {
    return this.commentMarkService.remove(id);
  }
}
