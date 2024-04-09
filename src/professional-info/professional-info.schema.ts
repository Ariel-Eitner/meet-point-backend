import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class ProfessionalInfo {
  @Prop()
  field?: string;

  @Prop()
  specialty?: string;

  @Prop()
  experience?: string;

  @Prop()
  studies?: string;

  @Prop()
  licenseNumber?: string;

  @Prop()
  linkedin?: string;

  @Prop()
  facebook?: string;

  @Prop()
  github?: string;

  @Prop()
  portfolio?: string;

  @Prop()
  biography?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;
}

export type ProfessionalInfoDocument = ProfessionalInfo & Document;
export const ProfessionalInfoSchema =
  SchemaFactory.createForClass(ProfessionalInfo);
