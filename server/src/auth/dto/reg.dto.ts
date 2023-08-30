import {ApiProperty} from "@nestjs/swagger";

export class RegDto {

    @ApiProperty({example: 'user@mail.ru', description: 'User email'})
    readonly email: string;

    @ApiProperty({example: 'Bob', description: 'First name'})
    readonly first_name: string;

    @ApiProperty({example: 'Marley', description: 'Last name'})
    readonly last_name: string;

    @ApiProperty({example: 'qwerty', description: 'Password'})
    readonly password: string;
}