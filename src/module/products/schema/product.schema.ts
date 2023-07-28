import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/module/users/entities/user.entity';
import { Category } from 'src/module/categories/entities/category.entity';

export type UserDocument = Product & Document;
@Schema()
export class Product {
  @Prop({ required: true, type: String, maxlength: 256 })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category_id: Category;

  @Prop({ required: true, type: String, maxlength: 256 })
  price: string;

  @Prop({ required: true, type: Number })
  size: number;

  @Prop({ required: true, type: String, maxlength: 256 })
  color: string;

  @Prop({ required: true, type: String })
  origin: string;

  @Prop({ required: true, type: Number, maxlength: 256 })
  quantity: number;

  //   0 hết hàng , 1 đang thực hiện , 2 khóa //

  @Prop({ type: String, default: '1' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  create_uid: User;

  @Prop()
  coverImage: string;

  @Prop({ type: Array, default: [] })
  images: Array<string>;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
