// UpdateBusinessHourDto
import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessHourDto } from './create-business-hours.dto';

export class UpdateBusinessHourDto extends PartialType(CreateBusinessHourDto) {}
