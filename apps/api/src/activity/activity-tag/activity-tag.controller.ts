import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { Role } from '../../auth/decorators/role.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ActivityTagService } from './activity-tag.service';
import { CreateActivityTagDto } from './dto/create-activity-tag.dto';
import { UpdateActivityTagDto } from './dto/update-activity-tag.dto';

@Controller('activity-tag')
export class ActivityTagController {
  constructor(private readonly activityTagService: ActivityTagService) {}

  @Post()
  @Roles(Role.Admin)
  @Roles(Role.Advertiser)
  create(@Body() createActivityTagDto: CreateActivityTagDto) {
    return this.activityTagService.create(createActivityTagDto);
  }

  @Get()
  findAll() {
    return this.activityTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityTagService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @Roles(Role.Advertiser)
  update(
    @Param('id') id: string,
    @Body() updateActivityTagDto: UpdateActivityTagDto,
  ) {
    return this.activityTagService.update(id, updateActivityTagDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @Roles(Role.Advertiser)
  remove(@Param('id') id: string) {
    return this.activityTagService.remove(id);
  }
}
