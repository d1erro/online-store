import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AddressModule } from '../address/address.module';

@Module({
    controllers: [UserController],
    providers: [UserService, JwtService],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        RoleModule,
        forwardRef(() => AuthModule),
        forwardRef(() => AddressModule),
    ],
    exports: [UserService],
})
export class UserModule {}
