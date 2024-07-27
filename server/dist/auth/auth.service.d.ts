import { CreateUserDto } from './dtos/createUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    registerUser(createAuthDto: CreateUserDto): Promise<{
        message: string;
    }>;
    loginUser(res: Response, credentials: LoginUserDto): Promise<void>;
    logout(res: Response): void;
    getUser(req: Request): Promise<any>;
}
