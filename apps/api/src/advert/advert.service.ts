import { Injectable } from '@nestjs/common';
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
    return this.advertRepository.save(createAdvertDto);
  }

  findAll() {
    return this.advertRepository.find({
      relations: {
        advertiser: true,
      },
    });
  }

  findOne(id: string) {
    return this.advertRepository.findOneBy({ id });
  }

  update(id: string, updateAdvertDto: UpdateAdvertDto) {
    return this.advertRepository.update(id, updateAdvertDto);
  }

  remove(id: string) {
    return this.advertRepository.softDelete({ id });
  }
}
