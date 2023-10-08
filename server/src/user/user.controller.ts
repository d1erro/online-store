import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@ApiTags('User')
@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @ApiOperation({ summary: 'Create user' })
    // @ApiResponse({ status: 200, type: User })
    // @Post()
    // async create(@Body() createUserDto: CreateUserDto) {
    //     return this.userService.createUser(createUserDto);
    // }

    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(JwtGuard)
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    // @ApiOperation({ summary: 'Get all users' })
    // @ApiResponse({ status: 200, type: [User] })
    // @Get()
    // async getAll(): Promise<User[]> {
    //     return this.userService.getAllUsers();
    // }
}
