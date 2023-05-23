import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';
import { TasteRepository } from './taste.repository';

@Injectable()
export class TasteService {
  constructor(
    private tasteRepository: TasteRepository,
  ) {}

  async create(createTasteDto: CreateTasteDto) {
    try {
      return await this.tasteRepository.createTaste(createTasteDto);
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
