import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ActivityService } from './activity.service'
import { ActivityController } from './activity.controller'
import { Activity } from './entities/activity.entity'
import { ActivityDetailModule } from './activity-detail/activity-detail.module'
import { ActivityTagModule } from './activity-tag/activity-tag.module'
import { UploadFileModule } from '../upload-file/upload-file.module'
import { ActivityImageModule } from './activity-image/activity-image.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
    ActivityDetailModule,
    ActivityTagModule,
    UploadFileModule,
    ActivityImageModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService]
})
export class ActivityModule {}
