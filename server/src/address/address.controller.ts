import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Types } from 'mongoose';
import { Address } from './schemas/address.schema';
import { CurrentUserJwtGuard } from '../user/guards/current-user-jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('addresses')
export class AddressController {
    constructor(
        private readonly addressService: AddressService,
        private jwtService: JwtService,
    ) {}

    @Post()
    async createAddress(@Param('id') id: Types.ObjectId): Promise<Address> {
        return this.addressService.createAddress(id);
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    findAddressById(@Param('id') id: string) {
        return this.addressService.findAddressById(id);
    }

    @Put(':id')
    updateAddress(
        @Param('id') id: Types.ObjectId,
        @Body() dto: UpdateAddressDto,
    ) {
        return this.addressService.updateAddress(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.addressService.remove(+id);
    }
}
