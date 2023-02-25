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
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.remove(id);
  }
}
