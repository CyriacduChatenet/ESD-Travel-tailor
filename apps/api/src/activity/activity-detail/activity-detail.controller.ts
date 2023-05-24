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
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { Role } from '../../config/enum/role.enum';
import { Roles } from '../../config/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ActivityDetailService } from './activity-detail.service';
import { CreateActivityDetailDto } from './dto/create-activity-detail.dto';
import { UpdateActivityDetailDto } from './dto/update-activity-detail.dto';

@Controller('activity-detail')
@UseGuards(ThrottlerGuard)
export class ActivityDetailController {
  constructor(private readonly activityDetailService: ActivityDetailService) {}

  @Post()
  @Throttle(10, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  create(@Body() createActivityDetailDto: CreateActivityDetailDto) {
    return this.activityDetailService.create(createActivityDetailDto);
  }

  @Get()
  @Throttle(10, 60)
  findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.activityDetailService.findAll(queries);
  }

  @Get(':id')
  @Throttle(10, 60)
  findOne(@Param('id') id: string) {
    return this.activityDetailService.findOne(id);
  }

  @Patch(':id')
  @Throttle(10, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateActivityDetailDto: UpdateActivityDetailDto,
  ) {
    return this.activityDetailService.update(id, updateActivityDetailDto);
  }

  @Delete(':id')
  @Throttle(10, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  remove(@Param('id') id: string) {
    return this.activityDetailService.remove(id);
  }
}
