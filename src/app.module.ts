import { UsersModule } from './users/users.custom.module';

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as morgan from 'morgan';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { BusinessHoursModule } from './business-hours/business-hours.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    BusinessHoursModule,
    AppointmentModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(morgan('dev'))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
