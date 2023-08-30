import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Role} from "./schemas/role.schema";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {
    }

    async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
        const createdRole = new this.roleModel(createRoleDto);
        return createdRole.save();
    }

    async getRoleByValue(value: string): Promise<Role> {
        return this.roleModel.findOne({value: value}).exec();
    }
}
