import { forwardRef, Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './schemas/address.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [AddressController],
    providers: [AddressService, JwtService],
    imports: [
        MongooseModule.forFeature([
            { name: Address.name, schema: AddressSchema },
        ]),
        forwardRef(() => UserModule),
    ],
    exports: [AddressService],
})
export class AddressModule {}
