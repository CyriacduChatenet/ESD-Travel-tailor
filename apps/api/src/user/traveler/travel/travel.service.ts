import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { CreateTravelDto } from './dto/create-travel.dto';
import { TravelRepository } from './travel.repository';

@Injectable()
export class TravelService {
  constructor(
    private readonly travelRepository: TravelRepository,
  ) {}

  async create(createTravelDto: CreateTravelDto) {
    try {
      return await this.travelRepository.createTravel(createTravelDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return await this.travelRepository.findAllTravel(queries);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAllByTravelerId(travelerId: string, page: number, limit: number) {
    try {
     return await this.travelRepository.findAllTravelByTravelerId(travelerId, page, limit);
    } catch(err) {
      throw new NotFoundException(err);
    }
  }

  async findOne(id: string) {
    try {
      return await this.travelRepository.findOneTravel(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateTravelDto) {
    try {
      return await this.travelRepository.updateTravel(id, updateTravelDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.travelRepository.removeTravel(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
