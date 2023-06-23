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

import { TasteService } from './taste.service';
import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';
import { Roles } from '../../../config/decorators/roles.decorator';
import { Role } from '../../../config/enum/role.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('taste')
@UseGuards(ThrottlerGuard)
export class TasteController {
  constructor(private readonly tasteService: TasteService) { }

  @Post()
  @Throttle(1000, 60)
  @Roles(Role.Traveler, Role.Admin)
  async create(@Body() createTasteDto: CreateTasteDto) {
    return this.tasteService.create(createTasteDto);
  }

  @Get()
  @Throttle(1000, 60)
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.tasteService.findAll(queries);
  }

  @Get(':id')
  @Throttle(1000, 60)
  async findOne(@Param('id') id: string) {
    return this.tasteService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateTasteDto: UpdateTasteDto,
  ) {
    return this.tasteService.update(id, updateTasteDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  async remove(@Param('id') id: string) {
    return this.tasteService.remove(id);
  }
}
