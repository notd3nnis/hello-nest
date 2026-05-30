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
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param() id: string) {
    const user = this.userService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('user not found');
    }
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
