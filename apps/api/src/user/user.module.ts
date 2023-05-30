import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entities/user.entity'
import { UserRepository } from './user.repository'
import { TravelerModule } from './traveler/traveler.module'
import { AdvertiserModule } from './advertiser/advertiser.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), TravelerModule, AdvertiserModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
