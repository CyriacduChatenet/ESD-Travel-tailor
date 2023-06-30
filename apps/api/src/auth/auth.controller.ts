import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
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
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @Throttle(1000, 60)
  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({ description: 'Successful login' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  public async signin(@Body() signinUserInputDTO: SigninDTO) {
    return this.authService.signin(signinUserInputDTO)
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign up' })
  @ApiOkResponse({ description: 'Successful registration' })
  @ApiUnauthorizedResponse({ description: 'Invalid input data' })
  @Throttle(1000, 60)
  public signup(@Body() signupUserInputDTO: SignupDTO) {
    return this.authService.signup(signupUserInputDTO)
  }

  @Post('forgot-password')
  @Throttle(1000, 60)
  @ApiOperation({ summary: 'Forgot password' })
  @ApiOkResponse({ description: 'Password reset email sent' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  public forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDto)
  }

  @Post('reset-password/:token')
  @ApiOperation({ summary: 'Reset password' })
  @ApiOkResponse({ description: 'Password successfully reset' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @Throttle(1000, 60)
  public resetPassword(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDTO) {
    return this.authService.resetPassword(token, resetPasswordDto)
  }
}
