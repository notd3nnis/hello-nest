import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';
import { serializeInterceptor } from '@/interceptors/serialize.interceptor';
import { UserDto } from './user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }

  @UseInterceptors(new serializeInterceptor(UserDto))
  @Get('/:id')
  async findUser(@Param() id: string) {
    const user = await this.userService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUser(@Query() email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  deleteUser(@Param() id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateuser(@Param() id: string, @Body() attrs: UpdateUserDto) {
    return this.userService.update(parseInt(id), attrs);
  }
}
