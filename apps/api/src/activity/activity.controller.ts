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
import { ActivityQuery } from '@travel-tailor/types'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Role } from '../auth/decorators/role.enum'
import { Roles } from '../auth/decorators/roles.decorator'
import { ActivityService } from './activity.service'
import { CreateActivityDto } from './dto/create-activity.dto'
import { UpdateActivityDto } from './dto/update-activity.dto'

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto)
  }

  @Get()
  findAll(@Query() queries: ActivityQuery) {
    return this.activityService.findAll(queries)
  }

  @Get(':id')
  findOneByName(@Param('id') id: string) {
    return this.activityService.findOne(id)
  }

  @Get('name/:slug')
  findOne(@Param('slug') slug: string) {
    return this.activityService.findOneByName(slug)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto
  ) {
    return this.activityService.update(id, updateActivityDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.activityService.remove(id)
  }
}