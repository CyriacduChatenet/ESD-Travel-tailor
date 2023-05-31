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

@Injectable()
export class TasteService {
  constructor(
    private tasteRepository: TasteRepository,
    private travelerService: TravelerService,
  ) {}

  async create(createTasteDto: CreateTasteDto) {
    try {
      const taste = await this.tasteRepository.createTaste(createTasteDto);
      const traveler = await this.travelerService.findOne(createTasteDto.traveler.id);
      const tastes = [...traveler.tastes, taste];
      await this.travelerService.update(createTasteDto.traveler.id, { tastes });
      return taste;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
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
