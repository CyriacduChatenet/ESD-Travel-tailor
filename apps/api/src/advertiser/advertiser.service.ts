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

  create(createAdvertiserDto: CreateAdvertiserDto) {
    return this.advertiserRepository.save(createAdvertiserDto);
  }

  findAll() {
    return this.advertiserRepository.find({
      relations: {
        adverts: true,
      },
    });
  }

  findOne(id: string) {
    return this.advertiserRepository.findOneBy({ id });
  }

  update(id: string, updateAdvertiserDto: UpdateAdvertiserDto) {
    return this.advertiserRepository.update(id, updateAdvertiserDto);
  }

  remove(id: string) {
    return this.advertiserRepository.softDelete(id);
  }
}
