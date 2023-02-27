import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { TasteService } from './taste.service';
import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/decorators/role.enum';

@Controller('taste')
export class TasteController {
  constructor(private readonly tasteService: TasteService) {}

  @Post()
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  async create(@Body() createTasteDto: CreateTasteDto) {
    return this.tasteService.create(createTasteDto);
  }

  @Get()
  async findAll() {
    return this.tasteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasteService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateTasteDto: UpdateTasteDto,
  ) {
    return this.tasteService.update(id, updateTasteDto);
  }

  @Delete(':id')
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return this.tasteService.remove(id);
  }
}
