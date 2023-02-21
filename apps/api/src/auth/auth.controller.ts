import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  SigninDTO,
  SignupDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
} from '@travel-manager/types';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  public async signin(@Body() signinUserInputDTO: SigninDTO) {
    return this.authService.signin(signinUserInputDTO);
  }

  @Post('signup')
  public signup(@Body() signupUserInputDTO: SignupDTO) {
    return this.authService.signup(signupUserInputDTO);
  }

  @Post('forgot-password')
  public forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password/:token')
  public resetPassword(
    @Param(':token') token: string,
    @Body() resetPasswordDto: ResetPasswordDTO,
  ) {
    return this.authService.resetPassword(token, resetPasswordDto);
  }
}
