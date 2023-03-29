import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../system/guards/jwt-auth.guard';
import { UserService } from './user.service';

import { UpdateUserDto, ResponseUserDto } from './dto';
import { GetUser } from './decorators/get-user.decorator';

@Controller('user-service')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.getAllUsers();
  }

  @Get('users/me')
  @UseGuards(JwtAuthGuard)
  findMe(@GetUser() user) {
    return this.userService.getMe(user);
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @Patch('users/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.userService.updateUserById(+id, UpdateUserDto);
  }

  @Delete('users/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.userService.deleteUserById(+id);
  }
}
