import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { Role } from '../auth/decorators/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdvertiserService } from './advertiser.service';
import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto';

@Controller('advertiser')
export class AdvertiserController {
  constructor(private readonly advertiserService: AdvertiserService) {}
  @Post()
  @Roles(Role.Advertiser)
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
  @Roles(Role.Advertiser)
  async update(
    @Param('id') id: string,
    @Body() updateAdvertiserDto: UpdateAdvertiserDto,
  ) {
    return await this.advertiserService.update(id, updateAdvertiserDto);
  }

  @Delete(':id')
  @Roles(Role.Advertiser)
  async remove(@Param('id') id: string) {
    return await this.advertiserService.remove(id);
  }
}
