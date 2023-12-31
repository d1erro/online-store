import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

    async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
        const createdRole = new this.roleModel(createRoleDto);
        return createdRole.save();
    }

    async getRoleByValue(value: string): Promise<Role> {
        return this.roleModel.findOne({ value: value });
    }

    async getRoleById(id: Types.ObjectId): Promise<Role> {
        return this.roleModel.findOne({ _id: id });
    }
}
