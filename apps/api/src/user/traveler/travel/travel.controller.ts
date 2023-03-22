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

import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/decorators/role.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post()
   @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  create(@Body() createTravelDto: CreateTravelDto) {
    return this.travelService.create(createTravelDto);
  }

  @Get()
  findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.travelService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelService.findOne(id);
  }

  @Patch(':id')
   @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateTravelDto: UpdateTravelDto) {
    return this.travelService.update(id, updateTravelDto);
  }

  @Delete(':id')
   @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.travelService.remove(id);
  }
}
