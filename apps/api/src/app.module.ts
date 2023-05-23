import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdvertiserModule } from './user/advertiser/advertiser.module';
import { TravelerModule } from './user/traveler/traveler.module';
import { MailModule } from './mail/mail.module';
import { TasteModule } from './user/traveler/taste/taste.module';
import { TravelModule } from './user/traveler/travel/travel.module';
import { CommentModule } from './comment/comment.module';
import { ActivityModule } from './activity/activity.module';
import { ActivityDetailModule } from './activity/activity-detail/activity-detail.module';
import { ActivityImageModule } from './activity/activity-image/activity-image.module';
import { ActivityTagModule } from './activity/activity-tag/activity-tag.module';
import { ActivityScheduleModule } from './activity/activity-detail/activity-schedule/activity-schedule.module';
import { ActivityClosingDayModule } from './activity/activity-detail/activity-closing-day/activity-closing-day.module';
import { PaymentModule } from './payment/payment.module';
import { DayModule } from './user/traveler/travel/day/day.module';
import { CustomerModule } from './payment/customer/customer.module';
import { OrderModule } from './payment/order/order.module';
import { TimeSlotModule } from './user/traveler/travel/day/time-slot/time-slot.module';
import { OpencageModule } from './opencage/opencage.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { CommentMarkModule } from './comment/comment-mark/comment-mark.module';

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
    TravelerModule,
    MailModule,
    TasteModule,
    TravelModule,
    CommentModule,
    ActivityModule,
    ActivityDetailModule,
    ActivityImageModule,
    ActivityTagModule,
    ActivityScheduleModule,
    ActivityClosingDayModule,
    PaymentModule,
    DayModule,
    CustomerModule,
    OrderModule,
    TimeSlotModule,
    OpencageModule,
    UploadFileModule,
    CommentMarkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
