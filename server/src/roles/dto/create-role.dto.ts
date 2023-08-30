import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({example: 'ROLE', description: 'HomeRole title'})
    readonly value: string;

    @ApiProperty({example: 'The best role', description: 'HomeRole description'})
    readonly description: string;
}