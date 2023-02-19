import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTravelerDto } from './dto/create-traveler.dto';

import { Traveler } from './entities/traveler.entity';

@Injectable()
export class TravelerService {
  constructor(
    @InjectRepository(Traveler)
    private travelerRepository: Repository<Traveler>,
  ) {}

  create(createTravelerDto: CreateTravelerDto) {
    return this.travelerRepository.save(createTravelerDto);
  }

  findAll() {
    return this.travelerRepository.find({
      relations: {
        user: true,
      },
    });
  }

  findOne(id: string) {
    return this.travelerRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }

  update(id: string, updateTravelerDto: CreateTravelerDto) {
    return this.travelerRepository.update(id, updateTravelerDto);
  }

  remove(id: string) {
    return this.travelerRepository.softDelete(id);
  }
}
