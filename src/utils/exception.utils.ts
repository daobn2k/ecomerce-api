import {
  BadRequestException,
  ForbiddenException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

export const NotFound = async (message: string): Promise<never> => {
  throw new NotFoundException(message ?? 'Không tìm thấy đường dẫn');
};

export const NotAcceptable = async (message: string): Promise<never> => {
  throw new NotAcceptableException(message ?? 'Ngoại lệ không được chấp nhận');
};

export const BadRequest = async (message: string): Promise<never> => {
  throw new BadRequestException(
    message ?? 'Dữ liệu không hợp lệ vui lòng kiểm tra lại',
  );
};

export const Forbidden = async (message: string): Promise<never> => {
  throw new ForbiddenException(
    message ?? 'Không có quyền thực hiện hành động này',
  );
};
