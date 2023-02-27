import { Module } from '@nestjs/common';
import { ConfigModule as ConfigMo } from '@nestjs/config';

@Module({
  imports: [
    ConfigMo.forRoot({
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
