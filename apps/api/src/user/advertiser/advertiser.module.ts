import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdvertiserService } from './advertiser.service';
import { AdvertiserController } from './advertiser.controller';
import { Advertiser } from './entities/advertiser.entity';
import { CustomerModule } from '../../payment/customer/customer.module';
import { AdvertiserRepository } from './advertiser.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Advertiser]), CustomerModule],
  controllers: [AdvertiserController],
  providers: [AdvertiserRepository, AdvertiserService],
})
export class AdvertiserModule {}
