import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class CreateCategoryDto {
    @ApiProperty({
        example: 'Корпуса',
        description: 'Наименование категории',
    })
    @Length(1, 32, {
        message: 'Поле $property - Не меньше 1 и не больше 32 символов',
    })
    @Prop({ required: true, unique: true })
    value: string;
}
