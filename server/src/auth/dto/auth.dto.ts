import {ApiProperty} from "@nestjs/swagger";

export class AuthDto {

    @ApiProperty({example: 'sdb3463jgsdvkjg23', description: 'JWT Access Token'})
    readonly accessToken: string;

    @ApiProperty({example: 'user@mail.ru', description: 'User email'})
    readonly email: string;

    @ApiProperty({example: 'Bob', description: 'First name'})
    readonly first_name: string;

    @ApiProperty({example: 'Marley', description: 'Last name'})
    readonly last_name: string;

    @ApiProperty({example: ['USER'], description: 'Array of roles values'})
    readonly roles: [string];
}