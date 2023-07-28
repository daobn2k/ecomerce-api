import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handlingError, rgx } from 'src/utils/function.utils';
import { CreateProductDto, QueryListProducts } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(CreateProductDto: CreateProductDto) {
    try {
      const createdUser = new this.productModel(CreateProductDto);
      const result = await createdUser.save();
      return {
        data: result,
        result: 'RESULT',
        message: 'Tạo mới sản phẩm thành công',
      };
    } catch (error) {
      handlingError('Tạo mới sản phẩm thất bại', error);
    }
  }

  async findAll(query: QueryListProducts) {
    const { page = 1, perPage = 20, keyword = '' } = query;
    const skip: number = (page - 1) * perPage;

    const listQuery: any = {};

    if (keyword) {
      listQuery.name = rgx(keyword);
    }
    try {
      const res = await this.productModel
        .find(listQuery)
        .populate('create_uid')
        .populate('category_id')
        .limit(+perPage)
        .skip(skip)
        .sort({ create_date: -1 })
        .exec();

      return {
        result: 'SUCCESS',
        data: res,
      };
    } catch (error) {}
  }

  async findOne(id: string) {
    try {
      const result = await this.productModel.findById(id).exec();
      return {
        result: 'SUCCESS',
        data: result,
      };
    } catch (error) {
      return handlingError('Không tìm thấy sản phẩm', error);
    }
  }

  async update(id: string, UpdateProductDto: UpdateProductDto) {
    try {
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
    } catch (error) {
      handlingError('Chỉnh sửa sản phẩm thất bại', error);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.productModel.findByIdAndDelete(id, { new: true });
      return {
        data: res,
        result: 'SUCCESS',
        message: 'Xóa sản phẩm thành công',
      };
    } catch (error) {
      handlingError('Xóa sản phẩm thất bại', error);
    }
  }
}
