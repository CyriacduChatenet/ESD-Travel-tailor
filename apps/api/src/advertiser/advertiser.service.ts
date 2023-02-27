import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAdvertiserDto } from './dto/create-advertiser.dto';
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto';
import { Advertiser } from './entities/advertiser.entity';

@Injectable()
export class AdvertiserService {
  constructor(
    @InjectRepository(Advertiser)
    private advertiserRepository: Repository<Advertiser>,
  ) {}

  async create(createAdvertiserDto: CreateAdvertiserDto) {
    return await this.advertiserRepository.save(createAdvertiserDto);
  }

  async findAll() {
    return await this.advertiserRepository.find({
      relations: {
        adverts: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.advertiserRepository.findOne({
      where: { id },
      relations: {
        adverts: true,
        user: true,
      },
    });
  }

  async update(id: string, updateAdvertiserDto: UpdateAdvertiserDto) {
    return this.advertiserRepository.update(id, updateAdvertiserDto);
  }

  async remove(id: string) {
    return await this.advertiserRepository.softDelete(id);
  }
}
