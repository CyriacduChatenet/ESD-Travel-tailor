import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { Role } from '../../../auth/decorators/role.enum';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { ActivityScheduleService } from './activity-schedule.service';
import { CreateActivityScheduleDto } from './dto/create-activity-schedule.dto';
import { UpdateActivityScheduleDto } from './dto/update-activity-schedule.dto';

@Controller('activity-schedule')
export class ActivityScheduleController {
  constructor(
    private readonly activityScheduleService: ActivityScheduleService,
  ) {}

  @Post()
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  create(@Body() createActivityScheduleDto: CreateActivityScheduleDto) {
    return this.activityScheduleService.create(createActivityScheduleDto);
  }

  @Get()
  findAll() {
    return this.activityScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityScheduleService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateActivityScheduleDto: UpdateActivityScheduleDto,
  ) {
    return this.activityScheduleService.update(id, updateActivityScheduleDto);
  }

  @Delete(':id')
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.activityScheduleService.remove(id);
  }
}
