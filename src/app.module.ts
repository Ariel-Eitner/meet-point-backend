import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as morgan from 'morgan';
// import { ConfigModule, ConfigService } from '@nestjs/config';

import { BusinessHoursModule } from './business-hours/business-hours.module';
import { AppointmentModule } from './appointment/appointment.module';
import { UsersModule } from './users/users.module';
import { ProfessionalInfoModule } from './professional-info/professional-info.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ariel10e:ObfKoNhMOOI0g7c3@meet-point.rvzvhii.mongodb.net/?retryWrites=true&w=majority&appName=meet-point',
    ),
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
