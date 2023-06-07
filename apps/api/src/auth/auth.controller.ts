import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'
import {
  SigninDTO,
  SignupDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
} from '@travel-tailor/types'

import { AuthService } from './auth.service'

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @Throttle(500, 60)
  public async signin(@Body() signinUserInputDTO: SigninDTO) {
    return this.authService.signin(signinUserInputDTO)
  }

  @Post('signup')
  @Throttle(500, 60)
  public signup(@Body() signupUserInputDTO: SignupDTO) {
    return this.authService.signup(signupUserInputDTO)
  }

  @Post('forgot-password')
  @Throttle(500, 60)
  public forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDto)
  }

  @Post('reset-password/:token')
  @Throttle(500, 60)
  public resetPassword(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDTO) {
    return this.authService.resetPassword(token, resetPasswordDto)
  }
}
