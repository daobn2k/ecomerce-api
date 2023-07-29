import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/module/users/entities/user.entity';
export type VoucherDocument = Voucher & Document;

@Schema({ timestamps: true })
export class Voucher {
  @Prop({ type: String, require: true, maxLength: 256 })
  name: string;

  @Prop({ type: String, maxlength: 256 })
  code: string;

  @Prop({ type: Number, required: true, default: 0 })
  discount: number;

  @Prop({ required: true, type: Date })
  active_date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  recive_uid: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  create_uid: User;

  @Prop({ default: true })
  status: boolean;
}
export const VoucherSchema = SchemaFactory.createForClass(Voucher);
