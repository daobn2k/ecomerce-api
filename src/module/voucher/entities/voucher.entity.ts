import { ObjectId } from 'mongoose';

export class Voucher {
  name: string;
  code: string;
  discount: number;
  active_date: Date;
  recive_uid: ObjectId;
  create_uid: ObjectId;
  status: boolean;
}
