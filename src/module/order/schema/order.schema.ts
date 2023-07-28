import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/module/users/entities/user.entity';
import { Product } from 'src/module/products/entities/product.entity';

export type UserDocument = Order & Document;

export enum StatusOrder {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Array<mongoose.Schema.Types.ObjectId>, ref: 'Product' })
  products: Array<Product>;

  @Prop({ type: Number, default: 0, required: true })
  total_quantity: number;
  @Prop({ required: true, type: Number, default: 0 })
  total_price: number;

  @Prop({ required: true, type: String, maxLength: 3000, default: '' })
  shipping_address: string;

  @Prop({
    type: String,
    default: StatusOrder.Pending,
    enum: [StatusOrder.Pending, StatusOrder.Delivered, StatusOrder.Shipped],
  })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  create_uid: User;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
