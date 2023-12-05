import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/module/users/entities/user.entity';

export type NotificationDocument = Notification & Document;
@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true, type: String })
  title: string;
  @Prop({ required: true, type: String })
  message: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  receive_id: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  send_id: User;
  @Prop({ type: Boolean, default: false })
  is_read: boolean;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  dataBody: any;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);
