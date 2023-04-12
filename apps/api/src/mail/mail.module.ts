import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MailerModule } from '@nestjs-modules/mailer';  
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { MailService } from './mail.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: process.env.NODE_ENV === 'production' ? {
        service: process.env.MAILER_SERVICE,
        host: process.env.MAILER_HOST,
        port: Number(process.env.MAILER_PORT),
        secure: true,
        auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_PASSWORD,
        },
      } : {
        host: process.env.MAILER_HOST,
        port: Number(process.env.MAILER_PORT),
        secure: false,
        auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_PASSWORD,
        },
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}