import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateBusinessHourDto {
  @IsNotEmpty()
  @IsString()
  professionalId: string;

  @IsArray()
  @IsNotEmpty()
  daysOfWeek: number[];

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;
}
