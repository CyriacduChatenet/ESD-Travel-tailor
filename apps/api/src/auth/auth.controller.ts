import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { LoginUserInputDTO } from '../user/dto/login-user.dto';
import { SignupUserInputDTO } from '../user/dto/signup-user.dto';
import { AuthService } from './auth.service';
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
}
