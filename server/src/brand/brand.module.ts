import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './schemas/brand.schema';

@Module({
    controllers: [BrandController],
    imports: [
        MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    ],
    providers: [BrandService],
})
export class BrandModule {}
