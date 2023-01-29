import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdvertiserService } from './advertiser.service';
import { AdvertiserController } from './advertiser.controller';
import { Advertiser } from './entities/advertiser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advertiser])],
  controllers: [AdvertiserController],
  providers: [AdvertiserService],
})
export class AdvertiserModule {}
