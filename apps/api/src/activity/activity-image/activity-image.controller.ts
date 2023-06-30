import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { Role } from '../../config/enum/role.enum';
import { Roles } from '../../config/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ActivityImageService } from './activity-image.service';
import { CreateActivityImageDto } from './dto/create-activity-image.dto';
import { UpdateActivityImageDto } from './dto/update-activity-image.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('activity-image')
@UseGuards(ThrottlerGuard)
@ApiTags('Activity Image')
export class ActivityImageController {
  constructor(private readonly activityImageService: ActivityImageService) {}

  @Post()
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiOperation({ summary: 'Create an activity image' })
  @ApiCreatedResponse({ description: 'Activity image created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  create(@Body() createActivityImageDto: CreateActivityImageDto) {
    return this.activityImageService.create(createActivityImageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all activity images' })
  @ApiOkResponse({ description: 'Successful operation' })
  findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.activityImageService.findAll(queries);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an activity image by ID' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiNotFoundResponse({ description: 'Activity image not found' })
  findOne(@Param('id') id: string) {
    return this.activityImageService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiOperation({ summary: 'Update an activity image' })
  @ApiOkResponse({ description: 'Activity image updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  update(
    @Param('id') id: string,
    @Body() updateActivityImageDto: UpdateActivityImageDto,
  ) {
    return this.activityImageService.update(id, updateActivityImageDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiOperation({ summary: 'Delete an activity image' })
  @ApiOkResponse({ description: 'Activity image deleted successfully' })
  @ApiNotFoundResponse({ description: 'Activity image not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.activityImageService.remove(id);
  }
}
