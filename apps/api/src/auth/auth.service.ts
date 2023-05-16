import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SigninDTO, SignupDTO, ForgotPasswordDTO } from '@travel-tailor/types'
import * as bcrypt from 'bcrypt'

import { MailService } from '../mail/mail.service'
import { UserService } from '../user/user.service'
import { ResetPasswordDTO } from './dto/resetPassword.dto'
import { ResetPasswordTokenService } from './reset-password-token/reset-password-token.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private resetPasswordTokenService: ResetPasswordTokenService,
    private mailService: MailService
  ) {}

  public async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email)

    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (user && isMatch) {
      const { password, ...result } = user
      return result
    }
  }

  public async validateGoogleOAuth(user: { emails: [{value: string}], username: string}): Promise<any> {
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    const email = user.emails[0].value
    const findUser = await this.userService.findOneByEmail(email)

    if (!findUser) {
      const newUser = await this.userService.create({
        email: email,
        username: user.username,
      })

      const payload = {
        email: newUser.email,
        roles: newUser.roles,
      }
      return {
        accessToken: this.jwtService.sign(payload),
        user: newUser,
      }
    } else {
      const payload = {
        email: findUser.email,
        roles: findUser.roles,
      }
      return {
        accessToken: this.jwtService.sign(payload),
        user: findUser,
      }
    }
  }

  public async signin(user: SigninDTO) {
    try {
      const findUser = await this.userService.findOneByEmail(user.email)

    if (!findUser) {
      throw new HttpException(`User isn't exist`, HttpStatus.NOT_ACCEPTABLE)
    }

    const payload = {
      email: findUser.email,
      roles: findUser.roles,
    }
    return {
      accessToken: this.jwtService.sign(payload),
    }
    } catch (err) {
      throw new UnauthorizedException(err)
    }
  }

  public async signup(signupUserInputDTO: SignupDTO) {
    try {
      const userInDB = await this.userService.findOneByEmail(
        signupUserInputDTO.email
      )
  
      if (userInDB) {
        throw new HttpException(
          'User is already exist',
          HttpStatus.NOT_ACCEPTABLE
        )
      }
  
      const password = await bcrypt.hash(signupUserInputDTO.password, 10)
  
      const user = await this.userService.create({
        ...signupUserInputDTO,
        password,
      })
  
      await this.mailService.sendSignupMail(signupUserInputDTO.email)
  
      const payload = {
        email: signupUserInputDTO.email,
        password: signupUserInputDTO.password,
        roles: signupUserInputDTO.roles,
      }
      return {
        signinToken: this.jwtService.sign(payload),
        user,
      }
    } catch (err) {
      throw new UnauthorizedException(err)
    }
  }

  public async forgotPassword(forgotPasswordDto: ForgotPasswordDTO) {
    try {
      const user = await this.userService.findOneByEmail(forgotPasswordDto.email)
      const resetToken = await this.resetPasswordTokenService.create(user.id)
      const userUpdated = await this.userService.update(user.id, {
        resetPasswordToken: resetToken.id,
      })
      await this.mailService.sendForgotPasswordMail(
        forgotPasswordDto.email,
        `${process.env.CLIENT_APP_URL}/reset-password/${resetToken.token}`
      )
      return userUpdated
    } catch (err) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  public async resetPassword(
    resetToken: string,
    resetPasswordDto: ResetPasswordDTO
  ) {
    try {
      const token = await this.resetPasswordTokenService.findOneByToken(
        resetToken.slice(0, -1)
      )
      const user = await this.userService.findOneByEmail(token.user.email)
      const userUpdated = await this.userService.update(user.id, {
        ...user,
        password: await bcrypt.hash(resetPasswordDto.password, 10),
      })
      await this.mailService.sendConfirmResetPasswordMail(user.email)
      return userUpdated
    } catch (error) {
      throw new HttpException(
        'Invalid token',
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
