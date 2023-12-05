import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../order/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { OrderService } from '../order/order.service';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { log } from 'handlebars';
import { StatusOrder } from '../order/schema/order.schema';
import { Category } from '../categories/entities/category.entity';
import { rgx } from 'src/utils/function.utils';
@Injectable()
export class GeneralReportService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private readonly orderService: OrderService,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
  ) {}

  async getUserReport() {
    const total_user = await this.userModel
      .find({ role: rgx('USER') })
      .count()
      .exec();
    const total_admin = await this.userModel
      .find({ role: rgx('Admin') })
      .count()
      .exec();
    const total_user_active = await this.userModel
      .find({ status: rgx('1') })
      .count()
      .exec();
    const total_user_deActive = await this.userModel
      .find({ status: rgx('2') })
      .count()
      .exec();

    return {
      data: {
        total_user,
        total_user_active,
        total_user_deActive,
        total_admin,
      },
    };
  }

  async getProductReport() {
    const total_product = await this.productModel.find().count().exec();
    const total_category = await this.categoryModel.find().count().exec();

    return {
      data: {
        total_product,
        total_category,
      },
    };
  }
  async getOrderReport() {
    const countOrder = await this.orderModel.find().count().exec();

    const { total: total_order_shipping } = await this.orderService.findAll({
      status: StatusOrder.SHIPPED,
      page: 1,
      limit: 100000,
    });

    const { total: total_order_cancel } = await this.orderService.findAll({
      status: StatusOrder.CANCEL,
      page: 1,
      limit: 100000,
    });

    const { total: total_order_pending } = await this.orderService.findAll({
      status: StatusOrder.PENDING,
      page: 1,
      limit: 100000,
    });
    const { total: total_order_done, data } = await this.orderService.findAll({
      status: StatusOrder.DELIVERED,
      page: 1,
      limit: 100000,
    });

    const total_sold_price = data.reduce(
      (acc: any, ele) => acc + ele.total_price,
      0,
    );
    const total_sold_quantity = data.reduce(
      (acc: any, ele) => acc + ele.total_quantity,
      0,
    );

    return {
      data: {
        total_order: countOrder,
        total_order_done,
        total_order_shipping,
        total_order_cancel,
        total_order_pending,
        total_sold_price,
        total_sold_quantity,
      },
    };
  }
}
