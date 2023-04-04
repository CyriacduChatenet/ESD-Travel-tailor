import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
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
      const travel = this.travelRepository.create(createTravelDto);
      return await this.travelRepository.save(travel);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      let { page, limit, sortedBy, departureCity, destinationCity, departureDate, returnDate } = queries;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;
      
      const query = this.travelRepository
      .createQueryBuilder('travel')
      .leftJoinAndSelect('travel.traveler', 'traveler')
      .leftJoinAndSelect('travel.days', 'day')
      .leftJoinAndSelect('day.timeSlots', 'timeSlot')
      .leftJoinAndSelect('timeSlot.activity', 'activity')

      if(sortedBy) {
        query.orderBy('travel.createdAt', sortedBy)
      } else {
        query.orderBy('travel.createdAt', 'DESC')
      }

      if(departureCity) {
        query.andWhere('travel.departureCity = :departureCity', { departureCity })
      }

      if(destinationCity) {
        query.andWhere('travel.destinationCity = :destinationCity', { destinationCity })
      }

      if(departureDate) {
        query.andWhere('travel.departureDate = :departureDate', { departureDate })
      }

      if(returnDate) {
        query.andWhere('travel.returnDate = :returnDate', { returnDate })
      }

      return {
        page: page,
        limit: limit,
        total: await query.getCount(),
        data: await query.skip((page - 1) * limit).take(limit).getMany(),
      };
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
        .leftJoinAndSelect('travel.days', 'day')
        .leftJoinAndSelect('day.timeSlots', 'timeSlot')
        .leftJoinAndSelect('timeSlot.activity', 'activity')
        .getOne();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateTravelDto) {
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
