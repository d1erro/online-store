import {Schema} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export class GiveAMemberStatusDto {

    @ApiProperty({example: 'secret_string', description: 'Secret key'})
    readonly secret_key: string;

    @ApiProperty({example: '64c686c3febbc330872091d0', description: 'User id for give a member status'})
    readonly userId: string;
}