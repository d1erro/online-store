import { ApiProperty } from '@nestjs/swagger';
import {
    isNumber,
    IsNumber,
    IsNumberString,
    IsString,
    Length,
} from 'class-validator';
import { Prop } from '@nestjs/mongoose';
import { Brand } from '../../brand/schemas/brand.schema';
import { Category } from '../../category/schemas/category.schema';

export class CreateProductDto {
    @ApiProperty({ example: 'Poco X3 Pro', description: 'Название товара' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(3, 40, { message: 'Не меньше 3 и не больше 40 символов' })
    @Prop({ required: true, unique: true })
    title: string;

    @ApiProperty({
        example: `Poco X3 Pro - это мощный смартфон с выдающейся 
        производительностью, созданный для тех, кто ценит быструю и 
        плавную работу.`,
        description: 'Описание товара',
    })
    @IsString({ message: 'Должно быть строкой' })
    @Length(100, 5000, { message: 'Не меньше 100 и не больше 5000 символов' })
    @Prop({ required: true })
    description: string;

    @ApiProperty({
        example: 39999,
        description: 'Цена товара',
    })
    @Length(1, 20, { message: 'Не меньше 1 и не больше 20 символов' })
    @Prop({ required: true })
    price: number;

    @ApiProperty({
        example: 20,
        description: 'Количество товара на складе',
    })
    @Length(1, 20, { message: 'Не меньше 1 и не больше 20 символов' })
    @IsNumberString({}, { message: 'inStock должно быть числом' })
    @Prop({ required: true })
    inStock: number;

    @ApiProperty({
        example: [
            {
                title: 'Цвет',
                value: 'Черный',
            },
            {
                title: 'Оперативная память',
                value: '6 ГБ',
            },
        ],
        description: 'Характеристики товара',
    })
    @Prop({ required: true })
    characteristics: object[];

    @ApiProperty({
        example: Brand,
        description: 'Бренд товара',
    })
    @Prop({ required: true, unique: false })
    brand: Brand;

    @ApiProperty({
        example: Category,
        description: 'Категория товара',
    })
    @Prop({ required: true, unique: false })
    category: Category;
}
