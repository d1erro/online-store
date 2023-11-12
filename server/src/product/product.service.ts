import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
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
            const findProduct = await this.productRepository.findOne({
                title: dto.title,
            });
            if (findProduct) {
                throw new ConflictException(
                    'Продукт с таким названием уже существует',
                );
            }
            const fileNames = await this.fileService.uploadFiles(images);
            const createdProduct = new this.productRepository(dto);
            createdProduct.images = fileNames;
            createdProduct.characteristics = JSON.parse(dto.characteristics);
            createdProduct.brand = new Types.ObjectId(dto.brand);
            createdProduct.category = new Types.ObjectId(dto.category);
            return createdProduct.save();
        } catch (error) {
            throw new HttpException(
                `Ошибка при добавлении продукта - ${error}`,
                500,
            );
        }
    }

    findAll() {
        return this.productRepository.find();
    }

    getProductById(id: string) {
        return this.productRepository
            .findOne({ _id: id })
            .populate('brand')
            .populate('category');
    }
}
