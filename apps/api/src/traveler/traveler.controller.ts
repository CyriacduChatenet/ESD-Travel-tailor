import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { TravelerService } from './traveler.service';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDTO } from './dto/update-traveler.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/decorators/role.enum';

@Controller('traveler')
export class TravelerController {
  constructor(private readonly travelerService: TravelerService) {}

  @Post()
  async create(@Body() createTravelerDto: CreateTravelerDto) {
    return await this.travelerService.create(createTravelerDto);
  }

  @Get()
  async findAll() {
    return await this.travelerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.travelerService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateTravelerDto: UpdateTravelerDTO,
  ) {
    return await this.travelerService.update(id, updateTravelerDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.travelerService.remove(id);
  }
}
