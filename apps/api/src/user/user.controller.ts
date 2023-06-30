import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { DeleteResult } from 'typeorm';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

import { SignupUserInputDTO } from './dto/signup-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Role } from '../config/enum/role.enum';
import { Roles } from '../config/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(ThrottlerGuard)
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Created user successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() signupUserDto: SignupUserInputDTO): Promise<User> {
    return await this.userService.create(signupUserDto, signupUserDto.roles as Role)
  }

  @Get()
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Retrieved all users successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findAll(@Query() queries: ApiLimitResourceQuery) {
    return await this.userService.findAll(queries);
  }

  @Get(':email')
  @Throttle(1000, 60)
  @ApiOkResponse({ description: 'Retrieved user by email successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.findOneByEmail(email);
  }

  @Patch(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updated user successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id') id: string, @Body() signupUserDto: SignupUserInputDTO) {
    return await this.userService.update(id, signupUserDto);
  }

  @Delete(':id')
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Traveler, Role.Advertiser, Role.Admin)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Deleted user successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.remove(id);
  }
}
