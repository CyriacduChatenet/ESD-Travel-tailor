import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { DayService } from './day.service';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { JwtAuthGuard } from '../../../../auth/guards/jwt-auth.guard';
import { Role } from '../../../../config/enum/role.enum';
import { Roles } from '../../../../config/decorators/roles.decorator';

@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  async create(@Body() createDayDto: CreateDayDto) {
    return await this.dayService.create(createDayDto);
  }

  @Get()
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.dayService.findAll(queries);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dayService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updateDayDto: UpdateDayDto) {
    return await this.dayService.update(id, updateDayDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.dayService.remove(id);
  }
}
