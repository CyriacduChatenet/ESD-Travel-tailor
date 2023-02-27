import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { Advert } from './entities/advert.entity';

@Injectable()
export class AdvertService {
  constructor(
    @InjectRepository(Advert) private advertRepository: Repository<Advert>,
  ) {}
  create(createAdvertDto: CreateAdvertDto) {
    try {
      return this.advertRepository.save(createAdvertDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async findAll() {
    try {
      return await this.advertRepository.find({
        relations: {
          advertiser: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.advertRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateAdvertDto: UpdateAdvertDto) {
    try {
      return this.advertRepository.update(id, updateAdvertDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.advertRepository.softDelete({ id });
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
