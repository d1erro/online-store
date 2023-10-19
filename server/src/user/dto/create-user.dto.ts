import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Электронная почта' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    readonly email: string;

    @ApiProperty({ example: '12345678', description: 'Пароль' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(8, 32, { message: 'Не меньше 8 и не больше 32 символов' })
    readonly password: string;
}
