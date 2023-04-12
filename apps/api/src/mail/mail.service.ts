import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private configService: ConfigService) {}

  public async sendSignupMail(reciever: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Welcome to Travel Tailor',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: reciever,
      },
    })
  }

  public async sendForgotPasswordMail(reciever: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Reset password demand',
      template: './forgot-password', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        resetLink,
      },
    })
  }

  public async sendConfirmResetPasswordMail(reciever: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Your password has been reset',
      template: './reset-password', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        reciever,
      },
    })
  }
}