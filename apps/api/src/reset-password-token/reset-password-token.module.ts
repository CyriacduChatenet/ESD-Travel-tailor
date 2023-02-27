import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { ResetPasswordTokenService } from './reset-password-token.service';
import { ResetPasswordTokenController } from './reset-password-token.controller';
import { ResetPasswordToken } from './entities/reset-password-token.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ResetPasswordToken]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '21d' },
    }),
  ],
  controllers: [ResetPasswordTokenController],
  providers: [ResetPasswordTokenService],
  exports: [ResetPasswordTokenService],
})
export class ResetPasswordTokenModule {}
