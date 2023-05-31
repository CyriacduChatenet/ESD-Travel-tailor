import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
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
export class ActivityMarkController {
  constructor(private readonly activityMarkService: ActivityMarkService) {}

  @Post()
  @Throttle(100, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  async create(@Body() createActivityMarkDto: CreateActivityMarkDto) {
    return await this.activityMarkService.create(createActivityMarkDto);
  }

  @Get()
  async findAll(@Query() query: ApiLimitResourceQuery) {
    return await this.activityMarkService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.activityMarkService.findOne(id);
  }

  @Patch(':id')
  @Throttle(100, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  async update(@Param('id') id: string, @Body() updateActivityMarkDto: UpdateActivityMarkDto) {
    return await this.activityMarkService.update(id, updateActivityMarkDto);
  }

  @Delete(':id')
  @Throttle(100, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.activityMarkService.remove(id);
  }
}
