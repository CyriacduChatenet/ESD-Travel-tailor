import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TravelerService } from './traveler.service';
import { CreateTravelerDto } from './dto/create-traveler.dto';

@Controller('traveler')
export class TravelerController {
  constructor(private readonly travelerService: TravelerService) {}

  @Post()
  async create(@Body() createTravelerDto: CreateTravelerDto) {
    return await this.travelerService.create(createTravelerDto);
  }

  @Get()
  async findAll() {
    return await this.travelerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.travelerService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTravelerDto: CreateTravelerDto,
  ) {
    return await this.travelerService.update(id, updateTravelerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.travelerService.remove(id);
  }
}
