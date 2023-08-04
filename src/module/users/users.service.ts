import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { handlingError, rgx } from 'src/utils/function.utils';
import {
  ChangePassWordDto,
  CreateUserDto,
  PropertyLogin,
  QueryListUsers,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

interface queryUsers {
  name?: any;
}
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const isExistUser = await this.userModel.findOne({
        username: createUserDto.username,
      });

      if (isExistUser) {
        return {
          errorMessage:
            'Tên tài khoản đã có người sử dụng vui lòng sử dụng tên khác',
        };
      }

      console.log(createUserDto, 'createUserDto');

      const createdUser = new this.userModel({
        ...createUserDto,
        role: createUserDto.role ?? 'USER',
      });
      const result = await createdUser.save();
      return {
        data: result,
        result: 'SUCCESS',
        message: 'Tạo mới tài khoản thành công',
      };
    } catch (error) {
      handlingError('Tạo mới người dùng thất bại', error);
    }
  }

  async findAll(query: QueryListUsers) {
    const { page = 1, limit = 20, keyword = '' } = query;
    const skip: number = (page - 1) * limit;

    const listQuery: queryUsers = {};

    if (keyword) {
      listQuery.name = rgx(keyword);
    }
    try {
      const res = await this.userModel
        .find(listQuery)
        .limit(+limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec();

      const count = await this.userModel.find(listQuery).count().exec();
      return {
        result: 'SUCCESS',
        data: res,
        totalItems: count,
        page: +page,
        limit: +limit,
      };
    } catch (error) {}
  }

  async findOne(id: string) {
    try {
      const result = await this.userModel.findById(id).exec();
      return {
        result: 'SUCCESS',
        data: result,
      };
    } catch (error) {
      return handlingError('Không tìm thấy người dùng', error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
      return {
        result: 'SUCCESS',
        message: 'Chỉnh sửa người dùng thành công',
        data: result,
      };
    } catch (error) {
      handlingError('Chỉnh sửa người dùng thất bại', error);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.userModel.findByIdAndDelete(id, { new: true });
      return {
        data: res,
        result: 'SUCCESS',
        message: 'Xóa người dùng thành công',
      };
    } catch (error) {
      handlingError('Xóa người dùng thất bại', error);
    }
  }

  async login(params: PropertyLogin) {
    try {
      const { username, password } = params;

      const isExistUser = await this.userModel.findOne({
        username: rgx(username),
      });
      if (!isExistUser) {
        return handlingError('Tài khoản không tồn tại', null);
      }

      const checkUserNamePassword = await this.userModel.findOne({
        username,
        password,
      });
      if (!checkUserNamePassword) {
        return handlingError('Tài khoản hoặc mật khẩu không hợp lệ', null);
      }
      const result = await this.userModel
        .findOneAndUpdate(
          { username: rgx(username), password: rgx(password) },
          { status: true },
          { new: true },
        )
        .exec();

      return {
        result: 'SUCCESS',
        data: result,
        message: 'Đăng nhập thành công',
      };
    } catch (error) {
      handlingError('Đăng nhập không thành công', error);
    }
  }

  async logout(body: { id: string }) {
    try {
      const isExist = await this.userModel.findOne({ _id: body.id });
      if (!isExist) {
        return handlingError('Tài khoản không tồn tại không thể đăng xuất', {});
      }
      const result = await this.userModel.findOneAndUpdate(
        { _id: body.id },
        { status: false },
        { new: true },
      );
      return {
        result: 'SUCCESS',
        data: { status: result.status },
        message: 'Đăng xuất thành công',
      };
    } catch (error) {
      return handlingError('Đăng xuất', error);
    }
  }

  async changePassWord(data: ChangePassWordDto) {
    const { id, password, new_password } = data;

    if (new_password === password) {
      return handlingError(
        'Mật khẩu mới và mật khẩu cũ không được trùng nhau',
        null,
      );
    }

    const result = await this.userModel.findOneAndUpdate(
      { password: password, _id: id },
      { password: new_password },
      { new: true },
    );
    if (!result) {
      return handlingError('Kiểm tra lại các trường dữ liệu', null);
    }
    return {
      result: 'SUCCESS',
      data: result,
      message: 'Thay đổi mật khẩu thành công',
    };
  }
}
