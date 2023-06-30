import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { Role } from '../../config/enum/role.enum';
import { Roles } from '../../config/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ActivityDetailService } from './activity-detail.service';
import { CreateActivityDetailDto } from './dto/create-activity-detail.dto';
import { UpdateActivityDetailDto } from './dto/update-activity-detail.dto';

@Controller('activity-detail')
@UseGuards(ThrottlerGuard)
@ApiTags('Activity Detail')
export class ActivityDetailController {
  constructor(private readonly activityDetailService: ActivityDetailService) {}

  @Post()
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an activity detail' })
  @ApiCreatedResponse({ description: 'Activity detail created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  create(@Body() createActivityDetailDto: CreateActivityDetailDto) {
    return this.activityDetailService.create(createActivityDetailDto);
  }

  @Get()
  @Throttle(1000, 60)
  @ApiOperation({ summary: 'Get all activity details' })
  @ApiOkResponse({ description: 'Successful operation' })
  findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.activityDetailService.findAll(queries);
  }

  @Get(':id')
  @Throttle(1000, 60)
  @ApiOperation({ summary: 'Get an activity detail by ID' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiNotFoundResponse({ description: 'Activity detail not found' })
  findOne(@Param('id') id: string) {
    return this.activityDetailService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an activity detail' })
  @ApiOkResponse({ description: 'Activity detail updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  update(
    @Param('id') id: string,
    @Body() updateActivityDetailDto: UpdateActivityDetailDto,
  ) {
    return this.activityDetailService.update(id, updateActivityDetailDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an activity detail' })
  @ApiOkResponse({ description: 'Activity detail deleted successfully' })
  @ApiNotFoundResponse({ description: 'Activity detail not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.activityDetailService.remove(id);
  }
}