import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { CreateTravelerDto } from './dto/create-traveler.dto'
import { UpdateTravelerDTO } from './dto/update-traveler.dto'
import { CustomerService } from '../../payment/customer/customer.service'
import { TravelerRepository } from './traveler.repository'

@Injectable()
export class TravelerService {
  constructor(
    private travelerRepository: TravelerRepository,
  ) { }

  async create(createTravelerDto: CreateTravelerDto) {
    try {
      return await this.travelerRepository.createTraveler(createTravelerDto)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async save(traveler: CreateTravelerDto) {
    try {
      return await this.travelerRepository.save(traveler)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return await this.travelerRepository.findAllTraveler(queries)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
      return await this.travelerRepository.findOneTraveler(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateTravelerDto: UpdateTravelerDTO) {
    try {
      return await this.travelerRepository.updateTraveler(id, updateTravelerDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.travelerRepository.removeTraveler(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
