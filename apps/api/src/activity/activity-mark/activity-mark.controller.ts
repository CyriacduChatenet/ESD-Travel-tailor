import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { ActivityMarkService } from './activity-mark.service';
import { CreateActivityMarkDto } from './dto/create-activity-mark.dto';
import { UpdateActivityMarkDto } from './dto/update-activity-mark.dto';

@Controller('activity-mark')
export class ActivityMarkController {
  constructor(private readonly activityMarkService: ActivityMarkService) {}

  @Post()
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
  async update(@Param('id') id: string, @Body() updateActivityMarkDto: UpdateActivityMarkDto) {
    return await this.activityMarkService.update(id, updateActivityMarkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.activityMarkService.remove(id);
  }
}
