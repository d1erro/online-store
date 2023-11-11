import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { IsNumberString } from 'class-validator';

export class UpdateAddressDto {
    @ApiProperty({
        example: 'Ленинградская область',
        description: 'Регион доставки',
    })
    @Length(2, 24, {
        message: '$property - Не меньше 2 и не больше 24 символов',
    })
    @IsString({ message: '$property - Должно быть строкой' })
    region: string;

    @ApiProperty({ example: 'Выборг', description: 'Город доставки' })
    @Length(2, 32, {
        message: '$property - Не меньше 2 и не больше 32 символов',
    })
    @IsString({ message: '$property - Должно быть строкой' })
    city: string;

    @ApiProperty({
        example: 'ул. Ленина, д. 1, кв. 2',
        description: 'Улица, дом, квартира',
    })
    @Length(2, 32, {
        message: '$property - Не меньше 2 и не больше 32 символов',
    })
    @IsString({ message: '$property - Должно быть строкой' })
    street: string;

    @ApiProperty({ example: 123456, description: 'Индекс доставки' })
    @IsNumberString({}, { message: '$property - Должен быть числом' })
    @Length(6, 6, {
        message: '$property - Должно быть 6 цифр',
    })
    index: string;
}
