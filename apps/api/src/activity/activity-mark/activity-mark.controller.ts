import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { ActivityMarkService } from './activity-mark.service';
import { CreateActivityMarkDto } from './dto/create-activity-mark.dto';
import { UpdateActivityMarkDto } from './dto/update-activity-mark.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../config/decorators/roles.decorator';
import { Role } from '../../config/enum/role.enum';

@Controller('activity-mark')
@UseGuards(ThrottlerGuard)
@ApiTags('Activity Mark')
export class ActivityMarkController {
  constructor(private readonly activityMarkService: ActivityMarkService) {}

  @Post()
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an activity mark' })
  @ApiCreatedResponse({ description: 'Activity mark created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async create(@Body() createActivityMarkDto: CreateActivityMarkDto) {
    return await this.activityMarkService.create(createActivityMarkDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all activity marks' })
  @ApiOkResponse({ description: 'Successful operation' })
  async findAll(@Query() query: ApiLimitResourceQuery) {
    return await this.activityMarkService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an activity mark by ID' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiNotFoundResponse({ description: 'Activity mark not found' })
  async findOne(@Param('id') id: string) {
    return await this.activityMarkService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an activity mark' })
  @ApiOkResponse({ description: 'Activity mark updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async update(@Param('id') id: string, @Body() updateActivityMarkDto: UpdateActivityMarkDto) {
    return await this.activityMarkService.update(id, updateActivityMarkDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an activity mark' })
  @ApiOkResponse({ description: 'Activity mark deleted successfully' })
  @ApiNotFoundResponse({ description: 'Activity mark not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async remove(@Param('id') id: string) {
    return await this.activityMarkService.remove(id);
  }
}
