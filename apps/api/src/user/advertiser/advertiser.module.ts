import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdvertiserService } from './advertiser.service';
import { AdvertiserController } from './advertiser.controller';
import { Advertiser } from './entities/advertiser.entity';
import { AdvertiserRepository } from './advertiser.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Advertiser])],
  controllers: [AdvertiserController],
  providers: [AdvertiserRepository, AdvertiserService],
  exports: [AdvertiserService],
})
export class AdvertiserModule {}
