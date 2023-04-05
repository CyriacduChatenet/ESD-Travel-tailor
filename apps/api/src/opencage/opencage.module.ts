import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OpencageService } from './opencage.service';
import { OpencageController } from './opencage.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [OpencageController],
  providers: [OpencageService],
  exports: [OpencageService],
})
export class OpencageModule {}
