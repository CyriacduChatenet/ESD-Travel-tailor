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
import { AdvertiserService } from './advertiser.service';
import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto';

@Controller('advertiser')
export class AdvertiserController {
  constructor(private readonly advertiserService: AdvertiserService) {}
  @Post()
  @UseGuards(LocalAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  create(@Body() createAdvertiserDto: CreateAdvertiserDto) {
    return this.advertiserService.create(createAdvertiserDto);
  }

  @Get()
  async findAll() {
    return await this.advertiserService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.advertiserService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(LocalAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateAdvertiserDto: UpdateAdvertiserDto,
  ) {
    return await this.advertiserService.update(id, updateAdvertiserDto);
  }

  @Delete(':id')
  @UseGuards(LocalAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.advertiserService.remove(id);
  }
}
