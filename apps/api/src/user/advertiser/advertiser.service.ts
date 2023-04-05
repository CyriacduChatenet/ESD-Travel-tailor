import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ApiLimitResourceQuery } from '@travel-tailor/types'
import { Repository } from 'typeorm'

import { CreateAdvertiserDto } from './dto/create-advertiser.dto'
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto'
import { Advertiser } from './entities/advertiser.entity'
import { CustomerService } from '../../payment/customer/customer.service'

@Injectable()
export class AdvertiserService {
  constructor(
    @InjectRepository(Advertiser)
    private advertiserRepository: Repository<Advertiser>,
    private customerService: CustomerService
  ) {}

  async create(createAdvertiserDto: CreateAdvertiserDto) {
    try {
      const customer = await this.customerService.create({
        address: createAdvertiserDto.location,
        name: createAdvertiserDto.name,
      })
      const advertiser = this.advertiserRepository.create({
        ...createAdvertiserDto,
        customer,
      })

      return await this.advertiserRepository.save(advertiser)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      let { page, limit, sortedBy, name, location } = queries
      page = page ? +page : 1
      limit = limit ? +limit : 10

      const query = this.advertiserRepository
      .createQueryBuilder('advertiser')
      .leftJoinAndSelect('advertiser.activities', 'activities')
      .leftJoinAndSelect('advertiser.user', 'user')
      .leftJoinAndSelect('advertiser.customer', 'customer')

      if(sortedBy) {
        query.orderBy('advertiser.createdAt', sortedBy)
      } else {
        query.orderBy('advertiser.createdAt', 'DESC')
      }

      if(name) {
        query.where('advertiser.name = :name', { name })
      }

      if(location) {
        query.where('advertiser.location = :location', { location })
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
      return await this.advertiserRepository
        .createQueryBuilder('advertiser')
        .where('advertiser.id = :id', { id })
        .leftJoinAndSelect('advertiser.activities', 'activities')
        .leftJoinAndSelect('advertiser.user', 'user')
        .leftJoinAndSelect('advertiser.customer', 'customer')
        .getOne()
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateAdvertiserDto: UpdateAdvertiserDto) {
    try {
      return await this.advertiserRepository.update(id, updateAdvertiserDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.advertiserRepository.softDelete(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
