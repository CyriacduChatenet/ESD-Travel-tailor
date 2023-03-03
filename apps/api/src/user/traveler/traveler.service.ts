import {
  BadRequestException,
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
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return await this.travelerRepository
        .createQueryBuilder('traveler')
        .leftJoinAndSelect('traveler.user', 'user')
        .leftJoinAndSelect('traveler.tastes', 'tastes')
        .leftJoinAndSelect('traveler.travels', 'travels')
        .leftJoinAndSelect('traveler.comments', 'comments')
        .orderBy('traveler.createdAt', 'DESC')
        .getMany();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.travelerRepository
        .createQueryBuilder('traveler')
        .where('traveler.id = :id', { id })
        .leftJoinAndSelect('traveler.user', 'user')
        .leftJoinAndSelect('traveler.tastes', 'tastes')
        .leftJoinAndSelect('traveler.travels', 'travels')
        .leftJoinAndSelect('traveler.comments', 'comments')
        .getOne();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateTravelerDto: UpdateTravelerDTO) {
    // try {
    return await this.travelerRepository.update(id, updateTravelerDto);
    // } catch (error) {
    //   throw new UnauthorizedException(error);
    // }
  }

  async remove(id: string) {
    try {
      return await this.travelerRepository.softDelete(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
