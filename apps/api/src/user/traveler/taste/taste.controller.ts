import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

import { TasteService } from './taste.service';
import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
import { Roles } from '../../../config/decorators/roles.decorator';
import { Role } from '../../../config/enum/role.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('taste')
@UseGuards(ThrottlerGuard)
@ApiTags('Taste')
export class TasteController {
  constructor(private readonly tasteService: TasteService) { }

  @Post()
  @Throttle(1000, 60)
  @Roles(Role.Traveler, Role.Admin)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Taste created successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() createTasteDto: CreateTasteDto) {
    return this.tasteService.create(createTasteDto);
  }

  @Get()
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Retrieved all tastes successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.tasteService.findAll(queries);
  }

  @Get(':id')
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Retrieved taste successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    return this.tasteService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updated taste successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
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
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Deleted taste successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param('id') id: string) {
    return this.tasteService.remove(id);
  }
}
