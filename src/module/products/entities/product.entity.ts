import { ObjectId } from 'mongoose';

export class Product {
  name: string;
  price: number;
  // size: number;
  // color: string;
  create_uid: ObjectId;
  origin: string;
  quantity: number;
  status: string;
  coverImage: string;
  images: Array<string>;
  description: string;
}
