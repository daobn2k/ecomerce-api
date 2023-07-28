import { ObjectId } from 'mongoose';

export class Order {
  products: ObjectId[];
  total_quantity: number;
  total_price: number;
  shipping_address: string;
  status: string;
  create_uid: ObjectId;
}
