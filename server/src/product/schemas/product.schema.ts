import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Brand } from '../../brand/schemas/brand.schema';
import { Category } from '../../category/schemas/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
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
    @Length(8, 500, { message: 'Не меньше 8 и не больше 500 символов' })
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
    @Prop({ required: true, ref: 'Brand', type: Types.ObjectId, unique: false })
    brand: Types.ObjectId;

    @ApiProperty({
        example: Category,
        description: 'Категория товара',
    })
    @Prop({
        required: true,
        ref: 'Category',
        type: Types.ObjectId,
        unique: false,
    })
    category: Types.ObjectId;

    @ApiProperty({
        example: [
            '1b0b0b9b0b9b0b9b0b9b0b9b0b9b0b9.jpeg',
            '2b0b0b9b0b9b0b9b0b9b0b9b0b9b0b9.jpeg',
            '3b0b0b9b0b9b0b9b0b9b0b9b0b9b0b9.jpeg',
        ],
        description: 'Изображения товара',
    })
    @Prop()
    images: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
