import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
    return this.userService.createUser(data);
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getUserById(Number(id));
  }

  @Get('name/:name')
  async getUsersByName(@Param('name') name: string): Promise<User[]> {
    return this.userService.getUsersByName(name);
  }
}
