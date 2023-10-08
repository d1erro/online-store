import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async registration(dto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new ConflictException('User with this email already exists');
        }
        const user = await this.userService.createUser({
            ...dto,
            password: await hash(dto.password, 10),
        });
        return user;
    }

    async login(dto: LoginDto) {
        const user = await this.validateUser(dto);
        const payload = {
            email: user.email,
            sub: {
                first_name: user.first_name,
                last_name: user.last_name,
            },
        };

        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1d',
                    secret: process.env.JWT_SECRET_KEY,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.JWT_REFRESH_TOKEN_KEY,
                }),
            },
        };
    }

    private async validateUser(dto: LoginDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        const passwordEquals = await compare(dto.password, user.password);
        if (user && passwordEquals) {
            user.password = null;
            return user;
        }
        throw new UnauthorizedException('Invalid email or password');
    }

    async refreshToken(user: any) {
        const payload = {
            email: user.email,
            sub: {
                first_name: user.first_name,
                last_name: user.last_name,
            },
        };
        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '1d',
                secret: process.env.JWT_SECRET_KEY,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.JWT_REFRESH_TOKEN_KEY,
            }),
        };
    }
}
