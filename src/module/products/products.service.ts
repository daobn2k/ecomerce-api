import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handlingError, rgx } from 'src/utils/function.utils';
import { CreateProductDto, QueryListProducts } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { DISCOUNT, ENumSort } from 'src/constants/interface.constants';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(CreateProductDto: CreateProductDto) {
    const isExistProd = await this.productModel.findOne({
      username: CreateProductDto.name,
    });

    if (isExistProd) {
      return {
        data: null,
        result: 'ERROR',
        message: 'Tên sản phẩm đã tồn tại',
      };
    }
    const createdUser = new this.productModel(CreateProductDto);
    const result = await createdUser.save();
    return {
      data: result,
      result: 'SUCCESS',
      message: 'Tạo mới sản phẩm thành công',
    };
  }

  async findAll(query: QueryListProducts) {
    const {
      page = 1,
      limit = 20,
      keyword = '',
      status,
      category_id,
      sort_by = 'createdAt',
      order_by = ENumSort.DESC,
      is_discount,
      start_created_date,
      end_created_date,
    } = query;
    const skip: number = (page - 1) * limit;

    const listQuery: any = {};

    if (keyword) {
      listQuery.name = rgx(keyword);
    }
    if (status) {
      listQuery.status = rgx(status);
    }
    if (category_id) {
      listQuery.category_id = category_id;
    }
    if (is_discount) {
      if (is_discount === DISCOUNT.DISCOUNT) {
        listQuery.price_discount = { $exists: true };
      }
      if (is_discount === DISCOUNT.NOT_DISCOUNT) {
        listQuery.price_discount = { $exists: false };
      }
    }
    if (start_created_date && end_created_date) {
      listQuery.createdAt = {
        $gte: startOfDay(new Date(start_created_date)),
        $lte: endOfDay(new Date(end_created_date)),
      };
    }
    const res = await this.productModel
      .find(listQuery)
      .populate('create_uid')
      .populate('category_id')
      .limit(+limit)
      .skip(skip)
      .sort({ [sort_by]: order_by })
      .exec();

    const count = await this.productModel.find(listQuery).count().exec();
    return {
      result: 'SUCCESS',
      data: res,
      total: count,
      page: +page,
      limit: +limit,
    };
  }

  async findOne(id: string) {
    try {
      const result = await this.productModel
        .findById(id)
        .populate('create_uid')
        .populate('category_id')
        .exec();

      console.log(result, 'result');

      return {
        result: 'SUCCESS',
        data: result,
      };
    } catch (error) {
      return handlingError('Không tìm thấy sản phẩm', error);
    }
  }

  async update(id: string, UpdateProductDto: UpdateProductDto) {
    const result = await this.productModel.findByIdAndUpdate(
      id,
      UpdateProductDto,
      {
        new: true,
      },
    );
    return {
      result: 'SUCCESS',
      message: 'Chỉnh sửa sản phẩm thành công',
      data: result,
    };
  }

  async remove(id: string) {
    const res = await this.productModel.findByIdAndDelete(id, { new: true });
    return {
      data: res,
      result: 'SUCCESS',
      message: 'Xóa sản phẩm thành công',
    };
  }
}
