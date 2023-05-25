import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { TravelerService } from './traveler.service';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDTO } from './dto/update-traveler.dto';
import { Roles } from '../../config/decorators/roles.decorator';
import { Role } from '../../config/enum/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('traveler')
@UseGuards(ThrottlerGuard)
export class TravelerController {
  constructor(private readonly travelerService: TravelerService) {}

  @Post()
  @Throttle(20, 60)
  async create(@Body() createTravelerDto: CreateTravelerDto) {
    return await this.travelerService.create(createTravelerDto);
  }

  @Get()
  @Throttle(20, 60)
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.travelerService.findAll(queries);
  }

  @Get(':id')
  @Throttle(20, 60)
  async findOne(@Param('id') id: string) {
    return await this.travelerService.findOne(id);
  }

  @Patch(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateTravelerDto: UpdateTravelerDTO,
  ) {
    return await this.travelerService.update(id, updateTravelerDto);
  }

  @Delete(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.travelerService.remove(id);
  }
}
