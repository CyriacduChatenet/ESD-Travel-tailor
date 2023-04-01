import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DayService } from './day.service';
import { DayController } from './day.controller';
import { Day } from './entities/day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Day])],
  controllers: [DayController],
  providers: [DayService]
})
export class DayModule {}
