import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { CreateTravelerDto } from './dto/create-traveler.dto'
import { UpdateTravelerDTO } from './dto/update-traveler.dto'
import { TravelerRepository } from './traveler.repository'
import { Traveler } from './entities/traveler.entity'

@Injectable()
export class TravelerService {
  constructor(
    private travelerRepository: TravelerRepository,
  ) { }

  async create(createTravelerDto: CreateTravelerDto) {
    try {
      return await this.travelerRepository.createTraveler(createTravelerDto)
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Unauthorized to create traveler',
        error
      })
    }
  }

  async save(traveler: CreateTravelerDto) {
    try {
      return await this.travelerRepository.save(traveler)
    } catch (error) {
      throw new BadRequestException({
        message: 'Bad request to save traveler',
        error
      })
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return await this.travelerRepository.findAllTraveler(queries)
    } catch (error) {
      throw new NotFoundException({
        message: 'Not found to find all traveler',
        error
      })
    }
  }

  async findOne(id: string) {
    try {
      return await this.travelerRepository.findOneTraveler(id)
    } catch (error) {
      throw new NotFoundException({
        message: `Not found to find one traveler with id ${id}`,
        error
      })
    }
  }

  async update(id: string, updateTravelerDto: UpdateTravelerDTO) {
    try {
      return await this.travelerRepository.updateTraveler(id, updateTravelerDto)
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to update traveler with id ${id}`,
        error
      })
    }
  }

  async remove(id: string) {
    try {
      return await this.travelerRepository.removeTraveler(id)
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to remove traveler with id ${id}`,
        error
      })
    }
  }

  async saveTraveler (traveler: Traveler) {
    try {
      return await this.travelerRepository.saveTraveler(traveler)
    } catch (error) {
      throw new BadRequestException({
        message: 'Bad request to save traveler',
        error
      })
    }
  }
}
