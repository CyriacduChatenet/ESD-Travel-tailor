import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { SignupUserInputDTO } from './dto/signup-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Role } from '../auth/decorators/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() signupUserDto: SignupUserInputDTO): Promise<User> {
    return await this.userService.create(signupUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':email')
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.findOneByEmail(email);
  }

  @Patch(':email')
  async update(@Param('email') email: string, @Body() signupUserDto: any) {
    return await this.userService.update(email, signupUserDto);
  }

  @Delete(':id')
  @Roles(Role.Traveler)
  @Roles(Role.Advertiser)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.remove(id);
  }
}
