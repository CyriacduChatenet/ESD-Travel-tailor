import { Module } from '@nestjs/common';

import { ActivityMarkService } from './activity-mark.service';
import { ActivityMarkController } from './activity-mark.controller';
import { ActivityMarkRepository } from './activty-mark.repository';

@Module({
  controllers: [ActivityMarkController],
  providers: [ActivityMarkRepository, ActivityMarkService]
})
export class ActivityMarkModule {}
