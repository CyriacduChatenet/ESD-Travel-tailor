import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResetPasswordTokenService } from './reset-password-token.service';
import { UpdateResetPasswordTokenDto } from './dto/update-reset-password-token.dto';

@Controller('reset-password-token')
export class ResetPasswordTokenController {
  constructor(
    private readonly resetPasswordTokenService: ResetPasswordTokenService,
  ) {}

  @Post()
  async create(@Body() userId: string) {
    return await this.resetPasswordTokenService.create(userId);
  }

  @Get()
  async findAll() {
    return await this.resetPasswordTokenService.findAll();
  }

  @Get(':token')
  async findOne(@Param('id') id: string) {
    return await this.resetPasswordTokenService.findOne(id);
  }

  @Patch(':token')
  async update(
    @Param('id') id: string,
    @Body() updateResetPasswordTokenDto: UpdateResetPasswordTokenDto,
  ) {
    return await this.resetPasswordTokenService.update(
      id,
      updateResetPasswordTokenDto,
    );
  }

  @Delete(':token')
  async remove(@Param('id') id: string) {
    return await this.resetPasswordTokenService.remove(id);
  }
}
