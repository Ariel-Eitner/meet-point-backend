import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  // @Prop({ required: true })
  // lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ enum: ['professional', 'client'], required: true })
  role: string;

  // @Prop()
  // password?: string;
  @Prop()
  refreshToken?: string;

  @Prop({ unique: true, sparse: true })
  googleId?: string;

  @Prop()
  phone?: string;

  @Prop()
  country?: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
