import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';

@Injectable()
export class TravelService {
  constructor(
    @InjectRepository(Travel) private travelRepository: Repository<Travel>,
  ) {}

  async create(createTravelDto: CreateTravelDto) {
    try {
      return await this.travelRepository.save(createTravelDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll() {
    try {
      return await this.travelRepository
        .createQueryBuilder('travel')
        .leftJoinAndSelect('travel.traveler', 'traveler')
        .leftJoinAndSelect('travel.activities', 'activities')
        .orderBy('travel.createdAt', 'DESC')
        .getMany();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.travelRepository
        .createQueryBuilder('travel')
        .where('travel.id = :id', { id })
        .leftJoinAndSelect('travel.traveler', 'traveler')
        .leftJoinAndSelect('travel.activities', 'activities')
        .getOne();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateTravelDto: UpdateTravelDto) {
    try {
      return this.travelRepository.update(id, updateTravelDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.travelRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
