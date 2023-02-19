import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';

import { LoginUserInputDTO } from '../user/dto/login-user.dto';
import { SignupUserInputDTO } from '../user/dto/signup-user.dto';
import { AuthService } from './auth.service';
import { ForgotPasswordDTO } from './dto/forgotPassword.dto';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  public async signin(@Body() signinUserInputDTO: LoginUserInputDTO) {
    return this.authService.signin(signinUserInputDTO);
  }

  @Post('signup')
  public signup(@Body() signupUserInputDTO: SignupUserInputDTO) {
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
