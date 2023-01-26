import { Module } from '@nestjs/common';
import { ConfigModule as ConfModule } from '@nestjs/config';

@Module({
  imports: [
    ConfModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
