import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common'
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'
import { DeleteResult } from 'typeorm'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

import { SignupUserInputDTO } from './dto/signup-user.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { Role } from '../config/enum/role.enum'
import { Roles } from '../config/decorators/roles.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('user')
@UseGuards(ThrottlerGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Throttle(500, 60)
  async create(@Body() signupUserDto: SignupUserInputDTO): Promise<User> {
    return await this.userService.create(signupUserDto, signupUserDto.roles as Role)
  }

  @Get()
  @Throttle(500, 60)
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.userService.findAll(queries)
  }

  @Get(':email')
  @Throttle(500, 60)
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.findOneByEmail(email)
  }

  @Patch(':id')
  @Throttle(500, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  async update(@Param('id') id: string, @Body() signupUserDto: SignupUserInputDTO) {
    return await this.userService.update(id, signupUserDto)
  }

  @Delete(':id')
  @Throttle(500, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.remove(id)
  }
}
