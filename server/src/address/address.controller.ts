import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Types } from 'mongoose';
import { Address } from './schemas/address.schema';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @UseGuards(JwtGuard)
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
}
