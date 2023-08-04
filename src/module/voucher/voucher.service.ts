import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  generateRandomString,
  handlingError,
  rgx,
} from 'src/utils/function.utils';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { CreateVoucherDto, QueryListVoucher } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(Voucher.name) private voucherModel: Model<Voucher>,
    private readonly mailService: MailService,
    private readonly userService: UsersService,
  ) {}
  async create(CreateVoucherDto: CreateVoucherDto) {
    try {
      const code = generateRandomString();
      const checkUser = await this.userService.findOne(
        String(CreateVoucherDto.recive_uid),
      );

      if (!checkUser) return handlingError('Người nhận không tồn tại', null);

      const createdUser = new this.voucherModel({
        ...CreateVoucherDto,
        code,
      });

      const result = await createdUser.save();

      if (result) {
        await this.mailService.sendEmail({
          to: checkUser.data.email,
          subject: result.name,
          content: `Gửi tặng bạn mã voucher: ${result.code} với ưu đãi cực khủng giám giá tới ${result.discount}%`,
        });
      }

      return {
        data: result,
        result: 'SUCCESS',
        message: 'Tạo mới mã ưu đãi thành công',
      };
    } catch (error) {
      handlingError('Tạo mới mã ưu đãi thất bại', error);
    }
  }

  async findAll(query: QueryListVoucher) {
    const { page = 1, limit = 20, keyword = '' } = query;
    const skip: number = (page - 1) * limit;

    const listQuery: any = {};

    if (keyword) {
      listQuery.name = rgx(keyword);
    }
    try {
      const res = await this.voucherModel
        .find(listQuery)
        .populate('create_uid')
        .populate('recive_uid')
        .limit(+limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec();

      const count = await this.voucherModel.find(listQuery).count().exec();
      return {
        result: 'SUCCESS',
        data: res,
        totalItems: count,
        page: +page,
        limit: +limit,
      };
    } catch (error) {
      handlingError('Đã có lỗi xảy ra khi lấy danh sách mã giảm giá', error);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.voucherModel
        .findById(id)
        .populate('create_uid')
        .populate('recive_uid')
        .exec();
      return {
        result: 'SUCCESS',
        data: result,
      };
    } catch (error) {
      return handlingError('Không tìm thấy mã ưu đãi', error);
    }
  }

  async update(id: string, UpdateVoucherDto: UpdateVoucherDto) {
    try {
      const result = await this.voucherModel.findByIdAndUpdate(
        id,
        UpdateVoucherDto,
        {
          new: true,
        },
      );
      return {
        result: 'SUCCESS',
        message: 'Chỉnh sửa mã ưu đãi thành công',
        data: result,
      };
    } catch (error) {
      handlingError('Chỉnh sửa mã ưu đãi thất bại', error);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.voucherModel.findByIdAndDelete(id, { new: true });
      return {
        data: res,
        result: 'SUCCESS',
        message: 'Xóa mã ưu đãi thành công',
      };
    } catch (error) {
      handlingError('Xóa mã ưu đãi thất bại', error);
    }
  }
}
