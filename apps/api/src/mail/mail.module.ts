import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: Number(process.env.MAILER_PORT),
        ignoreTLS: true,
        secure: false,
        auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
