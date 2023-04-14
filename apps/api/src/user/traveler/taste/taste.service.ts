import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
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
      const taste = await this.tasteRepository.create(createTasteDto);
      return this.tasteRepository.save(taste);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      let { page, limit, sortedBy, name } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;

      const query = this.tasteRepository
      .createQueryBuilder('taste')
      .leftJoinAndSelect('taste.traveler', 'traveler')

      if(sortedBy) {
        query.orderBy('taste.createdAt', sortedBy)
      } else {
        query.orderBy('taste.createdAt', 'DESC')
      }

      if(name) {
        query.andWhere('taste.name LIKE :name', { name: `%${name}%`})
      }

      return {
        page: page,
        limit: limit,
        total: await query.getCount(),
        data: await query.skip((page - 1) * limit).take(limit).getMany(),
      }
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
