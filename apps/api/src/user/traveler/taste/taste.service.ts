import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';
import { TasteRepository } from './taste.repository';
import { TravelerService } from '../traveler.service';
import { Taste } from './entities/taste.entity';

@Injectable()
export class TasteService {
  constructor(
    private tasteRepository: TasteRepository,
    private travelerService: TravelerService,
  ) {}

  async create(createTasteDto: CreateTasteDto) {
    const traveler = await this.travelerService.findOne(String(createTasteDto.traveler));
    if (!traveler) {
      throw new NotFoundException(`Traveler with id ${createTasteDto.traveler} not found`);
    }
    const taste = await this.tasteRepository.createTaste(createTasteDto);
    const tastes = traveler?.tastes || [];
    tastes.push(taste);
    traveler.tastes = tastes;
    return await this.travelerService.saveTraveler(traveler);
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return await this.tasteRepository.findAllTaste(queries);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
     return await this.tasteRepository.findOneTaste(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateTasteDto: UpdateTasteDto) {
    try {
      return await this.tasteRepository.update(id, updateTasteDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.tasteRepository.removeTaste(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
