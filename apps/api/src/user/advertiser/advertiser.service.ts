import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { CreateAdvertiserDto } from './dto/create-advertiser.dto'
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto'
import { CustomerService } from '../../payment/customer/customer.service'
import { AdvertiserRepository } from './advertiser.repository'
import { Advertiser } from './entities/advertiser.entity'

@Injectable()
export class AdvertiserService {
  constructor(
    private advertiserRepository: AdvertiserRepository,
    private customerService: CustomerService
  ) {}

  async create(createAdvertiserDto: CreateAdvertiserDto) {
    try {
      const customer = await this.customerService.create({
        address: createAdvertiserDto.location,
        name: createAdvertiserDto.name,
      })

      return await this.advertiserRepository.createAdvertiser(createAdvertiserDto, customer)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }


  async save(advertiser: CreateAdvertiserDto) {
    try {
      return await this.advertiserRepository.save(advertiser)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return  await this.advertiserRepository.findAllAdvertiser(queries)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: string) {
    try {
     return await this.advertiserRepository.findOneAdvertiser(id)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: string, updateAdvertiserDto: UpdateAdvertiserDto) {
    try {
     return await this.advertiserRepository.updateAdvertiser(id, updateAdvertiserDto)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }

  async remove(id: string) {
    try {
      return await this.advertiserRepository.removeAdvertiser(id)
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
