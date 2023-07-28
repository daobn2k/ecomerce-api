import { ObjectId } from 'mongoose';

export class Category {
  name: string;
  create_uid: ObjectId;
}
