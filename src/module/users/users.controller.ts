import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ChangePassWordDto,
  PropertyCreateUser,
  PropertyLogin,
  QueryListUsers,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: PropertyCreateUser) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: QueryListUsers) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('/login')
  login(@Body() login: PropertyLogin) {
    return this.usersService.login(login);
  }
  @Post('/logout')
  logout(@Body() body: { id: string }) {
    return this.usersService.logout(body);
  }
  @Post('/update-password')
  changePassWord(@Body() data: ChangePassWordDto) {
    return this.usersService.changePassWord(data);
  }
}
