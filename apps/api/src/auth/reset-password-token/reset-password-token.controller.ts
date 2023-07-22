import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { ResetPasswordTokenService } from './reset-password-token.service';
import { UpdateResetPasswordTokenDto } from './dto/update-reset-password-token.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../../config/decorators/roles.decorator';
import { Role } from '../../config/enum/role.enum';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('reset-password-token')
@ApiTags('Reset Password Token')
@UseGuards(ThrottlerGuard)
export class ResetPasswordTokenController {
  constructor(private readonly resetPasswordTokenService: ResetPasswordTokenService) {}

  @Post()
  @ApiOperation({ summary: 'Create reset token' })
  @ApiOkResponse({ description: 'Successful to create reset token' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(@Body() userId: string) {
    return await this.resetPasswordTokenService.create(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reset tokens' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiNotFoundResponse({ description: 'List of reset token not found' })
  async findAll() {
    return await this.resetPasswordTokenService.findAll();
  }

  @Get(':token')
  @ApiOperation({ summary: 'Get an reset token by ID' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiNotFoundResponse({ description: 'reset token not found' })
  async findOne(@Param('token') token: string) {
    return await this.resetPasswordTokenService.findOneByToken(token);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an reset token by ID' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to update reset token' })
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Traveler, Role.Admin)
  async update(@Param('id') id: string, @Body() updateResetPasswordTokenDto: UpdateResetPasswordTokenDto) {
    return await this.resetPasswordTokenService.update(id, updateResetPasswordTokenDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete an reset token by ID' })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to delete reset token' })
  @Throttle(1000, 60)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Advertiser, Role.Traveler, Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.resetPasswordTokenService.remove(id);
  }
}
