import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @ApiProperty({
        example: 'Samsung',
        description: 'Наименование бренда',
    })
    @Length(1, 32, {
        message: '$property - Не меньше 1 и не больше 32 символов',
    })
    @Prop({ required: true, unique: true })
    value: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
