import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Get users by id' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(JwtGuard)
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @ApiOperation({ summary: 'Update users info' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(JwtGuard)
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
