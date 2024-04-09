import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class BusinessHour {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  })
  professionalId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  daysOfWeek: number[];

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;
}

export type BusinessHourDocument = BusinessHour & Document;
export const BusinessHourSchema = SchemaFactory.createForClass(BusinessHour);
