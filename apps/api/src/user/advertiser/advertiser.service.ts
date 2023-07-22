import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { CreateAdvertiserDto } from './dto/create-advertiser.dto'
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto'
import { AdvertiserRepository } from './advertiser.repository'

@Injectable()
export class AdvertiserService {
  constructor(
    private advertiserRepository: AdvertiserRepository,
  ) {}

  async create(createAdvertiserDto: CreateAdvertiserDto) {
    try {
      return await this.advertiserRepository.createAdvertiser(createAdvertiserDto)
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Unauthorized to create advertiser',
        error,
      })
    }
  }


  async save(advertiser: CreateAdvertiserDto) {
    try {
      return await this.advertiserRepository.save(advertiser)
    } catch (error) {
      throw new BadRequestException({
        message: 'Bad request to save advertiser',
        error,
      })
    }
  }

  async findAll(queries: ApiLimitResourceQuery) {
    try {
      return  await this.advertiserRepository.findAllAdvertiser(queries)
    } catch (error) {
      throw new NotFoundException({
        message: 'List of advertisers not found',
        error,
      })
    }
  }

  async findOne(id: string) {
    try {
     return await this.advertiserRepository.findOneAdvertiser(id)
    } catch (error) {
      throw new NotFoundException({
        message: `Advertiser with id ${id} not found`,
        error,
      })
    }
  }

  async update(id: string, updateAdvertiserDto: UpdateAdvertiserDto) {
    try {
     return await this.advertiserRepository.updateAdvertiser(id, updateAdvertiserDto)
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to update advertiser with id ${id}`,
        error,
      })
    }
  }

  async remove(id: string) {
    try {
      return await this.advertiserRepository.removeAdvertiser(id)
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to remove advertiser with id ${id}`,
        error,
      })
    }
  }
}
