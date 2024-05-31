import { Body, Controller, Get, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body(ValidationPipe) user: CreateUserDto) {
    return this.authService.registerUser(user);
  }

  @Post('login')
  loginUser(@Body(ValidationPipe) user: LoginUserDto, @Res() res: Response) {
    return this.authService.loginUser(res, user);
  }

  @Post('logout')
  logoutUser(@Res() res: Response) {
    return this.authService.logout(res);
  }

  @Get()
  getUser(@Req() req:Request){
   return this.authService.getUser(req);
  }
}
