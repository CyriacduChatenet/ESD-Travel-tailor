import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
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
@ApiTags('Traveler')
export class TravelerController {
  constructor(private readonly travelerService: TravelerService) {}

  @Post()
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Created traveler successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to create traveler' })
  async create(@Body() createTravelerDto: CreateTravelerDto) {
    return await this.travelerService.create(createTravelerDto);
  }

  @Get()
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Retrieved all travelers successfully' })
  @ApiNotFoundResponse({ description: 'List of travelers not found' })
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.travelerService.findAll(queries);
  }

  @Get(':id')
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Retrieved traveler by ID successfully' })
  @ApiNotFoundResponse({ description: 'Traveler not found' })
  async findOne(@Param('id') id: string) {
    return await this.travelerService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updated traveler successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to update traveler' })
  async update(
    @Param('id') id: string,
    @Body() updateTravelerDto: UpdateTravelerDTO,
  ) {
    return await this.travelerService.update(id, updateTravelerDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Deleted traveler successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to delete traveler' })
  async remove(@Param('id') id: string) {
    return await this.travelerService.remove(id);
  }
}
