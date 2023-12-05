import { ObjectId } from 'mongoose';

export class Notification {
  title: string;
  message: string;
  receive_id: ObjectId;
  send_id: ObjectId;
  is_read: boolean;
  dataBody: any;
}
