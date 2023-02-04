import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Traveler } from './entities/traveler.entity';

@Injectable()
export class TravelerService {
  constructor(
    @InjectRepository(Traveler)
    private travelerRepository: Repository<Traveler>,
  ) {}

  create(createTravelerDto: any) {
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

  update(id: string, updateTravelerDto: any) {
    return this.travelerRepository.update(id, updateTravelerDto);
  }

  remove(id: string) {
    return this.travelerRepository.softDelete(id);
  }
}
