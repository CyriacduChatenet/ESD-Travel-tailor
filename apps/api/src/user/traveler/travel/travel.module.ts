import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { Travel } from './entities/travel.entity';
import { PlanningModule } from './planning/planning.module';

@Module({
  imports: [TypeOrmModule.forFeature([Travel]), forwardRef(() => PlanningModule)],
  controllers: [TravelController],
  providers: [TravelService],
  exports: [TravelService],
})
export class TravelModule {}
