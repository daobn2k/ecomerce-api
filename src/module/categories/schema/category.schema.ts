import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/module/users/entities/user.entity';

export type UserDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, type: String, maxlength: 256, unique: true })
  name: string;

  @Prop({ required: false, type: String, maxlength: 256 })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  create_uid: User;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
