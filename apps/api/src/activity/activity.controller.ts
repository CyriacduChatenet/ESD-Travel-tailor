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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ActivityQuery } from '@travel-tailor/types';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../config/enum/role.enum';
import { Roles } from '../config/decorators/roles.decorator';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { User } from '../config/decorators/user.decorator';

@Controller('activity')
@UseGuards(ThrottlerGuard)
@ApiTags('Activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @UseInterceptors(FilesInterceptor('image'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create an activity' })
  @ApiCreatedResponse({ description: 'Activity created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async create(@Body() createActivityDto: CreateActivityDto, @User() user, @UploadedFiles() files) {
    return this.activityService.create(createActivityDto, user, files);
  }

  @Get()
  @ApiOperation({ summary: 'Get all activities' })
  @ApiOkResponse({ description: 'Successful operation' })
  async findAll(@Query() queries: ActivityQuery) {
    return this.activityService.findAll(queries);
  }

  @Get('name/list/:name')
  @ApiOperation({ summary: 'Get activities by name' })
  @ApiOkResponse({ description: 'Successful operation' })
  async findAllActivitiesLikeName(@Param('name') name: string) {
    return this.activityService.findAllActivitiesLikeName(name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an activity by ID' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiNotFoundResponse({ description: 'Activity not found' })
  async findOneByName(@Param('id') id: string) {
    return this.activityService.findOne(id);
  }

  @Get('name/:slug')
  @ApiOperation({ summary: 'Get an activity by slug' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiNotFoundResponse({ description: 'Activity not found' })
  async findOne(@Param('slug') slug: string) {
    return this.activityService.findOneByName(slug);
  }

  @Get('/advertiser/:id')
  @ApiOperation({ summary: 'Get activities by advertiser' })
  @ApiOkResponse({ description: 'Successful operation' })
  async findAllByTraveler(
    @Param('id') advertiserId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ) {
    return await this.activityService.findAllByAdvertiserId(advertiserId, page, limit);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update an activity' })
  @ApiOkResponse({ description: 'Activity updated successfully' })
  @ApiNotFoundResponse({ description: 'Activity not found' })
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto
  ) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an activity' })
  @ApiOkResponse({ description: 'Activity deleted successfully' })
  @ApiNotFoundResponse({ description: 'Activity not found' })
  async remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}
