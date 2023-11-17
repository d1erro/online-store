import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryRepository: Model<Category>,
    ) {}

    createCategory(dto: CreateCategoryDto) {
        const createdCategory = new this.categoryRepository(dto);
        return createdCategory.save();
    }

    findAll() {
        try {
            return this.categoryRepository.find();
        } catch (e) {
            throw new HttpException(
                `Ошибка при получении категорий - ${e}`,
                500,
            );
        }
    }

    findOneById(id: string) {
        try {
            return this.categoryRepository.findOne({ _id: id });
        } catch (e) {
            throw new HttpException(
                `Ошибка при получении категории - ${e}`,
                500,
            );
        }
    }

    findOneByTitle(title: string) {
        try {
            return this.categoryRepository.findOne({ title });
        } catch (e) {
            throw new HttpException(
                `Ошибка при получении категории - ${e}`,
                500,
            );
        }
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return `This action updates a #${id} category`;
    }

    remove(id: number) {
        return `This action removes a #${id} category`;
    }
}
