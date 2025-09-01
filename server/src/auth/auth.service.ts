import { Injectable } from '@nestjs/common';
import { User } from './schema/auth.model';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from 'src/custom.exception';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async registerUser(createAuthDto: CreateUserDto) {
    const user = await User.create(createAuthDto);
    if (user) {
      return { message: 'User registered successfully' };
    } else {
      throw new CustomException('User name already exist');
    }
  }

  async loginUser(res: Response, credentials: LoginUserDto) {
    const { email, password } = credentials;

    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomException('User not found');
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new CustomException('Incorrect Credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      id: user._id,
      username: user.username,
      email: user.email,
    });

    res.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: false,
      sameSite: 'none',
      maxAge: 69 * 60 * 10000,
    });

    res.status(200).json({ message: 'User logged in successfully' });
  }

  logout(res: Response) {
    res
      .clearCookie('accessToken', {
        secure: true,
        httpOnly: false,
        sameSite: 'none',
      })
      .json({ message: 'User logged out successfully' });
  }

  async getUser(req: Request) {
    try {
      const { accessToken } = req.cookies;
      if (!accessToken) {
        throw new CustomException('Access Token required');
      }

      const user = await this.jwtService.verifyAsync(accessToken);
      return user;
    } catch (error) {
      throw new CustomException('Session Expired');
    }
  }
}
