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
} from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { TravelService } from './travel.service'
import { CreateTravelDto } from './dto/create-travel.dto'
import { UpdateTravelDto } from './dto/update-travel.dto'
import { Roles } from '../../../auth/decorators/roles.decorator'
import { Role } from '../../../auth/decorators/role.enum'
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard'
import { User } from '../../../auth/decorators/user.decorator'
import { PlanningService } from './planning.service'

@Controller('travel')
export class TravelController {
  constructor(
    private readonly travelService: TravelService,
    private planningService: PlanningService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  async create(@Body() createTravelDto: CreateTravelDto, @User() user) {
    return await this.travelService.create(createTravelDto)
  }

  @Get()
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.travelService.findAll(queries)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.travelService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updateTravelDto: UpdateTravelDto) {
    return await this.travelService.update(id, updateTravelDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.travelService.remove(id)
  }
}
