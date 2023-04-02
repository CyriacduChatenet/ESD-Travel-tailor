import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ApiLimitResourceQuery } from '@travel-tailor/types'
import { Repository } from 'typeorm'

import { CreateTravelerDto } from './dto/create-traveler.dto'
import { UpdateTravelerDTO } from './dto/update-traveler.dto'
import { Traveler } from './entities/traveler.entity'
import { CustomerService } from '../../payment/customer/customer.service'

@Injectable()
export class TravelerService {
  constructor(
    @InjectRepository(Traveler)
    private travelerRepository: Repository<Traveler>,
    private customerService: CustomerService,
  ) {}

  async create(createTravelerDto: CreateTravelerDto) {
    try {
      const customer = await this.customerService.create(createTravelerDto);
      const traveler = this.travelerRepository.create({...createTravelerDto, customer})

      return await this.travelerRepository.save(traveler)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      let { page, limit, sortedBy } = queries
      page = page ? +page : 1
      limit = limit ? +limit : 10

      const query = this.travelerRepository
        .createQueryBuilder('traveler')
        .leftJoinAndSelect('traveler.user', 'user')
        .leftJoinAndSelect('traveler.customer', 'customer')
        .leftJoinAndSelect('customer.orders', 'orders')
        .leftJoinAndSelect('traveler.tastes', 'tastes')
        .leftJoinAndSelect('traveler.travels', 'travel')
        .leftJoinAndSelect('travel.days', 'day')
        .leftJoinAndSelect('day.activities', 'activity')
        .leftJoinAndSelect('traveler.comments', 'comments')

      if (sortedBy) {
        query.orderBy('traveler.createdAt', sortedBy)
      } else {
        query.orderBy('traveler.createdAt', 'DESC')
      }

      return {
        page: page,
        limit: limit,
        total: await query.getCount(),
        data: await query.skip((page - 1) * limit).take(limit).getMany(),
      }
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
      return await this.travelerRepository
        .createQueryBuilder('traveler')
        .where('traveler.id = :id', { id })
        .leftJoinAndSelect('traveler.user', 'user')
        .leftJoinAndSelect('traveler.customer', 'customer')
        .leftJoinAndSelect('customer.orders', 'orders')
        .leftJoinAndSelect('traveler.tastes', 'tastes')
        .leftJoinAndSelect('traveler.travels', 'travel')
        .leftJoinAndSelect('travel.days', 'day')
        .leftJoinAndSelect('day.activities', 'activity')
        .leftJoinAndSelect('traveler.comments', 'comments')
        .getOne()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateTravelerDto: UpdateTravelerDTO) {
    try {
      return await this.travelerRepository.update(id, updateTravelerDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.travelerRepository.softDelete(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
