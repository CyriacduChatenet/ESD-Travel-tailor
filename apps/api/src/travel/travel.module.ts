import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { Travel } from './entities/travel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Travel])],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
