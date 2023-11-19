import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  username: string;
  password: string;
  name: string;
  address: string;
  email: string;
  avatar: string;
  phone: string;
  gender: string;
  status: string;
  role: string;
}

export class PropertyCreateUser {
  @ApiProperty({ required: true })
  username: string;
  @ApiProperty({ required: true })
  password: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: false })
  address: string;
  @ApiProperty({ required: false })
  gender: string;
  @ApiProperty({ required: false, default: '' })
  avatar: string;
  @ApiProperty({ required: false, default: 'USER' })
  role: string;
  @ApiProperty({ required: false })
  status: string;
  @ApiProperty({ required: false })
  phone: string;
}

export class PropertyLogin {
  @ApiProperty({ required: true })
  username: string;
  @ApiProperty({ required: true })
  password: string;
}

export class QueryListUsers {
  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false, type: String })
  keyword: string;

  @ApiProperty({ required: false, type: String, default: '' })
  create_date: string;

  @ApiProperty({ required: false, type: String, default: '' })
  role: 'USER' | 'ADMIN' | '';
}

export class ChangePassWordDto {
  id: string;
  password: string;
  new_password: string;
}
