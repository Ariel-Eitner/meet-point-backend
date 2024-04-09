import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),

    UsersModule,
  ],

  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentModule, MongooseModule],
})
export class AppointmentModule {}
