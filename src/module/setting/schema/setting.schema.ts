import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type SettingDocument = Setting & mongoose.Document;
@Schema({ timestamps: true })
export class Setting {
  @Prop({ required: true, type: String, maxlength: 256, unique: true })
  type: string;
  @Prop({ type: String })
  description: string;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  value: any;
}
export const SettingSchema = SchemaFactory.createForClass(Setting);
