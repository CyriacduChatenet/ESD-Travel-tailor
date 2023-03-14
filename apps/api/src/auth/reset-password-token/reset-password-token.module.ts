import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResetPasswordTokenService } from './reset-password-token.service';
import { ResetPasswordTokenController } from './reset-password-token.controller';
import { ResetPasswordToken } from './entities/reset-password-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResetPasswordToken])],
  controllers: [ResetPasswordTokenController],
  providers: [ResetPasswordTokenService],
  exports: [ResetPasswordTokenService],
})
export class ResetPasswordTokenModule {}
