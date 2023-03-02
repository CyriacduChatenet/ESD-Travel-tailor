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
import { Role } from '@travel-tailor/functions';

import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ActivityDetailService } from './activity-detail.service';
import { CreateActivityDetailDto } from './dto/create-activity-detail.dto';
import { UpdateActivityDetailDto } from './dto/update-activity-detail.dto';

@Controller('activity-detail')
export class ActivityDetailController {
  constructor(private readonly activityDetailService: ActivityDetailService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Advertiser)
  create(@Body() createActivityDetailDto: CreateActivityDetailDto) {
    return this.activityDetailService.create(createActivityDetailDto);
  }

  @Get()
  findAll() {
    return this.activityDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityDetailService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Advertiser)
  update(
    @Param('id') id: string,
    @Body() updateActivityDetailDto: UpdateActivityDetailDto,
  ) {
    return this.activityDetailService.update(id, updateActivityDetailDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Advertiser)
  remove(@Param('id') id: string) {
    return this.activityDetailService.remove(id);
  }
}
