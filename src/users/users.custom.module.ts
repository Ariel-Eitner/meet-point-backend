import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCustomBase, UserCustomSchema } from './user.custom.schema';
import { UsersService } from './users.custom.service';
import { UsersController } from './users.custom.controller';
import {
  Appointment,
  AppointmentSchema,
} from 'src/appointment/appointment.schema';
import {
  BusinessHour,
  BusinessHourSchema,
} from 'src/business-hours/business-hours.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCustomBase.name, schema: UserCustomSchema },
      { name: Appointment.name, schema: AppointmentSchema },
      { name: BusinessHour.name, schema: BusinessHourSchema },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersModule, MongooseModule],
})
export class UsersModule {}
