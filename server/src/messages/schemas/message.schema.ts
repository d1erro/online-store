import mongoose, {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {User} from "../../users/schemas/user.schema";
import {ApiProperty} from "@nestjs/swagger";

export type MessageDocument = HydratedDocument<Message>;

@Schema({timestamps: true})
export class Message {

    @ApiProperty({example: 'dfejkh234k56g342jk62g3', description: 'User Id'})
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @ApiProperty({example: 'Title', description: 'Message title'})
    @Prop({ required: true })
    title: string;

    @ApiProperty({example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', description: 'More text'})
    @Prop({ required: true })
    text: string;

    @ApiProperty({example: '2023-07-26T10:29:33.116+00:00', description: 'Create time'})
    @Prop({ type: mongoose.Schema.Types.Date, get: (createdAt: Date) => createdAt.toISOString()})
    createdAt: mongoose.Schema.Types.Date;

    @ApiProperty({example: '2023-07-26T10:29:33.116+00:00', description: 'Update time'})
    @Prop({ type: mongoose.Schema.Types.Date })
    updatedAt: mongoose.Schema.Types.Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);