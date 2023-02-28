import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelerService } from './traveler.service';
import { TravelerController } from './traveler.controller';
import { Traveler } from './entities/traveler.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Traveler])],
  controllers: [TravelerController],
  providers: [TravelerService],
})
export class TravelerModule {}
