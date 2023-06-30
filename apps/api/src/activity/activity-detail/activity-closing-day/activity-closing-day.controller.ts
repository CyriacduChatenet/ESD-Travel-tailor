import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { ActivityClosingDayService } from './activity-closing-day.service';
import { CreateActivityClosingDayDto } from './dto/create-activity-closing-day.dto';
import { UpdateActivityClosingDayDto } from './dto/update-activity-closing-day.dto';
import { Roles } from '../../../config/decorators/roles.decorator';
import { Role } from '../../../config/enum/role.enum';

@Controller('activity-closing-day')
@UseGuards(ThrottlerGuard)
@ApiTags('Activity Closing Day')
export class ActivityClosingDayController {
  constructor(private readonly activityClosingDayService: ActivityClosingDayService) {}

  @Post()
  @Throttle(1000, 60)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an activity closing day' })
  @ApiCreatedResponse({ description: 'Activity closing day created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  create(@Body() createActivityClosingDayDto: CreateActivityClosingDayDto) {
    return this.activityClosingDayService.create(createActivityClosingDayDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all activity closing days' })
  @ApiOkResponse({ description: 'Successful operation' })
  findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.activityClosingDayService.findAll(queries);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an activity closing day by ID' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiNotFoundResponse({ description: 'Activity closing day not found' })
  findOne(@Param('id') id: string) {
    return this.activityClosingDayService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an activity closing day' })
  @ApiOkResponse({ description: 'Activity closing day updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateActivityClosingDayDto: UpdateActivityClosingDayDto) {
    return this.activityClosingDayService.update(id, updateActivityClosingDayDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an activity closing day' })
  @ApiOkResponse({ description: 'Activity closing day deleted successfully' })
  @ApiNotFoundResponse({ description: 'Activity closing day not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.activityClosingDayService.remove(id);
  }
}
