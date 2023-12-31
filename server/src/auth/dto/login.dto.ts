import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'users@mail.ru', description: 'User email' })
    readonly email: string;

    @ApiProperty({ example: 'qwerty', description: 'Password' })
    readonly password: string;
}
