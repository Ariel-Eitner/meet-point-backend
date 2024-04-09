// src/professional-info/dto/update-professional-info.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalInfoDto } from './create-professional-info.dto';

export class UpdateProfessionalInfoDto extends PartialType(
  CreateProfessionalInfoDto,
) {}
