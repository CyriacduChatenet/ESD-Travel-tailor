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

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Role } from '../../config/enum/role.enum';
import { Roles } from '../../config/decorators/roles.decorator';
import { AdvertiserService } from './advertiser.service';
import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto';

@Controller('advertiser')
@UseGuards(ThrottlerGuard)
export class AdvertiserController {
  constructor(private readonly advertiserService: AdvertiserService) { }
  
  @Post()
  @Throttle(20, 60)
  @Roles(Role.Advertiser, Role.Admin)
  create(@Body() createAdvertiserDto: CreateAdvertiserDto) {
    return this.advertiserService.create(createAdvertiserDto);
  }

  @Get()
  @Throttle(20, 60)
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.advertiserService.findAll(queries);
  }

  @Get(':id')
  @Throttle(20, 60)
  async findOne(@Param('id') id: string) {
    return await this.advertiserService.findOne(id);
  }

  @Patch(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateAdvertiserDto: UpdateAdvertiserDto,
  ) {
    return await this.advertiserService.update(id, updateAdvertiserDto);
  }

  @Delete(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.advertiserService.remove(id);
  }
}
