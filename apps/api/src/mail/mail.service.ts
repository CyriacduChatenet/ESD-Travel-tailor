import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  public async sendSignupMail(reciever: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: 'noreply@travel-tailor.com',
      subject: 'Welcome to Travel Tailor',
      text: 'welcome',
      html: `<div>
      <p>Welcome to Travel tailor your account has been successfully created</p>
      </div>`,
    })
  }

  public async sendForgotPasswordMail(reciever: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: 'noreply@travel-tailor.com',
      subject: 'Reset password demand',
      text: 'welcome',
      html: `<div>
      <p>You have send demand to reset your password</p>
      <a href="${resetLink}}">Reset your password here</a>
      </div>`,
    })
  }

  public async sendConfirmResetPasswordMail(reciever: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: 'noreply@travel-tailor.com',
      subject: 'Your password has been reset',
      text: 'welcome',
      html: `<div>
      <p>Your password has been successfully reset</p>
      </div>`,
    })
  }
}
