import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/decorators/role.enum';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post()
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  create(@Body() createTravelDto: CreateTravelDto) {
    return this.travelService.create(createTravelDto);
  }

  @Get()
  findAll() {
    return this.travelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateTravelDto: UpdateTravelDto) {
    return this.travelService.update(id, updateTravelDto);
  }

  @Delete(':id')
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.travelService.remove(id);
  }
}
