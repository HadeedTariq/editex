import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(user: CreateUserDto): Promise<{
        message: string;
    }>;
    loginUser(user: LoginUserDto, res: Response): Promise<void>;
    logoutUser(res: Response): void;
    getUser(req: Request): Promise<any>;
}
