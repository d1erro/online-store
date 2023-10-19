import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { AddressModule } from './address/address.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        UserModule,
        RoleModule,
        AuthModule,
        ProductModule,
        AddressModule,
    ],
})
export class AppModule {}
