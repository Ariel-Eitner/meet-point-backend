import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { UserCustomBase, UserCustomSchema } from 'src/users/user.custom.schema';
import {
  BusinessHour,
  BusinessHourSchema,
} from 'src/business-hours/business-hours.schema';
import { BusinessHoursModule } from 'src/business-hours/business-hours.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: UserCustomBase.name, schema: UserCustomSchema },
      { name: BusinessHour.name, schema: BusinessHourSchema },
    ]),
    BusinessHoursModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentModule, MongooseModule],
})
export class AppointmentModule {}
