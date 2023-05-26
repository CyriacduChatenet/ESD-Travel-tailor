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
      context: {
        reciever,
        url: this.configService.get('CLIENT_APP_URL')
      }
    })
  }

  public async sendForgotPasswordMail(reciever: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Reset password demand',
      template: 'forgot-password',
      context: {
        resetLink,
        reciever,
        url: this.configService.get('CLIENT_APP_URL')
      }
    })
  }

  public async sendConfirmResetPasswordMail(reciever: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Your password has been reset',
      template: 'reset-password',
      context: {
        reciever,
        url: this.configService.get('CLIENT_APP_URL')
      }
    })
  }

  public async sendInvoiceMail(reciever: string, attachement: { filename: string, content: Buffer }) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Your invoice',
      attachments: [
        attachement
      ],
      template: 'invoice',
      context: {
        reciever,
        url: this.configService.get('CLIENT_APP_URL'),
        invoiceNumber: 2,
        invoiceDate: new Date().toLocaleDateString(),
        invoiceAmount: 1000,
        PaymentMethod: 'Credit card',
      }
    })
  }
}