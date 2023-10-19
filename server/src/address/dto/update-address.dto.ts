import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { IsNumberString } from 'class-validator';

export class UpdateAddressDto {
    @ApiProperty({
        example: 'Ленинградская область',
        description: 'Регион доставки',
    })
    @Length(1, 32, {
        message: '$property - Не меньше 1 и не больше 32 символов',
    })
    region: string;

    @ApiProperty({ example: 'Выборг', description: 'Город доставки' })
    @Length(1, 32, {
        message: '$property - Не меньше 1 и не больше 32 символов',
    })
    city: string;

    @ApiProperty({
        example: 'ул. Ленина, д. 1, кв. 2',
        description: 'Улица, дом, квартира',
    })
    @Length(1, 32, {
        message: '$property - Не меньше 1 и не больше 32 символов',
    })
    street: string;

    @ApiProperty({ example: 123456, description: 'Индекс доставки' })
    @IsNumberString({}, { message: '$property - Должен быть числом' })
    @Length(6, 6, {
        message: '$property - Должно быть 6 символов',
    })
    index: string;
}
