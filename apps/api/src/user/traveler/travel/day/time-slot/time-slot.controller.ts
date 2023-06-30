import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
import { JwtAuthGuard } from '../../../../../auth/guards/jwt-auth.guard';
import { Roles } from '../../../../../config/decorators/roles.decorator';
import { Role } from '../../../../../config/enum/role.enum';

@Controller('time-slot')
@UseGuards(ThrottlerGuard)
@ApiTags('Time Slot')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @Post()
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Time slot created successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    return await this.timeSlotService.create(createTimeSlotDto);
  }

  @Get()
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Retrieved all time slots successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.timeSlotService.findAll(queries);
  }

  @Get(':id')
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Retrieved time slot successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    return await this.timeSlotService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updated time slot successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id') id: string, @Body() updateTimeSlotDto: UpdateTimeSlotDto) {
    return await this.timeSlotService.update(id, updateTimeSlotDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Deleted time slot successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param('id') id: string) {
    return await this.timeSlotService.remove(id);
  }
}
