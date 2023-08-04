import { ObjectId } from 'mongoose';

export class Category {
  name: string;
  description: string;
  create_uid: ObjectId;
}
