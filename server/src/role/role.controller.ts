import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './schemas/role.schema';
import { Types } from 'mongoose';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @ApiOperation({ summary: 'Create role' })
    @ApiResponse({ status: 200, type: Role })
    @Post('create')
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({ summary: 'Get role by id' })
    @ApiResponse({ status: 200, type: Role })
    @Get(':id')
    getRole(@Param('id') id: Types.ObjectId) {
        return this.roleService.getRoleById(id);
    }
}
