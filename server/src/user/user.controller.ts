import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUserJwtGuard } from './guards/current-user-jwt.guard';

@ApiTags('Users')
@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(JwtGuard)
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @ApiOperation({ summary: 'Update user info' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(CurrentUserJwtGuard)
    @Put(':id/update-info')
    async updateUserInfo(
        @Param('id') id: string,
        @Body() dto: UpdateUserDto,
    ): Promise<User> {
        return this.userService.updateUser(id, dto);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    async getAll(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
}
