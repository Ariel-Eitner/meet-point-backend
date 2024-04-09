import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessionalInfoService } from './professional-info.service';
import { ProfessionalInfoController } from './professional-info.controller';
import {
  ProfessionalInfo,
  ProfessionalInfoSchema,
} from './professional-info.schema';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProfessionalInfo.name, schema: ProfessionalInfoSchema },
    ]),
    UsersModule,
  ],
  providers: [ProfessionalInfoService],
  controllers: [ProfessionalInfoController],
  exports: [ProfessionalInfoModule, MongooseModule],
})
export class ProfessionalInfoModule {}
