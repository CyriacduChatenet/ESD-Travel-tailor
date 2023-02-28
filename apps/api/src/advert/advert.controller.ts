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

import { Role } from '../auth/decorators/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdvertService } from './advert.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('advert')
export class AdvertController {
  constructor(private readonly advertService: AdvertService) {}

  @Post()
   @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  async create(@Body() createAdvertDto: CreateAdvertDto) {
    return await this.advertService.create(createAdvertDto);
  }

  @Get()
  async findAll() {
    return await this.advertService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.advertService.findOne(id);
  }

  @Patch(':id')
   @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  @Roles(Role.Advertiser)
  async update(
    @Param('id') id: string,
    @Body() updateAdvertDto: UpdateAdvertDto,
  ) {
    return await this.advertService.update(id, updateAdvertDto);
  }

  @Delete(':id')
   @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.advertService.remove(id);
  }
}
