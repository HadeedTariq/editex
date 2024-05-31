import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from 'src/custom.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new CustomException('Access Token required');
    }
    const user = await this.jwtService.verifyAsync(accessToken);
    if (!user) {
      throw new CustomException('Incorrect Token');
    }

    req.body.user = user;
    return true;
  }
}
