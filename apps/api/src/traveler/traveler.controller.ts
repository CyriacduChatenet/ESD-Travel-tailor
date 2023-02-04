import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TravelerService } from './traveler.service';
import { CreateTravelerDto } from './dto/create-traveler.dto';

@Controller('traveler')
export class TravelerController {
  constructor(private readonly travelerService: TravelerService) {}

  @Post()
  create(@Body() createTravelerDto: CreateTravelerDto) {
    return this.travelerService.create(createTravelerDto);
  }

  @Get()
  findAll() {
    return this.travelerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelerService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTravelerDto: any) {
    return this.travelerService.update(id, updateTravelerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelerService.remove(id);
  }
}
