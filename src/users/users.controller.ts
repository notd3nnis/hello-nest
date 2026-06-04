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
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { UserDto } from './user.dto';
import { AuthService } from './auth.service';
import { CreateUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from '@/guards/auth.guards';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.user = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.user = user.id;
    return user;
  }

  @Get('/whoAmi')
  @UseGuards(AuthGuard)
  async whoAmi(@CreateUser() user: User) {
    return user;
  }
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
