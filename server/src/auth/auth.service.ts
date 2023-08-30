import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateMessageDto} from "../messages/dto/create-message.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/schemas/user.schema";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {LoginDto} from "./dto/login.dto";
import {RegDto} from "./dto/reg.dto";

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto)
        const accessToken = await (await this.generateToken(user)).token;
        const rolesNames = user.roles.map((role) => role.value)
        return {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            roles: rolesNames,
            accessToken: accessToken,
        }
    }

    async registration(dto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(dto.email)
        if (candidate) {
            throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST)
        } else {
            const hashPassword = await bcrypt.hash(dto.password, 5);
            const user = await this.userService.createUser({...dto, password: hashPassword})
            return this.generateToken(user)
        }
    }

    private async generateToken(user: User) {
        const payload = {
            last_name: user.last_name,
            first_name: user.first_name,
            email: user.email,
            roles: user.roles
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(loginDto: LoginDto) {
        const user = await this.userService.getUserByEmail(loginDto.email)
        const passwordEquals = await bcrypt.compare(loginDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Invalid email or password'})
    }
}
