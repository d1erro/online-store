import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddressService } from '../address/address.service';
import { UpdateAddressDto } from '../address/dto/update-address.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userRepository: Model<User>,
        private roleService: RoleService,
        private addressService: AddressService,
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const createdUser = new this.userRepository(dto);
        const role = await this.roleService.getRoleByValue('USER');
        createdUser.role = role._id;
        const createdAddress = await this.addressService.createAddress(
            createdUser.id,
        );
        createdUser.addresses.push(createdAddress._id);
        await createdUser.save();
        return createdUser;
    }

    async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({ _id: id });

        if (dto.email !== undefined) {
            existingUser.email = dto.email;
        }
        if (dto.first_name !== undefined) {
            existingUser.first_name = dto.first_name;
        }
        if (dto.last_name !== undefined) {
            existingUser.last_name = dto.last_name;
        }
        if (dto.phone !== undefined) {
            existingUser.phone = dto.phone;
        }

        const updatedUser = await existingUser.save();
        updatedUser.password = null;
        return updatedUser;
    }

    async updateAddresses(
        id: Types.ObjectId,
        dto: UpdateAddressDto,
    ): Promise<User> {
        const existingUser = await this.userRepository.findOneAndUpdate(
            { _id: id },
            dto,
        );
        const updatedUser = await existingUser.save();
        return updatedUser;
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
