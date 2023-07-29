import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handlingError, rgx } from 'src/utils/function.utils';
import { Voucher } from '../voucher/entities/voucher.entity';
import { CreateOrderDto, QueryListOrder } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { isEmpty } from 'lodash';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Voucher.name) private voucherModel: Model<Voucher>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      if (!isEmpty(createOrderDto.voucher_code)) {
        const checkVoucher = await this.voucherModel
          .findOne({
            code: rgx(createOrderDto.voucher_code),
          })
          .exec();

        if (!checkVoucher) {
          return handlingError('Mã giảm giá không tồn tại', null);
        }
      }
      const createdOrder = new this.orderModel(createOrderDto);
      const result = await createdOrder.save();
      await this.voucherModel.findOneAndUpdate(
        { code: rgx(createOrderDto.voucher_code) },
        { status: false },
        { new: true },
      );
      return {
        data: result,
        result: 'RESULT',
        message: 'Tạo mới đơn hàng  thành công',
      };
    } catch (error) {
      handlingError('Tạo mới đơn hàng thất bại', error);
    }
  }

  async findAll(query: QueryListOrder) {
    const { page = 1, limit = 20, keyword = '' } = query;
    const skip: number = (page - 1) * limit;

    const listQuery: any = {};

    if (keyword) {
      listQuery.name = rgx(keyword);
    }
    try {
      const res = await this.orderModel
        .find(listQuery)
        .populate('create_uid')
        .populate({ path: 'items.product', model: 'Product' })
        .limit(+limit)
        .skip(skip)
        .sort({ create_date: -1 })
        .exec();

      const count = await this.orderModel.find(listQuery).count().exec();
      return {
        result: 'SUCCESS',
        data: res,
        totalItems: count,
        page: +page,
        limit: +limit,
      };
    } catch (error) {
      handlingError('Đã có lỗi xảy ra khi lấy danh sách đơn hàng', error);
    }
  }

  async update(id: string, UpdateOrderDto: UpdateOrderDto) {
    try {
      const result = await this.orderModel.findByIdAndUpdate(
        id,
        UpdateOrderDto,
        {
          new: true,
        },
      );
      return {
        result: 'SUCCESS',
        message: 'Chỉnh sửa đơn hàng  thành công',
        data: result,
      };
    } catch (error) {
      handlingError('Chỉnh sửa đơn hàng  thất bại', error);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.orderModel
        .findById(id)
        .populate('create_uid')
        .populate({ path: 'items.product', model: 'Product' })
        .exec();
      return {
        result: 'SUCCESS',
        data: result,
      };
    } catch (error) {
      return handlingError('Không tìm thấy đơn hàng ', error);
    }
  }
  async remove(id: string) {
    try {
      const res = await this.orderModel.findByIdAndDelete(id, { new: true });
      return {
        data: res,
        result: 'SUCCESS',
        message: 'Xóa đơn hàng thành công',
      };
    } catch (error) {
      handlingError('Xóa đơn hàng thất bại', error);
    }
  }
}
