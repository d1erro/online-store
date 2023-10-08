import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Header,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiHeader,
    ApiHeaders,
    ApiOperation,
    ApiResponse,
    ApiSecurity,
    ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { TokensDto } from './dto/tokens.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Registration' })
    @ApiResponse({ status: 200, type: CreateUserDto })
    @Post('registration')
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto);
    }

    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, type: LoginDto })
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
