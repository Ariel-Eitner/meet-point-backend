import { Module } from '@nestjs/common';
import { BusinessHoursService } from './business-hours.service';
import { BusinessHoursController } from './business-hours.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.schema';
import { BusinessHour, BusinessHourSchema } from './business-hours.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusinessHour.name, schema: BusinessHourSchema },
    ]),
  ],
  providers: [BusinessHoursService],
  controllers: [BusinessHoursController],
  exports: [BusinessHoursService, MongooseModule],
})
export class BusinessHoursModule {}
