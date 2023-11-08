import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schemas/product.schema';
import { FilesService } from '../files/files.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productRepository: Model<Product>,
        private fileService: FilesService,
    ) {}

    async create(dto: CreateProductDto, images) {
        try {
            const fileNames = this.fileService.createFile(images);
            const createdProduct = new this.productRepository(dto);
            createdProduct.images = fileNames;
            //@ts-ignore
            createdProduct.characteristics = JSON.parse(dto.characteristics);
            //@ts-ignore
            createdProduct.brand = new Types.ObjectId(dto.brand);
            //@ts-ignore
            createdProduct.category = new Types.ObjectId(dto.category);
            return createdProduct.save();
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    findAll() {
        const products = this.productRepository.find();
        return products;
    }

    getProductById(id: string) {
        const product = this.productRepository
            .findOne({ _id: id })
            .populate('brand')
            .populate('category');
        return product;
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
