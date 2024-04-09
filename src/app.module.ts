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
import { UsersModule } from './users/users.module';
import { ProfessionalInfoModule } from './professional-info/professional-info.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    BusinessHoursModule,
    AppointmentModule,
    ProfessionalInfoModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(morgan('dev'))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
