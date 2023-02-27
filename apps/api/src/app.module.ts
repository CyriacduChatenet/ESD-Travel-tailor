import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdvertiserModule } from './advertiser/advertiser.module';
import { AdvertModule } from './advert/advert.module';
import { TravelerModule } from './traveler/traveler.module';
import { ResetPasswordTokenModule } from './reset-password-token/reset-password-token.module';
import { MailModule } from './mail/mail.module';
import { TasteModule } from './taste/taste.module';
import { TravelModule } from './travel/travel.module';
import { CommentModule } from './comment/comment.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
