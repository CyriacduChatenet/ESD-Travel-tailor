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

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Role } from '../../auth/decorators/role.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { AdvertiserService } from './advertiser.service';
import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

@Controller('advertiser')
export class AdvertiserController {
  constructor(private readonly advertiserService: AdvertiserService) {}
  @Post()
  create(@Body() createAdvertiserDto: CreateAdvertiserDto) {
    return this.advertiserService.create(createAdvertiserDto);
  }

  @Get()
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.advertiserService.findAll(queries);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.advertiserService.findOne(id);
  }

  @Patch(':id')
   @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateAdvertiserDto: UpdateAdvertiserDto,
  ) {
    return await this.advertiserService.update(id, updateAdvertiserDto);
  }

  @Delete(':id')
   @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.advertiserService.remove(id);
  }
}
