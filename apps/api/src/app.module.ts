import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdvertiserModule } from './user/advertiser/advertiser.module';
import { AdvertModule } from './user/advertiser/advert/advert.module';
import { TravelerModule } from './user/traveler/traveler.module';
import { ResetPasswordTokenModule } from './auth/reset-password-token/reset-password-token.module';
import { MailModule } from './mail/mail.module';
import { TasteModule } from './user/traveler/taste/taste.module';
import { TravelModule } from './user/traveler/travel/travel.module';
import { CommentModule } from './comment/comment.module';
import { ActivityModule } from './activity/activity.module';
import { ActivityDetailModule } from './activity/activity-detail/activity-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_DATABASE_HOST,
      port: parseInt(process.env.POSTGRESQL_DATABASE_PORT),
      username: process.env.POSTGRESQL_DATABASE_USERNAME,
      password: process.env.POSTGRESQL_DATABASE_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    AdvertiserModule,
    AdvertModule,
    TravelerModule,
    ResetPasswordTokenModule,
    MailModule,
    TasteModule,
    TravelModule,
    CommentModule,
    ActivityModule,
    ActivityDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
