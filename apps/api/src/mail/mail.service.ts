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
      template: 'signup',
    })
  }

  public async sendForgotPasswordMail(reciever: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Reset password demand',
      template: 'forgot-password',
      context: {
        resetLink
      }
    })
  }

  public async sendConfirmResetPasswordMail(reciever: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Your password has been reset',
      template: 'reset-password',
    })
  }

  public async sendInvoiceMail(reciever: string, attachement: { filename: string, content: Buffer }) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Your invoice',
      text: 'welcome',
      attachments: [
        attachement
      ],
      template: 'invoice',
    })
  }
}