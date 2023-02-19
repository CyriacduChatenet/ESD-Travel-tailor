import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  public async sendForgotPasswordMail(reciever: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: reciever,
      from: 'noreply@nestjs.com',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      html: `<div>
      <p>You have send demand to reset your password</p>
      <a href="${resetLink}}">Reset your password here</a>
      </div>`,
    });
  }
}
