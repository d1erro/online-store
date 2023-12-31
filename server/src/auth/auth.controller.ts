import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { TokensDto } from './dto/tokens.dto';
import { User } from '../user/schemas/user.schema';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Registration' })
    @ApiResponse({ status: 200, type: User })
    @Post('registration')
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto);
    }

    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, type: User })
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, type: TokensDto })
    @ApiBearerAuth('Authorization')
    @ApiHeader({
        name: 'Authorization',
        description: 'Refresh {refreshToken}',
    })
    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    refresh(@Request() req: any) {
        return this.authService.refreshToken(req.user);
    }
}
