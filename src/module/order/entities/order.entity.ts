import { ObjectId } from 'mongoose';
import { ProductDocument } from 'src/module/products/schema/product.schema';

export class Order {
  code: string;
  products: ProductDocument[];
  total_quantity: number;
  total_price: number;
  shipping_address: string;
  status: string;
  create_uid: ObjectId;
  voucher_code: string;
}
