import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: String, maxlength: 256 })
  username: string;

  @Prop({ required: true, type: String, maxlength: 256 })
  password: string;

  @Prop({ required: true, type: String, maxlength: 256 })
  name: string;

  @Prop({ required: true, type: String })
  gender: string;

  @Prop({ required: true, type: String, maxlength: 256 })
  address: string;

  @Prop({ required: true, type: String, maxlength: 11 })
  phone: string;

  @Prop()
  avatar: string;

  @Prop()
  role: string;

  @Prop({ required: true, type: String, maxlength: 64 })
  email: string;

  @Prop()
  status: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
