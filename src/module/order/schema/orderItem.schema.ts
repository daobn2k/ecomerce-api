import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/module/products/entities/product.entity';
import { TProductSize } from 'src/module/products/products.constant';

export type OrderItemDocument = OrderItem & Document;
export class OrderItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({ type: Number, default: 1, required: true })
  quantity: number;

  @Prop({ type: Number, default: 0 })
  price: number;

  @Prop({ type: String, default: 'S' })
  size: TProductSize;
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
