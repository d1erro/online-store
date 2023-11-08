import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class CreateBrandDto {
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
