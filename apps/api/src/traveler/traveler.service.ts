import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDTO } from './dto/update-traveler.dto';
import { Traveler } from './entities/traveler.entity';

@Injectable()
export class TravelerService {
  constructor(
    @InjectRepository(Traveler)
    private travelerRepository: Repository<Traveler>,
  ) {}

  async create(createTravelerDto: CreateTravelerDto) {
    try {
      return await this.travelerRepository.save(createTravelerDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll() {
    try {
      return await this.travelerRepository.find({
        relations: {
          user: true,
          tastes: true,
          travels: true,
          comments: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.travelerRepository.findOne({
        where: { id },
        relations: {
          user: true,
          tastes: true,
          travels: true,
          comments: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateTravelerDto: UpdateTravelerDTO) {
    try {
      return await this.travelerRepository.update(id, updateTravelerDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.travelerRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
