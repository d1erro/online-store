import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userRepository: Model<User>,
        private roleService: RoleService,
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const createdUser = new this.userRepository(dto);
        const role = await this.roleService.getRoleByValue('USER');
        createdUser.role = role;
        await createdUser.save();
        return createdUser;
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find().exec();
    }

    async getUserByEmail(email: string) {
        return this.userRepository.findOne({ email });
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findOne({ _id: id });
        user.password = null;
        return user;
    }
}
