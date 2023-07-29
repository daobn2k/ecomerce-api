import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handlingError, rgx } from 'src/utils/function.utils';
import {
  CreateCategoryDto,
  QueryListCategories,
} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

interface queryCategories {
  name?: any;
}
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const result = await this.categoryModel.create(createCategoryDto);
      return {
        result: 'SUCCESS',
        data: result,
        message: 'Tạo mới loại sản phẩm thành công',
      };
    } catch (error) {
      handlingError('Tạo mới loại sản phẩm thất bại', error);
    }
  }

  async findAll(query: QueryListCategories) {
    const { page = 1, limit = 20, keyword = '' } = query;
    const skip: number = (page - 1) * limit;

    const listQuery: queryCategories = {};

    if (keyword) {
      listQuery.name = rgx(keyword);
    }
    try {
      const res = await this.categoryModel
        .find(listQuery)
        .limit(+limit)
        .populate('create_uid')
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
      const result = await this.categoryModel
        .findById(id)
        .populate('create_uid')
        .exec();
      return {
        result: 'SUCCESS',
        data: result,
      };
    } catch (error) {
      return handlingError('Không tìm thấy sản phẩm', error);
    }
  }

  async update(id: string, UpdateCategoryDto: UpdateCategoryDto) {
    try {
      const result = await this.categoryModel.findByIdAndUpdate(
        id,
        UpdateCategoryDto,
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
      const res = await this.categoryModel.findByIdAndDelete(id, { new: true });
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
