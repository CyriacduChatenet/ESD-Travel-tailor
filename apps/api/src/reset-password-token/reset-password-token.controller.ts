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
  create(@Body() userId: string) {
    return this.resetPasswordTokenService.create(userId);
  }

  @Get()
  findAll() {
    return this.resetPasswordTokenService.findAll();
  }

  @Get(':token')
  findOne(@Param('id') id: string) {
    return this.resetPasswordTokenService.findOne(id);
  }

  @Patch(':token')
  update(
    @Param('id') id: string,
    @Body() updateResetPasswordTokenDto: UpdateResetPasswordTokenDto,
  ) {
    return this.resetPasswordTokenService.update(
      id,
      updateResetPasswordTokenDto,
    );
  }

  @Delete(':token')
  remove(@Param('id') id: string) {
    return this.resetPasswordTokenService.remove(id);
  }
}
