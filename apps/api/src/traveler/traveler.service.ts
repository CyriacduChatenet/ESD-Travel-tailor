import { Injectable } from '@nestjs/common';
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
    return await this.travelerRepository.save(createTravelerDto);
  }

  async findAll() {
    return await this.travelerRepository.find({
      relations: {
        user: true,
        tastes: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.travelerRepository.findOne({
      where: { id },
      relations: {
        user: true,
        tastes: true,
      },
    });
  }

  async update(id: string, updateTravelerDto: UpdateTravelerDTO) {
    const travelerInDB: any = await this.findOne(id);
    travelerInDB.tastes = updateTravelerDto.tastes;
    travelerInDB.user = updateTravelerDto.user;
    return await this.travelerRepository.save(travelerInDB);
  }

  async remove(id: string) {
    return await this.travelerRepository.softDelete(id);
  }
}
