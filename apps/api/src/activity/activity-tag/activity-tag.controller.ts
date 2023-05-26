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
import { ActivityTagQuery } from '@travel-tailor/types';

import { Role } from '../../config/enum/role.enum';
import { Roles } from '../../config/decorators/roles.decorator';
import { ActivityTagService } from './activity-tag.service';
import { CreateActivityTagDto } from './dto/create-activity-tag.dto';
import { UpdateActivityTagDto } from './dto/update-activity-tag.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('activity-tag')
@UseGuards(ThrottlerGuard)
export class ActivityTagController {
  constructor(private readonly activityTagService: ActivityTagService) {}

  @Post()
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  create(@Body() createActivityTagDto: CreateActivityTagDto) {
    return this.activityTagService.create(createActivityTagDto);
  }

  @Get()
  findAll(@Query() queries: ActivityTagQuery) {
    return this.activityTagService.findAll(queries);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.activityTagService.findOne(name);
  }

  @Patch(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateActivityTagDto: UpdateActivityTagDto,
  ) {
    return this.activityTagService.update(id, updateActivityTagDto);
  }

  @Delete(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  remove(@Param('id') id: string) {
    return this.activityTagService.remove(id);
  }
}
