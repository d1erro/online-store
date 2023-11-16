import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { FilesModule } from './files/files.module';
import { CartModule } from './cart/cart.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        UserModule,
        RoleModule,
        AuthModule,
        ProductModule,
        AddressModule,
        BrandModule,
        CategoryModule,
        FilesModule,
        CartModule,
    ],
})
export class AppModule {}
