import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
import { JwtAuthGuard } from '../../../../../auth/guards/jwt-auth.guard';
import { Roles } from '../../../../../config/decorators/roles.decorator';
import { Role } from '../../../../../config/enum/role.enum';

@Controller('time-slot')
@UseGuards(ThrottlerGuard)
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @Post()
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  async create(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    return await this.timeSlotService.create(createTimeSlotDto);
  }

  @Get()
  @Throttle(20, 60)
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.timeSlotService.findAll(queries);
  }

  @Get(':id')
  @Throttle(20, 60)
  async findOne(@Param('id') id: string) {
    return await this.timeSlotService.findOne(id);
  }

  @Patch(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  async update(@Param('id') id: string, @Body() updateTimeSlotDto: UpdateTimeSlotDto) {
    return await this.timeSlotService.update(id, updateTimeSlotDto);
  }

  @Delete(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.timeSlotService.remove(id);
  }
}
