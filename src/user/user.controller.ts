import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from "../auth/jwt.auth.guard";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/register')
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.create(registerUserDto);

  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    const email = req.user.email;
    const user = await this.userService.findByEmail(email);
    return user;
  }

}
