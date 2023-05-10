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
      text: 'welcome',
      html: `<div>
      <p>Welcome to Travel tailor your account has been successfully created</p>
      </div>`,
    })
  }

  public async sendForgotPasswordMail(reciever: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: this.configService.get('MAILER_EMAIL'),
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
      from: this.configService.get('MAILER_EMAIL'),
      subject: 'Your password has been reset',
      text: 'welcome',
      html: `<div>
      <p>Your password has been successfully reset</p>
      </div>`,
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
      html: `<div>
      <p>Your invoice for your trip</p>
      </div>`,
    })
  }
}