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

import { ActivityClosingDayService } from './activity-closing-day.service';
import { CreateActivityClosingDayDto } from './dto/create-activity-closing-day.dto';
import { UpdateActivityClosingDayDto } from './dto/update-activity-closing-day.dto';
import { Roles } from '../../../config/decorators/roles.decorator';
import { Role } from '../../../config/enum/role.enum';

@Controller('activity-closing-day')
@UseGuards(ThrottlerGuard)
export class ActivityClosingDayController {
  constructor(private readonly activityClosingDayService: ActivityClosingDayService) {}

  @Post()
  @Throttle(100, 60)
  @Roles(Role.Advertiser, Role.Admin)
  create(@Body() createActivityClosingDayDto: CreateActivityClosingDayDto) {
    return this.activityClosingDayService.create(createActivityClosingDayDto);
  }

  @Get()
  findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.activityClosingDayService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityClosingDayService.findOne(id);
  }

  @Patch(':id')
  @Throttle(100, 60)
  @Roles(Role.Advertiser, Role.Admin)
  update(@Param('id') id: string, @Body() updateActivityClosingDayDto: UpdateActivityClosingDayDto) {
    return this.activityClosingDayService.update(
      id,
      updateActivityClosingDayDto,
    );
  }

  @Delete(':id')
  @Throttle(100, 60)
  @Roles(Role.Advertiser, Role.Admin)
  remove(@Param('id') id: string) {
    return this.activityClosingDayService.remove(id);
  }
}
