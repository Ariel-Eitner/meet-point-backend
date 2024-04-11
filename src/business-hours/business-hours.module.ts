import { Module } from '@nestjs/common';
import { BusinessHoursService } from './business-hours.service';
import { BusinessHoursController } from './business-hours.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessHour, BusinessHourSchema } from './business-hours.schema';
import { UserCustomBase, UserCustomSchema } from 'src/users/user.custom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusinessHour.name, schema: BusinessHourSchema },
      { name: UserCustomBase.name, schema: UserCustomSchema },
    ]),
  ],
  controllers: [BusinessHoursController],
  providers: [BusinessHoursService],
  exports: [BusinessHoursService, MongooseModule],
})
export class BusinessHoursModule {}
