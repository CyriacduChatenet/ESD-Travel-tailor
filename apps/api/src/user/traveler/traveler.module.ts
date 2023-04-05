import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TravelerService } from './traveler.service';
import { TravelerController } from './traveler.controller';
import { Traveler } from './entities/traveler.entity';
import { CustomerModule } from '../../payment/customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Traveler]), CustomerModule],
  controllers: [TravelerController],
  providers: [TravelerService],
  exports: [TravelerService],
})
export class TravelerModule {}
