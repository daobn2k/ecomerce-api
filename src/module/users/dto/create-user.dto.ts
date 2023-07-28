import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  username: string;
  password: string;
  name: string;
  dob: Date;
  address: string;
  email: string;
  avatar: string;
  phone: string;
  gender: string;
  status: boolean;
  role: string;
}

export class PropertyCreateUser {
  @ApiProperty({ required: true })
  username: string;
  @ApiProperty({ required: true })
  password: string;
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: false })
  dob: Date;
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  address: string;
  @ApiProperty({ required: true })
  gender: string;
  @ApiProperty({ required: false })
  avatar: string;
  @ApiProperty({ required: false })
  role: string;
  @ApiProperty({ required: false })
  status: boolean;
  @ApiProperty({ required: true })
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
  perPage: number;

  @ApiProperty({ required: false, type: String })
  keyword: string;

  @ApiProperty({ required: false, type: String, default: '' })
  create_date: string;
}

export class ChangePassWordDto {
  id: string;
  password: string;
  new_password: string;
}