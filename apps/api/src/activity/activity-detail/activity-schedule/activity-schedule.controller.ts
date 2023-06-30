import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { Role } from '../../../config/enum/role.enum';
import { Roles } from '../../../config/decorators/roles.decorator';
import { ActivityScheduleService } from './activity-schedule.service';
import { CreateActivityScheduleDto } from './dto/create-activity-schedule.dto';
import { UpdateActivityScheduleDto } from './dto/update-activity-schedule.dto';

@Controller('activity-schedule')
@UseGuards(ThrottlerGuard)
@ApiTags('Activity Schedule')
export class ActivityScheduleController {
  constructor(private readonly activityScheduleService: ActivityScheduleService) {}

  @Post()
  @Throttle(1000, 60)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiOperation({ summary: 'Create an activity schedule' })
  @ApiCreatedResponse({ description: 'Activity schedule created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  create(@Body() createActivityScheduleDto: CreateActivityScheduleDto) {
    return this.activityScheduleService.create(createActivityScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all activity schedules' })
  @ApiOkResponse({ description: 'Successful operation' })
  findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.activityScheduleService.findAll(queries);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an activity schedule by ID' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiNotFoundResponse({ description: 'Activity schedule not found' })
  findOne(@Param('id') id: string) {
    return this.activityScheduleService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiOperation({ summary: 'Update an activity schedule' })
  @ApiOkResponse({ description: 'Activity schedule updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  update(
    @Param('id') id: string,
    @Body() updateActivityScheduleDto: UpdateActivityScheduleDto,
  ) {
    return this.activityScheduleService.update(id, updateActivityScheduleDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiOperation({ summary: 'Delete an activity schedule' })
  @ApiOkResponse({ description: 'Activity schedule deleted successfully' })
  @ApiNotFoundResponse({ description: 'Activity schedule not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.activityScheduleService.remove(id);
  }
}
