import mongoose from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export class CreateMessageDto {

    @ApiProperty({example: 'dfejkh234k56g342jk62g3', description: 'User Id'})
    readonly user: string;

    @ApiProperty({example: 'Title', description: 'Message title'})
    readonly title: string;

    @ApiProperty({example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', description: 'More text'})
    readonly text: string;
}
