import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { ResetPasswordTokenService } from './reset-password-token.service';
import { UpdateResetPasswordTokenDto } from './dto/update-reset-password-token.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../../config/decorators/roles.decorator';
import { Role } from '../../config/enum/role.enum';

@Controller('reset-password-token')
@UseGuards(ThrottlerGuard)
export class ResetPasswordTokenController {
  constructor(private readonly resetPasswordTokenService: ResetPasswordTokenService) {}

  @Post()
  async create(@Body() userId: string) {
    return await this.resetPasswordTokenService.create(userId);
  }

  @Get()
  async findAll() {
    return await this.resetPasswordTokenService.findAll();
  }

  @Get(':token')
  async findOne(@Param('token') token: string) {
    return await this.resetPasswordTokenService.findOneByToken(token);
  }

  @Patch(':id')
  @Throttle(100, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Traveler, Role.Admin)
  async update(@Param('id') id: string, @Body() updateResetPasswordTokenDto: UpdateResetPasswordTokenDto) {
    return await this.resetPasswordTokenService.update(id, updateResetPasswordTokenDto);
  }

  @Delete(':id')
  @Throttle(100, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Traveler, Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.resetPasswordTokenService.remove(id);
  }
}
