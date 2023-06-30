import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { DayService } from './day.service';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { JwtAuthGuard } from '../../../../auth/guards/jwt-auth.guard';
import { Role } from '../../../../config/enum/role.enum';
import { Roles } from '../../../../config/decorators/roles.decorator';

@Controller('day')
@UseGuards(ThrottlerGuard)
@ApiTags('Day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Post()
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Day created successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() createDayDto: CreateDayDto) {
    return await this.dayService.create(createDayDto);
  }

  @Get()
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Retrieved all days successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.dayService.findAll(queries);
  }

  @Get(':id')
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Retrieved day successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    return await this.dayService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updated day successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id') id: string, @Body() updateDayDto: UpdateDayDto) {
    return await this.dayService.update(id, updateDayDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Deleted day successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param('id') id: string) {
    return await this.dayService.remove(id);
  }
}
