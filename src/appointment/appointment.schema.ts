import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Appointment {
  @Prop({ required: true, type: Date })
  startDate: Date;

  @Prop({ required: true, type: Date })
  endDate: Date;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserCustomBase',
    unique: true,
  })
  professionalId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserCustomBase',
    required: false,
  })
  userId?: mongoose.Schema.Types.ObjectId;

  @Prop()
  confirmation?: boolean;

  @Prop({ enum: ['pending', 'completed', 'canceled'] })
  paymentStatus?: string;

  @Prop()
  meetLink?: string;

  @Prop({ required: true })
  isBlock: boolean;

  @Prop()
  message?: string;
}

export type AppointmentDocument = Appointment & Document;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
