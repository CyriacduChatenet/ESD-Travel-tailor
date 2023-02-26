import { Injectable } from '@nestjs/common';
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
    return await this.travelRepository.save(createTravelDto);
  }

  async findAll() {
    return await this.travelRepository.find({
      relations: {
        traveler: true,
        activities: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.travelRepository.findOne({
      where: { id },
      relations: {
        traveler: true,
        activities: true,
      },
    });
  }

  async update(id: string, updateTravelDto: UpdateTravelDto) {
    const travelInDB: any = await this.travelRepository.findOneById(id);
    travelInDB.traveler = updateTravelDto.traveler;
    travelInDB.departureCity = updateTravelDto.departureCity;
    travelInDB.destinationCity = updateTravelDto.destinationCity;
    travelInDB.departureDate = updateTravelDto.departureDate;
    travelInDB.returnDate = updateTravelDto.returnDate;
    travelInDB.activities = [
      ...travelInDB.activities,
      ...updateTravelDto.activities,
    ];
    return this.travelRepository.save(travelInDB);
  }

  async remove(id: string) {
    return await this.travelRepository.softDelete(id);
  }
}
