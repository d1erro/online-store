import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Length } from 'class-validator';
import { IsNumberString } from 'class-validator';
import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class CreateAddressDto {
    @ApiProperty({
        example: Types.ObjectId,
        description: 'ID пользователя, которому принадлежит адрес',
    })
    @Prop({ types: Types.ObjectId })
    userId: Types.ObjectId;

    @ApiProperty({
        example: 'Ленинградская область',
        description: 'Регион доставки',
    })
    @Length(1, 32, {
        message: '$property - Не меньше 1 и не больше 32 символов',
    })
    @IsString({ message: '$property - Должно быть строкой' })
    region: string;

    @ApiProperty({ example: 'Выборг', description: 'Город доставки' })
    @Length(1, 32, {
        message: '$property - Не меньше 1 и не больше 32 символов',
    })
    @IsString({ message: '$property - Должно быть строкой' })
    city: string;

    @ApiProperty({
        example: 'ул. Ленина, д. 1, кв. 2',
        description: 'Улица, дом, квартира',
    })
    @Length(1, 32, {
        message: '$property - Не меньше 1 и не больше 32 символов',
    })
    @IsString({ message: '$property - Должно быть строкой' })
    street: string;

    @ApiProperty({ example: 123456, description: 'Индекс доставки' })
    @IsNumberString({}, { message: '$property - Должен быть числом' })
    @Length(6, 6, {
        message: '$property - Должно быть 6 цифр',
    })
    index: string;

    @ApiProperty({ example: true, description: 'Адрес по умолчанию?' })
    @IsBoolean({})
    default: boolean;
}
