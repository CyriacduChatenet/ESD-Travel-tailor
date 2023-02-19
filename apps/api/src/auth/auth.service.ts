import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

import { MailService } from '../mail/mail.service';
import { ResetPasswordTokenService } from '../reset-password-token/reset-password-token.service';
import { LoginUserInputDTO } from '../user/dto/login-user.dto';
import { SignupUserInputDTO } from '../user/dto/signup-user.dto';
import { UserService } from '../user/user.service';
import { ForgotPasswordDTO } from './dto/forgotPassword.dto';
import { ResetPasswordDTO } from './dto/resetPassword.dto';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private resetPasswordTokenService: ResetPasswordTokenService,
    private mailService: MailService,
  ) {}

  public async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
  }

  public async signin(user: LoginUserInputDTO) {
    const findUser = await this.userService.findOneByEmail(user.email);

    if (!findUser) {
      throw new HttpException(`User isn't exist`, HttpStatus.NOT_ACCEPTABLE);
    }

    const payload = {
      email: findUser.email,
      password: findUser.password,
      roles: findUser.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async signup(signupUserInputDTO: SignupUserInputDTO) {
    const user = await this.userService.findOneByEmail(
      signupUserInputDTO.email,
    );

    if (user) {
      throw new HttpException(
        'User is already exist',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const password = await bcrypt.hash(signupUserInputDTO.password, 10);

    return this.userService.create({
      ...signupUserInputDTO,
      password,
    });
  }

  public async forgotPassword(forgotPasswordDto: ForgotPasswordDTO) {
    const user = await this.userService.findOneByEmail(forgotPasswordDto.email);
    const resetToken = await this.resetPasswordTokenService.create(user.id);
    this.userService.update(user.id, {
      resetPasswordToken: resetToken.id,
    });
    return await this.mailService.sendForgotPasswordMail(
      forgotPasswordDto.email,
      `${process.env.VITE_APP_URL}/reset-password/${resetToken.token}`,
    );
  }

  public async resetPassword(
    resetToken: string,
    resetPasswordDto: { password },
  ) {
    const token = await this.resetPasswordTokenService.findOne(resetToken);
    const user = await this.userService.findOneByEmail(token.user.email);
    return this.userService.update(user.id, {
      password: await bcrypt.hash(resetPasswordDto.password, 10),
    });
  }
}
