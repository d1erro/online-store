import { Injectable } from '@nestjs/common';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './schemas/address.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(Address.name) private addressRepository: Model<Address>,
    ) {}

    async createAddress(userId: Types.ObjectId) {
        const createdAddress = new this.addressRepository({ userId });
        return createdAddress.save();
    }

    async findAddressById(id: string) {
        const address = await this.addressRepository.findOne({ _id: id });
        return address;
    }

    async updateAddress(id: Types.ObjectId, dto: UpdateAddressDto) {
        const address = await this.addressRepository.findOneAndUpdate(
            { _id: id },
            dto,
        );
        return address;
    }

    remove(id: number) {
        return `This action removes a #${id} address`;
    }
}
