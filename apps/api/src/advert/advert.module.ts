import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdvertService } from './advert.service';
import { AdvertController } from './advert.controller';
import { Advert } from './entities/advert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advert])],
  controllers: [AdvertController],
  providers: [AdvertService],
})
export class AdvertModule {}
