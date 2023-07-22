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
      throw new UnauthorizedException({
        message: 'Unauthorized to create travel',
        error,
      });
    }
  }


  async save(data: CreateTravelDto) {
    return this.travelRepository.save(data)
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return await this.travelRepository.findAllTravel(queries);
    } catch (error) {
      throw new NotFoundException({
        message: 'List of travels not found',
        error,
      });
    }
  }

  async findAllByTravelerId(travelerId: string, page: number, limit: number) {
    try {
     return await this.travelRepository.findAllTravelByTravelerId(travelerId, page, limit);
    } catch(err) {
      throw new NotFoundException({
        message: `List of travels by traver id ${travelerId} not found`,
        err,
      });
    }
  }

  async findOne(id: string) {
    try {
      return await this.travelRepository.findOneTravel(id);
    } catch (error) {
      throw new NotFoundException({
        message: `Travel with id ${id} not found`,
        error,
      });
    }
  }

  async update(id: string, updateTravelDto) {
    try {
      return await this.travelRepository.updateTravel(id, updateTravelDto);
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to update travel with id ${id}`,
        error,
      });
    }
  }

  async remove(id: string) {
    try {
      return await this.travelRepository.removeTravel(id);
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to remove travel with id ${id}`,
        error,
      });
    }
  }
}
