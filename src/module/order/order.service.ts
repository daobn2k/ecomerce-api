import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  generateRandomString,
  handlingError,
  rgx,
} from 'src/utils/function.utils';
import { Voucher } from '../voucher/entities/voucher.entity';
import {
  CreateOrderDto,
  QueryListOrder,
  QueryListProductOrdered,
  actionDto,
} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { isEmpty } from 'lodash';
import { Product } from '../products/entities/product.entity';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { startOfDay, endOfDay } from 'date-fns';
import { ENumSort } from 'src/constants/interface.constants';
import { StatusOrder } from './schema/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Voucher.name) private voucherModel: Model<Voucher>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly mailService: MailService,
    private readonly userService: UsersService,
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

      if (createOrderDto.items.length > 0) {
        for (let index = 0; index < createOrderDto.items.length; index++) {
          const element: any = createOrderDto.items[index];

          const currentProd = await this.productModel.findOne({
            _id: element.product,
          });
          if (!currentProd)
            return handlingError(
              `Mã sản phẩm ${element.product} không tồn tại`,
              null,
            );

          const newQuantity: number = currentProd.quantity - element.quantity;
          if (newQuantity < 0)
            return handlingError(
              `Số lượng sản phẩm ${currentProd.name} không đủ đáp ứng`,
              null,
            );
          await this.productModel.findOneAndUpdate(
            { _id: element.product },
            { quantity: newQuantity },
            { new: true },
          );
        }
      }

      const payload = {
        ...createOrderDto,
        code: `YANG-${generateRandomString()}`,
      };
      const createdOrder = new this.orderModel(payload);

      const result = await createdOrder.save();
      if (result) {
        await this.voucherModel.findOneAndUpdate(
          { code: rgx(createOrderDto.voucher_code) },
          { status: false },
          { new: true },
        );

        const findCreateUid = await this.userService.findOne(
          String(createOrderDto.create_uid),
        );
        if (!findCreateUid)
          return handlingError('Người dùng không tồn tại', null);
        await this.mailService.sendEmail({
          to: findCreateUid.data.email,
          subject: 'Tạo mới đơn hàng thành công',
          content:
            'Đơn hàng của bạn đã tạo thành công, chúng tôi sẽ liên hệ với bộ phận giao hàng gửi cho bạn trong thời gian sớm nhất vui lòng chờ từ 2-3 ngày',
        });
        return {
          data: result,
          result: 'SUCCESS',
          message: 'Tạo mới đơn hàng  thành công',
        };
      }
    } catch (error) {
      handlingError('Tạo mới đơn hàng thất bại', error);
    }
  }

  async findAll(query: QueryListOrder) {
    const {
      page = 1,
      limit = 20,
      keyword = '',
      created_uid,
      status,
      start_created_date,
      end_created_date,
      sort_by = 'createdAt',
      order_by = ENumSort.DESC,
    } = query;
    const skip: number = (page - 1) * limit;

    const listQuery: any = {};

    if (keyword) {
      listQuery.name = rgx(keyword);
    }
    if (created_uid) {
      listQuery.created_uid = created_uid;
    }
    if (status) {
      listQuery.status = rgx(status);
    }
    if (start_created_date && end_created_date) {
      listQuery.createdAt = {
        $gte: startOfDay(new Date(start_created_date)),
        $lte: endOfDay(new Date(end_created_date)),
      };
    }
    try {
      const res = await this.orderModel
        .find(listQuery)
        .populate('create_uid')
        .populate({ path: 'items.product', model: 'Product' })
        .limit(+limit)
        .skip(skip)
        .sort({ [sort_by]: order_by })
        .exec();

      const count = await this.orderModel.find(listQuery).count().exec();
      return {
        result: 'SUCCESS',
        data: res,
        total: count,
        page: +page,
        limit: +limit,
      };
    } catch (error) {
      handlingError('Đã có lỗi xảy ra khi lấy danh sách đơn hàng', error);
    }
  }

  async update(id: string, UpdateOrderDto: UpdateOrderDto) {
    try {
      const orderDetail: any = await this.orderModel
        .findOne({ _id: id })
        .populate('create_uid')
        .exec();

      const emailOrder = orderDetail.create_uid?.email;

      if (!emailOrder) {
        return {
          result: 'ERROR',
          message: 'Không tìm thấy email người đặt',
          data: undefined,
        };
      }
      if (UpdateOrderDto.status === StatusOrder.SHIPPED) {
        await this.mailService.sendEmail({
          to: emailOrder,
          subject: 'Thông báo chuyển ship',
          content: `Mã đơn hàng ${orderDetail.code} của bạn đã chuyển ship , vui lòng chờ nhận hàng mọi thắc mắc xin liên hệ vào hotline`,
        });
      }
      if (UpdateOrderDto.status === StatusOrder.CANCEL) {
        await this.mailService.sendEmail({
          to: emailOrder,
          subject: 'Hủy đơn hàng',
          content: `Mã đơn hàng ${orderDetail.code} của bạn đã hủy`,
        });

        await this.mailService.sendEmail({
          to: 'vvdao096@gmail.com',
          subject: 'Hủy đơn hàng',
          content: `Mã đơn hàng ${orderDetail.code} đã bị hủy`,
        });
      }
      if (UpdateOrderDto.status === StatusOrder.DELIVERED) {
        await this.mailService.sendEmail({
          to: emailOrder,
          subject: 'Giao hàng thành công',
          content: `Cảm ơn bạn vì đã đặt hàng tại cửa hàng chúng tôi, chúc bạn và gia đình mạnh khỏe`,
        });
        await this.mailService.sendEmail({
          to: 'vvdao096@gmail.com',
          subject: 'Thanh toán thành công',
          content: `Mã đơn hàng ${orderDetail.code} đã thanh toán thành công`,
        });
      }
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
  // sản phẩm đax mua
  async findAllProductOrdered(body: QueryListProductOrdered) {
    try {
      const orders = await this.orderModel
        .find({ create_uid: new Types.ObjectId(String(body.create_uid)) })
        .populate('create_uid')
        .populate({ path: 'items.product', model: 'Product' })
        .exec();

      const products = orders.reduce((allProducts: any[], order: any) => {
        const orderProducts = order.items.map((item: any) => {
          return {
            orderId: order._id,
            _id: item.product._id,
            name: item.product.name,
            description: item.product.description,
            coverImage: item.product.coverImage,
            price: item.product.price,
            price_discount: item.product.price_discount,
            order_uid: orders[0].create_uid,
          };
        });
        return allProducts.concat(orderProducts);
      }, []);

      return {
        result: 'SUCCESS',
        data: products,
      };
    } catch (error) {
      handlingError('Đã có lỗi xảy ra khi lấy sản phẩm của người dùng', error);
    }
  }
}
