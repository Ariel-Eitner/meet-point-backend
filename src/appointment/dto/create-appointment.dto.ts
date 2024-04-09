import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsMongoId()
  professionalId: string;

  @IsMongoId()
  @IsOptional()
  userId?: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsBoolean()
  confirmation: boolean;

  @IsEnum(['pending', 'completed', 'canceled'])
  paymentStatus: string;

  @IsString()
  @IsOptional()
  meetLink?: string;

  @IsBoolean()
  isBlock: boolean;
}
