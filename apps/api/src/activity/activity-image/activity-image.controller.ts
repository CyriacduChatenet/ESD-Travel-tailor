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

import { Role } from '../../config/enum/role.enum';
import { Roles } from '../../config/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ActivityImageService } from './activity-image.service';
import { CreateActivityImageDto } from './dto/create-activity-image.dto';
import { UpdateActivityImageDto } from './dto/update-activity-image.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('activity-image')
@UseGuards(ThrottlerGuard)
export class ActivityImageController {
  constructor(private readonly activityImageService: ActivityImageService) {}

  @Post()
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  create(@Body() createActivityImageDto: CreateActivityImageDto) {
    return this.activityImageService.create(createActivityImageDto);
  }

  @Get()
  findAll(@Query() queries: ApiLimitResourceQuery) {
    return this.activityImageService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityImageService.findOne(id);
  }

  @Patch(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateActivityImageDto: UpdateActivityImageDto,
  ) {
    return this.activityImageService.update(id, updateActivityImageDto);
  }

  @Delete(':id')
  @Throttle(20, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Admin)
  remove(@Param('id') id: string) {
    return this.activityImageService.remove(id);
  }
}
