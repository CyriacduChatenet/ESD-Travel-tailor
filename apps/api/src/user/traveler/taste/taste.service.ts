import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';
import { Taste } from './entities/taste.entity';

@Injectable()
export class TasteService {
  constructor(
    @InjectRepository(Taste) private tasteRepository: Repository<Taste>,
  ) {}

  async create(createTasteDto: CreateTasteDto) {
    try {
      return this.tasteRepository.save(createTasteDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll() {
    try {
      return this.tasteRepository
        .createQueryBuilder('taste')
        .leftJoinAndSelect('taste.traveler', 'traveler')
        .orderBy('taste.createdAt', 'DESC')
        .getMany();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return this.tasteRepository
        .createQueryBuilder('taste')
        .where('taste.id = :id', { id })
        .leftJoinAndSelect('taste.traveler', 'traveler')
        .getOne();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateTasteDto: UpdateTasteDto) {
    try {
      return this.tasteRepository.update(id, updateTasteDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return this.tasteRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
