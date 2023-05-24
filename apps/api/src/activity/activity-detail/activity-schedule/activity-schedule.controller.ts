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
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { Role } from '../../../config/enum/role.enum';
import { Roles } from '../../../config/decorators/roles.decorator';
import { ActivityScheduleService } from './activity-schedule.service';
import { CreateActivityScheduleDto } from './dto/create-activity-schedule.dto';
import { UpdateActivityScheduleDto } from './dto/update-activity-schedule.dto';

@Controller('activity-schedule')
@UseGuards(ThrottlerGuard)
export class ActivityScheduleController {
  constructor(private readonly activityScheduleService: ActivityScheduleService) {}

  @Post()
  @Throttle(10, 60)
  @Roles(Role.Advertiser, Role.Admin)
  create(@Body() createActivityScheduleDto: CreateActivityScheduleDto) {
    return this.activityScheduleService.create(createActivityScheduleDto);
  }

  @Get()
  @Throttle(10, 60)
  findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.activityScheduleService.findAll(queries);
  }

  @Get(':id')
  @Throttle(10, 60)
  findOne(@Param('id') id: string) {
    return this.activityScheduleService.findOne(id);
  }

  @Patch(':id')
  @Throttle(10, 60)
  @Roles(Role.Advertiser, Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateActivityScheduleDto: UpdateActivityScheduleDto,
  ) {
    return this.activityScheduleService.update(id, updateActivityScheduleDto);
  }

  @Delete(':id')
  @Throttle(10, 60)
  @Roles(Role.Advertiser, Role.Admin)
  remove(@Param('id') id: string) {
    return this.activityScheduleService.remove(id);
  }
}
