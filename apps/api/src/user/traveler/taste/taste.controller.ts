import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { TasteService } from './taste.service';
import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/decorators/role.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('taste')
export class TasteController {
  constructor(private readonly tasteService: TasteService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
   @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateTasteDto: UpdateTasteDto,
  ) {
    return this.tasteService.update(id, updateTasteDto);
  }

  @Delete(':id')
   @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return this.tasteService.remove(id);
  }
}
