import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DayService } from './day.service';
import { DayController } from './day.controller';
import { Day } from './entities/day.entity';
import { DayRepository } from './day.repository';
import { TravelModule } from '../travel.module';

@Module({
  imports: [TypeOrmModule.forFeature([Day]), forwardRef(() => TravelModule)],
  controllers: [DayController],
  providers: [DayRepository, DayService],
  exports: [DayService],
})
export class DayModule {}
