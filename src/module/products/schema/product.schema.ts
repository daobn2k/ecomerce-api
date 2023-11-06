import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/module/categories/entities/category.entity';
import { User } from 'src/module/users/entities/user.entity';
import { EStatus, TProductSize } from '../products.constant';

export type ProductDocument = Product & Document;
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, type: String, maxlength: 256, unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category_id: Category;

  @Prop({ required: true, type: String })
  price: string;

  @Prop({ required: false, type: String })
  price_amount: string;

  @Prop({ required: true, type: String })
  origin: string;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ type: String, default: EStatus.DEACTIVATE })
  status: EStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  create_uid: User;

  @Prop()
  coverImage: string;

  @Prop({ type: String, default: '', required: true })
  description: string;

  @Prop({ type: Array, default: [] })
  images: Array<string>;

  @Prop({ type: Array, default: '', required: true })
  size: TProductSize[];
}
export const ProductSchema = SchemaFactory.createForClass(Product);
