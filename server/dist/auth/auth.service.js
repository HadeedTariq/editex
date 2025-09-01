"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_model_1 = require("./schema/auth.model");
const jwt_1 = require("@nestjs/jwt");
const custom_exception_1 = require("../custom.exception");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async registerUser(createAuthDto) {
        const user = await auth_model_1.User.create(createAuthDto);
        if (user) {
            return { message: 'User registered successfully' };
        }
        else {
            throw new custom_exception_1.CustomException('User name already exist');
        }
    }
    async loginUser(res, credentials) {
        const { email, password } = credentials;
        const user = await auth_model_1.User.findOne({ email });
        if (!user) {
            throw new custom_exception_1.CustomException('User not found');
        }
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new custom_exception_1.CustomException('Incorrect Credentials');
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
    logout(res) {
        res
            .clearCookie('accessToken', {
            secure: true,
            httpOnly: false,
            sameSite: 'none',
        })
            .json({ message: 'User logged out successfully' });
    }
    async getUser(req) {
        try {
            const { accessToken } = req.cookies;
            if (!accessToken) {
                throw new custom_exception_1.CustomException('Access Token required');
            }
            const user = await this.jwtService.verifyAsync(accessToken);
            return user;
        }
        catch (error) {
            throw new custom_exception_1.CustomException('Session Expired');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map