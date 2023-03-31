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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiLimitResourceQuery, FileData } from '@travel-tailor/types';

import { Role } from '../../auth/decorators/role.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ActivityImageService } from './activity-image.service';
import { CreateActivityImageDto } from './dto/create-activity-image.dto';
import { UpdateActivityImageDto } from './dto/update-activity-image.dto';

@Controller('activity-image')
export class ActivityImageController {
  constructor(private readonly activityImageService: ActivityImageService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  create(@Body() createActivityImageDto: CreateActivityImageDto, @UploadedFiles() files?: FileData[]) {
    return this.activityImageService.create(createActivityImageDto, files);
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
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateActivityImageDto: UpdateActivityImageDto,
    @UploadedFiles() files?: FileData[]
  ) {
    return this.activityImageService.update(id, updateActivityImageDto, files);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.activityImageService.remove(id);
  }
}
