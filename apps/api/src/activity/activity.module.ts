import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ActivityService } from './activity.service'
import { ActivityController } from './activity.controller'
import { Activity } from './entities/activity.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
