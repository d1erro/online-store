import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, Length } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'users@mail.ru', description: 'Электронная почта' })
    @IsEmail({}, { message: '$property - Некорректный email' })
    email: string;

    @ApiProperty({ example: 'Tom', description: 'First Name' })
    @Length(2, 32, {
        message: '$property - Не меньше 2 и не больше 32 символов',
    })
    first_name: string;

    @ApiProperty({ example: 'Jackson', description: 'Last Name' })
    @Length(2, 32, {
        message: '$property - Не меньше 2 и не больше 32 символов',
    })
    last_name: string;

    @ApiProperty({ example: '+79999999999', description: 'Phone number' })
    @IsPhoneNumber('RU', { message: '$property - Некорректный номер телефона' })
    phone: string;
}
