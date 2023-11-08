import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from './schemas/brand.schema';

@Injectable()
export class BrandService {
    constructor(
        @InjectModel(Brand.name) private brandRepository: Model<Brand>,
    ) {}

    createBrand(dto: CreateBrandDto) {
        const createdBrand = new this.brandRepository(dto);
        return createdBrand.save();
    }

    findAll() {
        return `This action returns all brand`;
    }

    findOne(id: number) {
        return `This action returns a #${id} brand`;
    }

    update(id: number, updateBrandDto: UpdateBrandDto) {
        return `This action updates a #${id} brand`;
    }

    remove(id: number) {
        return `This action removes a #${id} brand`;
    }
}
