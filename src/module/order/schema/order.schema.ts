import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/module/users/entities/user.entity';
import { OrderItemDocument } from './orderItem.schema';

export type OrderDocument = Order & Document;

export enum StatusOrder {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'Delivered',
}

@Schema({ timestamps: true })
export class Order {
  @Prop()
  code: string;
  @Prop()
  items: [OrderItemDocument];

  @Prop({ type: Number, default: 1 })
  total_quantity: number;
  @Prop({ type: Number, default: 0 })
  total_price: number;

  @Prop({ required: true, type: String, maxLength: 3000, default: '' })
  shipping_address: string;

  @Prop({
    type: String,
    default: StatusOrder.PENDING,
    enum: [StatusOrder.PENDING, StatusOrder.DELIVERED, StatusOrder.SHIPPED],
  })
  status: string;

  @Prop({ type: String })
  voucher_code: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  create_uid: User;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
