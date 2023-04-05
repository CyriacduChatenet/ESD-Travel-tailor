import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';

@Controller('time-slot')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @Post()
  async create(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    return await this.timeSlotService.create(createTimeSlotDto);
  }

  @Get()
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.timeSlotService.findAll(queries);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.timeSlotService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTimeSlotDto: UpdateTimeSlotDto) {
    return await this.timeSlotService.update(id, updateTimeSlotDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.timeSlotService.remove(id);
  }
}
