import { ObjectId } from 'mongoose';
import { TProductSize } from '../products.constant';

export class Product {
  name: string;
  price: string;
  size: TProductSize[];
  // color: string;
  create_uid: ObjectId;
  origin: string;
  quantity: number;
  status: string;
  coverImage: string;
  images: Array<string>;
  description: string;
  price_amount: string;
}
