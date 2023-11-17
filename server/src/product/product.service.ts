import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schemas/product.schema';
import { FilesService } from '../files/files.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productRepository: Model<Product>,
        private fileService: FilesService,
        private categoryService: CategoryService,
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
        try {
            return this.productRepository.find();
        } catch (e) {
            throw new HttpException(`Ошибка при получении товаров - ${e}`, 500);
        }
    }

    getProductsBySearch(searchTerm: string): Promise<Product[]> {
        const regex = new RegExp(searchTerm, 'i');
        return this.productRepository.find({ title: { $regex: regex } }).exec();
    }

    getProductById(id: string) {
        try {
            return this.productRepository
                .findOne({ _id: id })
                .populate('brand')
                .populate('category');
        } catch (e) {
            throw new HttpException(`Ошибка при получении товара - ${e}`, 500);
        }
    }

    async getProductsByCategory(title: string) {
        try {
            const category = await this.categoryService.findOneByTitle(title);
            const products = await this.productRepository.find({
                category: category._id,
            });
            return products;
        } catch (e) {
            throw new HttpException(
                `Ошибка при получении товаров по категории - ${e}`,
                500,
            );
        }
    }
}
