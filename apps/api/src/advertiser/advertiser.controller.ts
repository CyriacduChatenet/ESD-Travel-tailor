import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
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
  findAll() {
    return this.advertiserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertiserService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.Advertiser)
  update(
    @Param('id') id: string,
    @Body() updateAdvertiserDto: UpdateAdvertiserDto,
  ) {
    return this.advertiserService.update(id, updateAdvertiserDto);
  }

  @Delete(':id')
  @Roles(Role.Advertiser)
  remove(@Param('id') id: string) {
    return this.advertiserService.remove(id);
  }
}
