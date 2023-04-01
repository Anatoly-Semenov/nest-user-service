import { Body, Controller, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../system/guards/jwt-auth.guard';
import { UserService } from './user.service';

import { UpdateUserDto, ResponseUserDto, CreateUserDto } from './dto';
import { GetUser } from './decorators/get-user.decorator';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Pattern } from './enums/pattern.enum';

@Controller('user-service')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(Pattern.GET_USERS)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.getAllUsers();
  }

  @MessagePattern(Pattern.GET_MY_USER)
  @UseGuards(JwtAuthGuard)
  findMe(@Payload() user) {
    return this.userService.getMe(user);
  }

  @MessagePattern(Pattern.GET_USER)
  @UseGuards(JwtAuthGuard)
  findOne(@Payload() id: string) {
    return this.userService.getUserById(+id);
  }

  @MessagePattern(Pattern.CREATE_USER)
  @UseGuards(JwtAuthGuard)
  create(@Payload() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @MessagePattern(Pattern.UPDATE_USER)
  @UseGuards(JwtAuthGuard)
  update(@Payload() { id, user }: { id: string; user: UpdateUserDto }) {
    return this.userService.updateUserById(+id, user);
  }

  @MessagePattern(Pattern.DELETE_USER)
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.userService.deleteUserById(+id);
  }
}
