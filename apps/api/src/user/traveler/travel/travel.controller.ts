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
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'
import { ApiLimitResourceQuery, User as UserType } from '@travel-tailor/types'

import { TravelService } from './travel.service'
import { CreateTravelDto } from './dto/create-travel.dto'
import { UpdateTravelDto } from './dto/update-travel.dto'
import { Roles } from '../../../config/decorators/roles.decorator'
import { Role } from '../../../config/enum/role.enum'
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard'
import { User } from '../../../config/decorators/user.decorator'
import { PlanningService } from './planning/planning.service'
import { UserService } from '../../../user/user.service'

@Controller('travel')
@UseGuards(ThrottlerGuard)
export class TravelController {
  constructor(
    private readonly travelService: TravelService,
    private planningService: PlanningService,
    private userService: UserService,
  ) {}

  @Post()
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  async create(@Body() createTravelDto: CreateTravelDto, @User() user: UserType) {
    const userInDB = await this.userService.findOneByEmail(user.email);

    const createTravelDTO = {
      ...createTravelDto,
      traveler: userInDB.traveler.id,
    }
    
    const travel = await this.travelService.create(createTravelDTO);
    await this.planningService.create(user, travel);
    return travel;
  }

  @Get()
  @Throttle(1000, 60)
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.travelService.findAll(queries)
  }

  @Get('/traveler/:id')
  @Throttle(1000, 60)
  async findAllByTraveler(@Param('id') travelerId: string, @Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.travelService.findAllByTravelerId(travelerId, page, limit);
  };

  @Get(':id')
  @Throttle(1000, 60)
  async findOne(@Param('id') id: string) {
    return await this.travelService.findOne(id)
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  async update(@Param('id') id: string, @Body() updateTravelDto: UpdateTravelDto) {
    return await this.travelService.update(id, updateTravelDto)
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.travelService.remove(id)
  }
}
