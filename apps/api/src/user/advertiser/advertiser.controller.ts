import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Role } from '../../config/enum/role.enum';
import { Roles } from '../../config/decorators/roles.decorator';
import { AdvertiserService } from './advertiser.service';
import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

@Controller('advertiser')
@UseGuards(ThrottlerGuard)
@ApiTags('Advertiser')
export class AdvertiserController {
  constructor(private readonly advertiserService: AdvertiserService) { }
  
  @Post()
  @Throttle(1000, 60)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Advertiser created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to create advertiser' })
  create(@Body() createAdvertiserDto: CreateAdvertiserDto) {
    return this.advertiserService.create(createAdvertiserDto);
  }

  @Get()
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Retrieved all advertisers successfully' })
  @ApiNotFoundResponse({ description: 'List of advertisers not found' })
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.advertiserService.findAll(queries);
  }

  @Get(':id')
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Retrieved advertiser successfully' })
  @ApiNotFoundResponse({ description: 'Advertiser not found' })
  async findOne(@Param('id') id: string) {
    return await this.advertiserService.findOne(id);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updated advertiser successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to update advertiser' })
  async update(
    @Param('id') id: string,
    @Body() updateAdvertiserDto: UpdateAdvertiserDto,
  ) {
    return await this.advertiserService.update(id, updateAdvertiserDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Deleted advertiser successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to delete advertiser' })
  async remove(@Param('id') id: string) {
    return await this.advertiserService.remove(id);
  }
}
