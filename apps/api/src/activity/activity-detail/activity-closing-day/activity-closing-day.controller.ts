import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActivityClosingDayService } from './activity-closing-day.service';
import { CreateActivityClosingDayDto } from './dto/create-activity-closing-day.dto';
import { UpdateActivityClosingDayDto } from './dto/update-activity-closing-day.dto';

@Controller('activity-closing-day')
export class ActivityClosingDayController {
  constructor(
    private readonly activityClosingDayService: ActivityClosingDayService,
  ) {}

  @Post()
  create(@Body() createActivityClosingDayDto: CreateActivityClosingDayDto) {
    return this.activityClosingDayService.create(createActivityClosingDayDto);
  }

  @Get()
  findAll() {
    return this.activityClosingDayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityClosingDayService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityClosingDayDto: UpdateActivityClosingDayDto,
  ) {
    return this.activityClosingDayService.update(
      id,
      updateActivityClosingDayDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityClosingDayService.remove(id);
  }
}
