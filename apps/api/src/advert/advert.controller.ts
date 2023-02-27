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

import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { Role } from '../auth/decorators/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdvertService } from './advert.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';

@Controller('advert')
export class AdvertController {
  constructor(private readonly advertService: AdvertService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
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
  @UseGuards(LocalAuthGuard)
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
  @UseGuards(LocalAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.advertService.remove(id);
  }
}
