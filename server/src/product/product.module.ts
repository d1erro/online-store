import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { FilesModule } from '../files/files.module';
import { CategoryModule } from '../category/category.module';

@Module({
    controllers: [ProductController],
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
        ]),
        FilesModule,
        CategoryModule,
    ],
    providers: [ProductService],
})
export class ProductModule {}
